import { TextAnimate } from "../ui/text-animate";
import { FeatureTabs } from "../ui/scrolling-card";

interface Service {
  id: string;
  label: string;
  description: string;
  preview: string; // whatever varies per-item — swap for an icon, image src, etc.
}

const SERVICES: Service[] = [
  { id: "CBT", label: "Computer-Based Testing", description: "Take Your Examination With Confidence", preview: "Desktop preview" },
  { id: "cli", label: "CLI", description: "Run it in any terminal with full shell access.", preview: "CLI preview" },
  { id: "slack", label: "Slack & Teams", description: "Bring it straight into your team chat.", preview: "Slack preview" },
  { id: "mobile", label: "Mobile", description: "Kick things off from your phone.", preview: "Mobile preview" },
];

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
      <div className="mt-6 h-0.5 w-full "></div>
      <FeatureTabs
        duration={5000}
        items={SERVICES.map((service) => ({
          id: service.id,
          label: service.label,
          description: service.description,
          content: <div className="text-sm text-muted-foreground">{service.preview}</div>,
        }))}
      />
    </section>
  );
}