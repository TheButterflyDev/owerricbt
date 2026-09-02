import { TextAnimate } from "../ui/text-animate";
import { FeatureTabs } from "../ui/scrolling-card";
import { PixelImage } from "../ui/pixel-image";
import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";

interface DoItem {
  label: string;
  image: string;
}

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


const WHATSAPP_LINK = "https://wa.link/ijor10";

interface DoItem {
  label: string;
}

interface CommitmentItem {
  title: string;
  description: string;
}

const WHAT_WE_DO: DoItem[] = [
  { label: "Computer-Based Testing", image: "https://i.pinimg.com/736x/5d/bf/2d/5dbf2dffad4972d6f0ef561ccb10c289.jpg" },
  { label: "JAMB registration and support", image: "https://i.pinimg.com/736x/01/92/35/01923505ba9f9c017540690639b7394b.jpg" },
  { label: "Post-UTME and admission-related services", image: "https://i.pinimg.com/736x/5d/bf/2d/5dbf2dffad4972d6f0ef561ccb10c289.jpg" },
  { label: "CBT examination preparation", image: "https://i.pinimg.com/1200x/6d/09/5a/6d095a155b0cc1583cf29fd3d48a0485.jpg" },
  { label: "Computer training", image: "https://i.pinimg.com/1200x/6d/09/5a/6d095a155b0cc1583cf29fd3d48a0485.jpg" },
  { label: "Digital learning", image: "https://i.pinimg.com/736x/c3/d1/7b/c3d17b0cd35c8757591d639c15410db5.jpg" },
  { label: "Online academic services", image: "https://i.pinimg.com/736x/ff/6c/60/ff6c607d782e2a45be81f022e3913ec0.jpg" },
  { label: "Practical technology training", image: "https://i.pinimg.com/736x/c3/d1/7b/c3d17b0cd35c8757591d639c15410db5.jpg" },
];

const OUR_COMMITMENT: CommitmentItem[] = [
  {
    title: "Quality",
    description: "Providing dependable digital and learning services.",
  },
  {
    title: "Convenience",
    description: "Making academic and digital processes easier for our customers.",
  },
  {
    title: "Integrity",
    description: "Providing honest and responsible assistance.",
  },
  {
    title: "Learning",
    description: "Helping people develop useful digital skills.",
  },
  {
    title: "Innovation",
    description: "Continuously improving the way we use technology to support education.",
  },
];

function WhatWeDoCarousel({ items }: { items: DoItem[] }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimeout = useRef<number>(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    setActive(i);
  };

  const pauseThenResume = () => {
    pausedRef.current = true;
    window.clearTimeout(resumeTimeout.current);
    resumeTimeout.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, 4000);
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement | undefined;
    if (!card) return;
    const gap = 12;
    const index = Math.round(el.scrollLeft / (card.offsetWidth + gap));
    if (index !== activeRef.current) setActive(index);
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      scrollToIndex((activeRef.current + 1) % items.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, [items.length]);

  return (
    // fixed fallback height on mobile (no grid row to stretch against),
    // stretches to match the left column's height at md+ via grid align-items:stretch
    <div className="flex h-[420px] flex-col overflow-hidden md:h-full">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onPointerDown={pauseThenResume}
        onWheel={pauseThenResume}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
        className="flex flex-1 gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <div
            key={item.label}
            className="relative min-w-[80%] shrink-0 snap-start overflow-hidden rounded-card border border-navy/10 sm:min-w-[45%] md:min-w-[32%]"
          >
            <img
              src={item.image}
              alt={item.label}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* dark overlay so white text stays legible over any photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="relative flex h-full items-end p-5">
              <span className="font-sans text-body font-medium tracking-body text-paper">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              scrollToIndex(i);
              pauseThenResume();
            }}
          >
            <motion.span
              animate={{
                width: active === i ? 20 : 6,
                opacity: active === i ? 1 : 0.3,
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="block h-1.5 rounded-full bg-navy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-16">
        {/* Left: sticky intro, mirrors the site's eyebrow/heading/body rhythm */}
        <div className="md:sticky md:top-24 md:self-start">
          <p className="font-mono text-caption uppercase tracking-caption text-navy/60">
            What we do
          </p>
          <h2 className="mt-2 font-display text-heading tracking-heading text-navy">
            <TextAnimate animation="slideUp" by="word">
              Digital Education & Academic Support
            </TextAnimate>
          </h2>
          <p className="mt-4 max-w-md font-sans text-body tracking-body text-ink/70">
            Our services cover several areas of digital education and academic
            support, including:
          </p>

          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-8 hidden rounded-button bg-lemon px-6 py-3 font-sans text-body font-semibold tracking-body text-navy transition hover:bg-lemon-dim md:inline-block"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Right: stacked ticket-style cards, one per service */}
        {/* <div className="flex flex-col gap-3">
          {WHAT_WE_DO.map((item) => (
            <div
              className="flex items-center gap-4 rounded-card border-1 border-navy/10 px-5 py-4"
            >
              
              <span className="font-sans text-body font-medium tracking-body text-navy">
                {item.label}
              </span>
            </div>
          ))}
        </div> */}
        <WhatWeDoCarousel items={WHAT_WE_DO} />
      </div>
    </section>
  );
}

export function OurCommitment() {
  return (
    <section className="border-y-2 border-navy bg-navy py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-caption uppercase tracking-caption text-lemon">
          Our commitment
        </p>
        <h2 className="mt-2 max-w-lg font-display text-heading tracking-heading text-paper">
          <TextAnimate animation="slideUp" by="word">
            What You Can Count On
          </TextAnimate>
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {OUR_COMMITMENT.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              className="rounded-card border border-paper/15 bg-navy-ink/40 p-6"
            >
              <h5 className="mt-4 font-sans text-subheading font-semibold text-paper">
                {item.title}
              </h5>
              <p className="mt-1 font-sans text-body tracking-caption text-paper/60">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

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