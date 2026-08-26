import { TextAnimate } from "../ui/text-animate"

export default function Services() {

  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20">
      <div className="max-w-xl">
        <p className="font-mono text-caption uppercase tracking-caption text-navy/60">What we offer</p>
        <h2 className="mt-2 font-display text-heading tracking-heading text-navy">
            <TextAnimate animation="slideUp" by="word">
                Our services
            </TextAnimate>
        </h2>
        <p className="mt-3 font-sans text-body tracking-body text-ink/70">
          Everything you need for exams, admissions, and computer skills — under one roof.
        </p>
      </div>

      
    </section>
  );
}
