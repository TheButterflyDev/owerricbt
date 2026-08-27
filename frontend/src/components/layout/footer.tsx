import { useEffect,useRef, useState } from "react"
import { TypingAnimation } from "../ui/typing-animation";
import { MailIcon, Phone, ChevronDown } from "lucide-react"

const MAIL_TO = "mailto:info@owerricbt.com"
const WHATSAPP_LINK = "https://wa.link/ijor10";
const PHONE_LINK = "tel:08037103677";
const ADDRESS = "https://www.google.com/maps/place/OWERRI+CBT+HI-TECH/@5.4820699,7.0010669,17z/data=!3m1!4b1!4m6!3m5!1s0x1042590eb6302f25:0x50f71a8a2a816bb9!8m2!3d5.4820699!4d7.0010669!16s%2Fg%2F11fssdk2qd?entry=ttu&g_ep=EgoyMDI2MDgyNC4wIKXMDSoASAFQAw%3D%3D"
type IconProps = React.HTMLAttributes<SVGElement>

const WhatsappIcon = (props: IconProps) => (
    <svg viewBox="0 0 24 24" {...props}>
        <path
            fill="currentColor"
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        />
        <path
            fill="currentColor"
            d="M12.031 0h-.062C5.393 0 0 5.394 0 12.031c0 2.72.877 5.243 2.365 7.291L.789 24l4.828-1.545a11.94 11.94 0 005.414 1.294h.062C18.607 23.749 24 18.353 24 11.719 24 5.393 18.607.019 12.031 0zm7.166 18.812a9.855 9.855 0 01-7.166 3.006 9.885 9.885 0 01-5.032-1.375l-.362-.215-3.756 1.203 1.219-3.66-.235-.375A9.833 9.833 0 012.163 12.03c0-5.442 4.428-9.87 9.876-9.87 2.637 0 5.113 1.028 6.976 2.895a9.788 9.788 0 012.891 6.977c0 5.442-4.428 9.87-9.869 9.78z"
        />
    </svg>
)

// Each number gets its own wa.me link (converts local 080... to +234 international format).
// Swap the `link` values for real wa.link short-links per number if you have them.
const WHATSAPP_NUMBERS = [
    { label: "0803-710-3677", link: "https://wa.link/ijor10" },
    { label: "0803-363-0333", link: "https://wa.link/dcf9ts" },
    { label: "0803-985-0342", link: "https://wa.link/9h8f4g" },
];


function WhatsappDropdown() {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={rootRef} className="relative inline-block">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="true"
                aria-expanded={open}
                className="inline-flex items-center gap-2 rounded-button bg-lemon px-5 py-2.5 font-sans text-caption font-semibold tracking-caption text-navy transition hover:bg-lemon-dim"
            >
                Chat on WhatsApp
                <ChevronDown
                    className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute bottom-full left-0 z-10 mb-2 w-56 overflow-hidden rounded-md border border-navy/10 bg-paper shadow-lg">
                    {WHATSAPP_NUMBERS.map((n) => (
                        <a
                            key={n.link}
                            href={n.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2 px-4 py-2.5 font-sans text-body text-navy transition hover:bg-lemon/20"
                        >
                            <WhatsappIcon className="size-4 text-navy/70" />
                            {n.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}



export function Footer() {

    const [year, setYear] = useState<number>(2026); // Fallback year

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer id="contact" className="border-t-2 border-navy bg-navy-ink py-14">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid gap-10 md:grid-cols-3">
                <div>
                    <p className="font-display text-heading-sm font-semibold text-paper">Owerri CBT HI-TECH</p>
                    <a href={ADDRESS} target="_blank" rel="noreferrer" className="mt-2 font-sans text-caption tracking-caption text-paper/60">
                    Plot C18 Okohia Layout, near Assumpta Press Limited, by Onitsha Road Industrial Layout, Owerri, Imo
                    State — or adjacent to Mustard Seed Nursery &amp; Primary School, Site &amp; Services Estate, New
                    Owerri.
                    </a>
                </div>

                <div>
                    <p className="font-mono text-caption uppercase tracking-caption text-lemon">Reach us</p>
                    <div className="mt-3 space-y-1 font-sans text-body text-paper/80">
                        <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex gap-x-2 items-center">
                            <WhatsappIcon className="size-4" />
                            <TypingAnimation words={[ "0803-710-3677", "0803-363-0333", "0803-985-0342" ]} loop/>
                        </a>
                        <a href={MAIL_TO} target="_blank" rel="noreferrer" className="flex gap-x-2 items-center">
                            <MailIcon className="size-4" />
                            <TypingAnimation>info@owerri-cbt-hitech.com</TypingAnimation>
                        </a>
                        <a href={PHONE_LINK} target="_blank" rel="noreferrer" className="flex gap-x-2 items-center">
                            <Phone  className="size-4" /> 
                            <TypingAnimation showCursor={false}>0803-710-3677</TypingAnimation>
                        </a>
                    </div>
                </div>

                <div>
                    {/* <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block rounded-button bg-lemon px-5 py-2.5 font-sans text-caption font-semibold tracking-caption text-navy transition hover:bg-lemon-dim"
                    >
                    Chat on WhatsApp
                    </a> */}
                    <WhatsappDropdown />
                </div>
                </div>

                <p className="mt-12 font-mono text-caption tracking-caption text-paper/40">
                    &copy; {year} Owerri CBT HI-TECH · New Owerri, Imo State
                </p>
            </div>
        </footer>
    );
}
