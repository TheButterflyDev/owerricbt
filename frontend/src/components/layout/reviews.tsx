import { cn } from "../../lib/utils";
import { InteractiveGridPattern } from "../ui/interactive-grid-pattern";
import { TextReveal } from "../ui/text-reveal"
import { Marquee } from "../ui/marquee"

const reviews = [
  {
    name: "Alfred Akuta",
    body: "It was extravagant I love the service there.",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjU4mDmYSSbMVGLjw5bxWFZ0lixyZT5b15Z_Ii0IpOfUz31ZBiOO=w108-h108-p-rp-mo-br100",
    link: "https://share.google/52ACviIVAg0PqDQvV"
  },
  {
    name: "TopGuy",
    body: "It was a great experience.",
    img: "https://lh3.googleusercontent.com/a-/ALV-UjWVIg7f3mY_MmACs2MS8IYXiiQPMd8vqTzpofNAf1XEjueM64pw=w108-h108-p-rp-mo-ba12-br100",
    link: "https://share.google/ZBr5P6BlFDRMd854c"
  },
  {
    name: "John",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
    link: "https://share.google/XYZ1234567890"
  },
]

const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)
const thirdRow = reviews.slice(0, reviews.length / 2)
const fourthRow = reviews.slice(reviews.length / 2)

const ReviewCard = ({
  img,
  name,
  body,
  link
}: {
  img: string
  name: string
  body: string
  link: string
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-fit cursor-pointer overflow-hidden rounded-xl border p-4 sm:w-36",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <a href={link} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          {/* <p className="text-xs font-medium dark:text-white/40">{username}</p> */}
        </div>
      </a>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}

export function Marquee3D() {
  return (
    <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.link} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {secondRow.map((review) => (
            <ReviewCard key={review.link} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {thirdRow.map((review) => (
            <ReviewCard key={review.link} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:20s]" vertical>
          {fourthRow.map((review) => (
            <ReviewCard key={review.link} {...review} />
          ))}
        </Marquee>
      </div>

      <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-linear-to-b"></div>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  )
}


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
                {/* <div className="sticky top-0 flex items-center justify-center">
                    <Marquee3D />
                </div> */}
            </div>
            
        
        </section>
    )
}