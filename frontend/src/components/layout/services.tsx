import { TextAnimate } from "../ui/text-animate";
import { FeatureTabs } from "../ui/scrolling-card";
import { PixelImage } from "../ui/pixel-image";

interface Service {
  id: string;
  label: string;
  description: string;
  preview: string; // whatever varies per-item — swap for an icon, image src, etc.
}

const SERVICES: Service[] = [
  { id: "CBT", label: "Computer-Based Testing", description: "Take your examination with confidence at our Computer-Based Test center for all professional and academic exams.", preview: "https://i.pinimg.com/736x/5d/bf/2d/5dbf2dffad4972d6f0ef561ccb10c289.jpg" },
  { id: "JAMB", label: "Jamb Registration", description: "Register for Jamb exams with ease. Get your JAMB Registration done right, fast and error-free with instant slip printing.", preview: "https://i.pinimg.com/736x/01/92/35/01923505ba9f9c017540690639b7394b.jpg" },
  { id: "POST-UTME", label: "Post-UTME & Admission Services", description: "Simplify your admissions journey with stress-free Post-UTME registration, processing, and expert guidance for all Nigerian universities and polytechnics.", preview: "https://i.pinimg.com/736x/5d/bf/2d/5dbf2dffad4972d6f0ef561ccb10c289.jpg" },
  { id: "CT", label: "Computer Training", description: "Master essential digital skills at your own pace with our hands-on computer training programs designed for students, beginners, and professionals alike.", preview: "https://i.pinimg.com/1200x/6d/09/5a/6d095a155b0cc1583cf29fd3d48a0485.jpg" },
  { id: "digital-learning", label: "Digital Learning & Hands-on Training", description: "Experience practical digital learning through interactive, hands-on computer training built to develop real-world tech skills.", preview: "https://i.pinimg.com/736x/c3/d1/7b/c3d17b0cd35c8757591d639c15410db5.jpg" },
  { id: "academic", label: "Academic & Online Services", description: "Build your skills through practical, hands-on training in Microsoft Office, internet navigation, and core computer basics. Beyond training, our centre offers fast, reliable assistance for a wide range of legitimate online academic and digital services.", preview: "https://i.pinimg.com/736x/ff/6c/60/ff6c607d782e2a45be81f022e3913ec0.jpg" },
];

export default function Services() {
  return (
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
      <div className="py-4 md:py-6">
        <FeatureTabs
          duration={2000}
          items={SERVICES.map((service) => ({
            id: service.id,
            label: service.label,
            description: service.description,
            content: <PixelImage src={service.preview}  />,
          }))}
        />
      </div>
      
    </section>
  );
}