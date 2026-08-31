import { useState } from "react"

export function BookingCTA() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setStatus("submitting")
    try {
      // TODO: point this at your real subscribe endpoint / provider
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error("Subscribe failed")
      setStatus("success")
      setEmail("")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section className="relative overflow-hidden bg-lemon py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-mono text-caption uppercase tracking-caption text-navy/70">Stay Updated on JAMB</p>
        <h2 className="mt-2 font-display text-heading tracking-heading text-navy">Never Miss a JAMB Update.</h2>
        <p className="mt-3 font-sans text-body tracking-body text-navy/70">
          Get JAMB news, registration updates, deadlines and admission information delivered straight to your inbox.
        </p>

        {status === "success" ? (
          <p className="mt-8 font-sans text-body font-semibold text-navy">
            You're subscribed. Watch your inbox for JAMB updates.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex  items-center justify-center gap-3 flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full max-w-xs rounded-button border-2 border-navy bg-paper px-4 py-3 font-sans text-body text-navy placeholder:text-navy/50 focus:outline-none sm:w-64"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-block rounded-button border-2 border-navy bg-navy px-8 py-3 font-sans text-body font-semibold tracking-body text-paper transition hover:bg-navy-ink disabled:opacity-60"
            >
              {status === "submitting" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 font-sans text-caption text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  )
}