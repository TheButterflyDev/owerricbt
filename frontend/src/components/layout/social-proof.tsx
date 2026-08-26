import { useEffect, useState } from "react"

interface Stat {
  value: string
  label: string
}

const FALLBACK: Stat[] = [
  { value: "38+", label: "Google Reviews" },
  { value: "5 min", label: "Fast Registration" },
  { value: "10+ yrs", label: "Quality customer services" },
]

export default function WhyChooseUs() {
  const [stats, setStats] = useState<Stat[]>(FALLBACK)

  useEffect(() => {
    fetch("/api/site/stats")
      .then((r) => r.json())
      .then((data: Record<string, { value: string; label: string }>) => {
        const mapped: Stat[] = [
          { value: data.reviews?.value ?? "38+", label: "Google Reviews" },
          { value: data.registration_time?.value ?? "5 min", label: "Fast Registration" },
          { value: data.years_experience?.value ?? "10+ yrs", label: "Years of Service" },
        ]
        setStats(mapped)
      })
      .catch(() => {})
  }, [])

  return (
    <section className="border-y-2 border-navy bg-navy py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono text-caption uppercase tracking-caption text-lemon">Why choose us</p>
        <h2 className="mt-2 max-w-lg font-display text-heading tracking-heading text-paper">
          Trusted by hundreds of students in Owerri.
        </h2>

        <div className="mt-12 grid gap-px overflow-hidden sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className=" p-6">
              <p className="font-display text-heading-sm font-semibold text-lemon">{stat.value}</p>
              <p className="mt-2 font-sans text-body font-semibold text-paper">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
