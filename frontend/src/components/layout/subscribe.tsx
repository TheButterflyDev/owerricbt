export function BookingCTA() {
  return (
    <section className="relative overflow-hidden bg-lemon py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-mono text-caption uppercase tracking-caption text-navy/70">Stay Updated on JAMB</p>
        <h2 className="mt-2 font-display text-heading tracking-heading text-navy">Never Miss a JAMB Update.</h2>
        <p className="mt-3 font-sans text-body tracking-body text-navy/70">
          Get JAMB news, registration updates, deadlines and admission information delivered straight to your inbox.
        </p>
        <button
          className="mt-8 inline-block rounded-button border-2 border-navy bg-navy px-8 py-3 font-sans text-body font-semibold tracking-body text-paper transition hover:bg-navy-ink"
        >
          Chat on WhatsApp
        </button>
        {/* <div className="mt-8">
          <AvatarCircles numPeople={99} avatarUrls={avatars} />
        </div> */}
      </div>
    </section>
  );
}
