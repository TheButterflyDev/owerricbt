import { cn } from "../../lib/utils";
import { InteractiveGridPattern } from "../ui/interactive-grid-pattern";
import { TextReveal } from "../ui/text-reveal"

export default function Reviews() {
    return (
        <section id="services" className=" relative grid items-stretch gap-0 md:grid-cols-2 mx-auto max-w-6xl p-0">
            
            <div className="max-w-xl">
                <h2 className="mt-2 font-sans tracking-caption text-navy">
                <TextReveal>
                    Welcome to a Better Way to Learn, Register, and Prepare
                </TextReveal>
                </h2>
            </div>
            <div className="relative">
                <InteractiveGridPattern
                    className={cn(
                    "mask-[radial-gradient(400px_circle_at_center,white,transparent)]"
                    )}
                    width={20}
                    height={20}
                    squares={[80, 80]}
                    squaresClassName="hover:fill-navy/10"
                />
            </div>
        
        </section>
    )
}