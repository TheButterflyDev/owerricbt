import { useEffect, useState } from "react"

interface Resource {
  id: number
  title: string
  description: string
  resource_type: string
  href: string | null
}

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/resources")
      .then((r) => r.json())
      .then((data: Resource[]) => setResources(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-blue-600">Learning Center</p>
        <h1 className="text-4xl font-bold tracking-tight">Resources</h1>
        <p className="mt-2 max-w-lg text-gray-500">
          Browse helpful guides, articles, and answers to support your next step.
        </p>

        {loading && <p className="mt-8 text-gray-400">Loading resources...</p>}

        {!loading && resources.length === 0 && (
          <p className="mt-8 text-gray-400">No resources available yet.</p>
        )}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <article key={resource.id} className="flex flex-col rounded-xl border bg-white p-6 shadow-sm">
              <span className="self-start rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                {resource.resource_type}
              </span>
              <h2 className="mt-3 text-lg font-semibold">{resource.title}</h2>
              <p className="mt-1 flex-1 text-sm text-gray-500">{resource.description}</p>
              {resource.href && (
                <a href={resource.href} className="mt-4 text-sm font-bold text-blue-600 hover:underline">
                  View resource &rarr;
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
