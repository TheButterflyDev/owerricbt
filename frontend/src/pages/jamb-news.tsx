import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface NewsArticle {
  id: number
  title: string
  slug: string
  summary: string
  category: string
  published_at: string
}

const JambNewsPage = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data: NewsArticle[]) => setArticles(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen px-6 py-16">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight">JAMB News</h1>
        <p className="mt-2 text-gray-500">Latest updates on JAMB registration, exams, and results.</p>

        {loading && <p className="mt-8 text-gray-400">Loading news...</p>}

        {!loading && articles.length === 0 && (
          <p className="mt-8 text-gray-400">No news articles available yet.</p>
        )}

        <div className="mt-8 space-y-4">
          {articles.map((article) => (
            <article key={article.id} className="rounded-xl border bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                    {article.category}
                  </span>
                  <h2 className="mt-2 text-xl font-semibold">{article.title}</h2>
                  <p className="mt-1 text-gray-500">{article.summary}</p>
                  <p className="mt-3 text-sm text-gray-400">
                    {new Date(article.published_at).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
                <Link
                  to={`/jamb-news/${article.slug}`}
                  className="shrink-0 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default JambNewsPage
