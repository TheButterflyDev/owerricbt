import { TextAnimate } from "../ui/text-animate"
import { NumberTicker } from "../ui/number-ticker"

const REASONS = [
  { mark: { amount: 38, unit: "+" }, label: "Google Reviews", detail: "Consistently rated by satisfied students." },
  { mark: { amount: 5, unit: " min" }, label: "Fast Registration", detail: "Skip the queues — in and out quickly." },
  { mark: { amount: 10, unit: "+ yrs" }, label: "Quality customer services", detail: "Learn from seasoned professionals." },
];

export default function WhyChooseUs() {
  
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
            <div key={reason.label} className=" p-6">
              <p className="font-display text-heading-sm font-semibold text-lemon">
                <NumberTicker
                  value={reason.mark.amount}
                />
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
