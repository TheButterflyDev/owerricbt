import Text3DFlip from "../components/ui/text-3d-flip"
import { InteractiveHoverButton } from "../components/ui/interactive-hover-button"
import { PixelImage } from "../components/ui/pixel-image"

export default function About(){
    return (
        <>  
            <section id="top" className="relative overflow-hidden">
                <div className="mx-auto grid place-content-center justify-center items-center max-w-6xl gap-12 px-6 py-28 md:grid-cols-2 md:items-center md:py-24">
                    <div className="md:block text-center md:text-left">
                    {/* <p className="mb-4 font-mono text-caption uppercase tracking-caption text-navy/60">
                        New Owerri · Admission &amp; Exam Center
                    </p> */}
                    <span className="mb-5 font-sans text-body tracking-subheading text-ink/75">
                        About <span className="md:hidden">Us</span>  <span className="font-bold md:inline hidden">OWERRI CBT HI-TECH</span>
                    </span>
                    <h1 className="mt-2 font-display text-heading tracking-heading text-navy md:text-display md:tracking-display">
                        <div className="italic text-navy-ink text-main">
                            <Text3DFlip
                                className="bg-background text-center font-display text-heading tracking-heading"
                                textClassName="bg-background text-foreground text-center"
                                flipTextClassName="bg-background text-foreground"
                                rotateDirection="top"
                                staggerDuration={0.03}
                                staggerFrom="first"
                                transition={{ type: "spring", damping: 25, stiffness: 160 }}
                            >
                                More Than a CBT Centre
                            </Text3DFlip>
                        </div>
                    </h1>
                    <div className="mt-5 max-w-md font-sans text-body tracking-subheading text-ink/75">
                        <h2 className="text-heading-sm mb-2">
                            Owerri CBT HI-TECH is a centre for digital learning and technology-assisted education in Owerri, Imo State. 
                        </h2>
                       
                    </div>

                    <div className="mt-8 flex flex-wrap md:justify-start justify-center items-center gap-4">
                        <a
                        href="#about-us"
                        className=" py-3 font-sans text-body font-semibold tracking-body text-navy transition "
                        >
                            <InteractiveHoverButton className="hover:bg-navy hover:text-paper">Learn More</InteractiveHoverButton>
                        </a>
                        <span
                        className="rounded-button hidden md:inline bg-lemon px-6 py-3 font-sans text-body font-semibold tracking-body text-navy transition hover:bg-lemon-dim"
                        >
                        Chat on WhatsApp
                        </span>
                    </div>
                    </div>

                    {/* Signature visual: an oversized admission-ticket card */}
                    <div className="relative mx-auto w-full max-w-sm">
                        <div className="rotate-2 rounded-large">
                            <PixelImage src="/oht-image.webp" grid="8x8" />
                        </div>

                    {/* A second, partially-hidden ticket peeking out for depth */}
                    <div className="absolute -bottom-6 -left-6 -z-10 h-full w-full -rotate-6 rounded-large border-2 border-navy/15 bg-beige-border/40" />
                    </div>
                </div>
            </section>
        </>
       
    )
}