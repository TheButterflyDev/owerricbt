import { cn } from "../../lib/utils";
import { InteractiveGridPattern } from "../ui/interactive-grid-pattern";
import { TextReveal } from "../ui/text-reveal"
import { TextAnimate } from "../ui/text-animate";

export default function Reviews() {
    <section id="services" className="mx-auto h-200 max-w-6xl px-6 py-20">
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
      {/* <div className="py-4 md:py-6">
        <FeatureTabs
          duration={2000}
          items={SERVICES.map((service) => ({
            id: service.id,
            label: service.label,
            description: service.description,
            content: <PixelImage src={service.preview}  />,
          }))}
        />
      </div> */}
      
    </section>
}