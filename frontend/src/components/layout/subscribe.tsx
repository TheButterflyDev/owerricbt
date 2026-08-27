const WHATSAPP_LINK = "https://wa.me/2348xxxxxxxxx";

export function BookingCTA() {
  return (
    <section className="relative overflow-hidden bg-lemon py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-mono text-caption uppercase tracking-caption text-navy/70">Don't wait until the last minute</p>
        <h2 className="mt-2 font-display text-heading tracking-heading text-navy">Book your exam slot today.</h2>
        <p className="mt-3 font-sans text-body tracking-body text-navy/70">
          Secure your seat now — walk in or chat with us on WhatsApp.
        </p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-block rounded-button border-2 border-navy bg-navy px-8 py-3 font-sans text-body font-semibold tracking-body text-paper transition hover:bg-navy-ink"
        >
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}
