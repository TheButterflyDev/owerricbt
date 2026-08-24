const REASONS = [
  { mark: "38+", label: "Google Reviews", detail: "Consistently rated by satisfied students." },
  { mark: "5 min", label: "Fast Registration", detail: "Skip the queues — in and out quickly." },
  { mark: "A/C", label: "Air-Conditioned Lab", detail: "Take your exams in cool comfort." },
  { mark: "10+ yrs", label: "Experienced Tutors", detail: "Learn from seasoned professionals." },
];

export default function WhyChooseUs() {
  return (
    <section className="border-y-2 border-navy bg-navy py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-caption uppercase tracking-caption text-lemon">Why choose us</p>
        <h2 className="mt-2 max-w-lg font-display text-heading tracking-heading text-paper">
          Trusted by hundreds of students in Owerri.
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden rounded-large border border-paper/15 bg-paper/15 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <div key={reason.label} className="bg-navy p-6">
              <p className="font-display text-heading-sm font-semibold text-lemon">{reason.mark}</p>
              <p className="mt-2 font-sans text-body font-semibold text-paper">{reason.label}</p>
              <p className="mt-1 font-sans text-caption tracking-caption text-paper/60">{reason.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
