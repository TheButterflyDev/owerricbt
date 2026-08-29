import { AvatarCircles } from "../ui/avatar-circles"

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas",
  },
]

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
