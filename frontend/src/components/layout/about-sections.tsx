interface AboutSection {
    caption: string,
    heading: string,
    body: string,
    image: string,
}

export default function AboutSection({AboutSection}: {AboutSection: AboutSection}) {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid gap-10 md:grid-cols-2">
                    <div className="flex flex-col justify-center">
                        <p className="font-mono text-caption uppercase tracking-caption text-navy/60">
                            {AboutSection.caption}
                        </p>
                        <h2 className="mt-2 font-display text-heading tracking-heading text-navy">
                            {AboutSection.heading}
                        </h2>
                        <p className="mt-4 font-sans text-body tracking-body text-ink/70">
                            {AboutSection.body}
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <img
                            src={AboutSection.image}
                            alt={AboutSection.caption}
                            className="rounded-card"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}