import { TextAnimate } from "../ui/text-animate"

export interface AboutSectionContent {
    caption: string
    heading: string
    body: string | string[]
    image?: string
}

export default function AboutSection({
    data,
    reverse = false,
}: {
    data: AboutSectionContent
    reverse?: boolean
}) {
    const paragraphs = Array.isArray(data.body) ? data.body : [data.body]

    return (
        <section className="py-20">
            <div className="mx-auto max-w-6xl px-6">
                <div className={`grid gap-10 ${data.image ? "md:grid-cols-2" : "max-w-2xl"}`}>
                    <div className={`flex flex-col justify-center ${reverse && data.image ? "md:order-2" : ""}`}>
                        <p className="font-mono text-caption uppercase tracking-caption text-navy/60">
                            {data.caption}
                        </p>
                        <h2 className="mt-2 font-display text-heading tracking-heading text-navy">
                            <TextAnimate animation="slideUp" by="word">
                                {data.heading}
                            </TextAnimate>
                        </h2>
                        {paragraphs.map((p, i) => (
                            <p key={i} className="mt-4 font-sans text-body tracking-body text-ink/70">
                                {p}
                            </p>
                        ))}
                    </div>

                    {data.image && (
                        <div className={`flex items-center justify-center ${reverse ? "md:order-1" : ""}`}>
                            <img
                                src={data.image}
                                alt={data.caption}
                                loading="lazy"
                                className="rounded-card"
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}