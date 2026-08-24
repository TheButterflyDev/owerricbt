const  WHATSAPP_LINK = "https://wa.me/2348030000000?text=Hello."

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="mb-4 font-mono text-caption uppercase tracking-caption text-navy/60">
            New Owerri · Admission &amp; Exam Center
          </p>
          <h1 className="font-display text-heading tracking-heading text-navy md:text-display md:tracking-display">
            Owerri CBT <span className="italic text-lemon-dim">HI-TECH</span>
          </h1>
          <p className="mt-5 max-w-md font-sans text-subheading tracking-subheading text-ink/75">
            JAMB registration, CBT exams &amp; computer training — booked in minutes, not queues.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="rounded-button bg-lemon px-6 py-3 font-sans text-body font-semibold tracking-body text-navy transition hover:bg-lemon-dim"
            >
              Chat on WhatsApp
            </a>
            <a
              href="#services"
              className="rounded-button border-2 border-navy px-6 py-3 font-sans text-body font-semibold tracking-body text-navy transition hover:bg-navy hover:text-paper"
            >
              See services &amp; fees
            </a>
          </div>

          <p className="mt-8 font-mono text-caption tracking-caption text-navy/50">
            ★★★★★ 38+ verified Google reviews
          </p>
        </div>

        {/* Signature visual: an oversized admission-ticket card */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="rotate-2 rounded-large border-2 border-navy bg-paper p-7 shadow-elevated">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-caption uppercase tracking-caption text-navy/60">Admission Ticket</p>
                <p className="mt-1 font-display text-heading-sm font-semibold text-navy">Exam Slot</p>
              </div>
              <span className="rounded-tag bg-lemon px-2 py-1 font-mono text-caption font-semibold text-navy">
                VALID
              </span>
            </div>

            <div className="relative my-6 h-0 border-t-2 border-dashed border-navy/25">
              <span className="ticket-punch -left-9 -top-2" />
              <span className="ticket-punch -right-9 -top-2" />
            </div>

            <dl className="grid grid-cols-2 gap-4 font-mono text-caption tracking-caption text-navy/70">
              <div>
                <dt className="uppercase text-navy/50">Center</dt>
                <dd className="mt-1 text-body font-medium text-navy">New Owerri</dd>
              </div>
              <div>
                <dt className="uppercase text-navy/50">Lab</dt>
                <dd className="mt-1 text-body font-medium text-navy">A/C, 24 seats</dd>
              </div>
              <div>
                <dt className="uppercase text-navy/50">Reg. No.</dt>
                <dd className="mt-1 text-body font-medium text-navy">OCH-2026</dd>
              </div>
              <div>
                <dt className="uppercase text-navy/50">Status</dt>
                <dd className="mt-1 text-body font-medium text-lemon-dim">Open</dd>
              </div>
            </dl>
          </div>

          {/* A second, partially-hidden ticket peeking out for depth */}
          <div className="absolute -bottom-6 -left-6 -z-10 h-full w-full -rotate-6 rounded-large border-2 border-navy/15 bg-beige-border/40" />
        </div>
      </div>
    </section>
  );
}