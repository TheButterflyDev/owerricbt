import { useEffect, useState } from "react"

interface Event {
  id: number
  title: string
  description: string
  event_date: string
  event_time: string | null
  location: string | null
  event_type: string
  status: string
}

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data: Event[]) => setEvents(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight">Events</h1>
        <p className="mt-2 text-gray-500">Upcoming exams, workshops, and registration dates.</p>

        {loading && <p className="mt-8 text-gray-400">Loading events...</p>}

        {!loading && events.length === 0 && (
          <p className="mt-8 text-gray-400">No upcoming events at this time.</p>
        )}

        <div className="mt-8 space-y-4">
          {events.map((event) => (
            <article key={event.id} className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                    {event.event_type}
                  </span>
                  <h2 className="mt-2 text-xl font-semibold">{event.title}</h2>
                  <p className="mt-1 text-gray-500">{event.description}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-400">
                    <span>{new Date(event.event_date).toLocaleDateString("en-NG", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
                    {event.event_time && <span>{event.event_time}</span>}
                    {event.location && <span>{event.location}</span>}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default EventsPage
