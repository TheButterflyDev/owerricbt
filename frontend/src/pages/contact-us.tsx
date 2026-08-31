import { useState } from "react"

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setContactStatus("sending")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error ?? "Failed")

      setContactStatus("success")
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setContactStatus("error")
      console.error(error)
    }
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNewsletterStatus("sending")

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error ?? "Failed")

      setNewsletterStatus("success")
      setNewsletterEmail("")
    } catch (error) {
      setNewsletterStatus("error")
      console.error(error)
    }
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Stay in touch with us</h1>
          <p className="mt-2 max-w-xl text-gray-500">
            Ask a question, request guidance, or subscribe for the latest JAMB updates and exam reminders.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <span className="mb-4 inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
              Contact
            </span>
            <h2 className="text-2xl font-semibold text-slate-900">Send us a message</h2>

            {contactStatus === "success" && (
              <div className="mt-6 rounded-lg bg-green-50 p-4 text-green-700">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {contactStatus === "error" && (
              <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
                Something went wrong. Please try again.
              </div>
            )}

            <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={contactStatus === "sending"}
                className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
              >
                {contactStatus === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <span className="mb-4 inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
              Newsletter
            </span>
            <h2 className="text-2xl font-semibold text-slate-900">Join our newsletter</h2>
            <p className="mt-2 text-sm text-gray-600">
              Receive JAMB updates, registration reminders, and exam prep tips in your inbox.
            </p>

            {newsletterStatus === "success" && (
              <div className="mt-5 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
                You’re subscribed! Keep an eye on your inbox.
              </div>
            )}

            {newsletterStatus === "error" && (
              <div className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                We could not save your subscription. Please try again.
              </div>
            )}

            <form onSubmit={handleNewsletterSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="newsletter-email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-1 w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={newsletterStatus === "sending"}
                className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
              >
                {newsletterStatus === "sending" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

