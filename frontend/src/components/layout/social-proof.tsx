import { TextAnimate } from "../ui/text-animate";
import { NumberTicker } from "../ui/number-ticker";
import { useEffect, useState } from "react";

const FOUNDING_YEAR = 2016;
const FALLBACK_REVIEWS = 38;

export default function WhyChooseUs() {
  // years since 2016 — pure computation, short-circuit fallback only guards against a weird Date result
  const yearsActive = (new Date().getFullYear() - FOUNDING_YEAR) || 10;

  // review count — starts at fallback, replaced if/when the API call succeeds
  const [reviewCount, setReviewCount] = useState<number>(FALLBACK_REVIEWS);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/google-reviews")
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((data: { userRatingsTotal?: number }) => {
        if (!cancelled && typeof data.userRatingsTotal === "number") {
          setReviewCount(data.userRatingsTotal);
        }
      })
      .catch(() => {
        // stays on FALLBACK_REVIEWS
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const REASONS = [
    { mark: { amount: reviewCount, unit: "+" }, label: "Google Reviews", detail: "Consistently rated by satisfied students." },
    { mark: { amount: 5, unit: " min" }, label: "Fast Registration", detail: "Skip the queues — in and out quickly." },
    { mark: { amount: yearsActive, unit: "+ yrs" }, label: "Quality customer services", detail: "Learn from seasoned professionals." },
  ];

  return (
    <section className="border-y-2 border-navy bg-navy py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-caption uppercase tracking-caption text-lemon">Why choose us</p>
        <h2 className="mt-2 max-w-lg font-display text-heading tracking-heading text-paper">
          <TextAnimate animation="slideUp" by="word">
            Trusted by hundreds of students.
          </TextAnimate>
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason) => (
            <div key={reason.label} className="p-6">
              <p className="font-display text-heading-sm font-semibold text-lemon">
                <NumberTicker value={reason.mark.amount} />
                {reason.mark.unit}
              </p>
              <p className="mt-2 font-sans text-body font-semibold text-paper">{reason.label}</p>
              <p className="mt-1 font-sans text-caption tracking-caption text-paper/60">{reason.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}