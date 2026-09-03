import Text3DFlip from "../components/ui/text-3d-flip"
import { InteractiveHoverButton } from "../components/ui/interactive-hover-button"
import { PixelImage } from "../components/ui/pixel-image"
import { TextAnimate } from "../components/ui/text-animate"
import { motion } from "framer-motion"
import { WhatWeDo, OurCommitment} from "../components/layout/services"
import AboutSection from "../components/layout/about-sections"

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
                                className="block bg-background text-center md:text-left font-display text-heading tracking-heading"
                                textClassName="bg-background text-foreground text-center md:text-left"
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
                        className="rounded-full hidden md:inline bg-lemon px-6 py-2.5 font-sans text-body font-semibold tracking-body text-navy transition hover:bg-lemon-dim"
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
            <section id="about-us" className="border-y-2 border-navy bg-navy py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-12">
                <div className="mx-auto max-w-6xl px-6">
                    <p className="font-mono text-caption uppercase tracking-caption text-lemon">About us</p>
                    <h3 className="mt-2 max-w-lg font-display text-heading tracking-heading text-paper">
                        <TextAnimate animation="slideUp" by="word">
                            A Centre for Digital Learning.
                        </TextAnimate>
                    </h3>
                    <div className="mt-5 max-w-md font-sans text-body tracking-subheading text-paper/75">
                        <p>
                            Owerri CBT HI-TECH is a leading digital learning and computer-based testing centre located in Owerri, Imo State. Dedicated to technology-assisted education, we provide modern facilities, expert guidance, and practical knowledge to support students, examination candidates, and professionals in navigating today’s digital landscape.
                        </p>
                        
                       
                    </div>
                    
                </div>
                <div className="mx-auto max-w-md px-6 font-sans text-body tracking-subheading text-paper/75">
                    <motion.p className="mt-4" initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Our comprehensive services include computer-based examination hosting, academic registration support—such as JAMB and Post-UTME processing—and hands-on computer training. By combining state-of-the-art technology with personalized support, we equip learners with the essential skills and resources needed for academic, career, and personal success.
                    </motion.p>
                    <motion.p className="mt-4" initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Our core mission is to leverage technology to make learning, examinations, and essential online academic services simpler, more accessible, and highly effective. We are committed to removing digital barriers and delivering a seamless, stress-free experience for everyone in our community.
                    </motion.p>
                </div>
            </section>
            <section>
                <WhatWeDo />
                <OurCommitment />
            </section>
            {ABOUT_SECTIONS.map((section, i) => (
                <AboutSection key={section.caption} data={section} reverse={i % 2 === 1} />
            ))}
        </>
       
    )
}