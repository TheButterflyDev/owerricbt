import type { FastifyPluginAsync } from 'fastify'
import { db } from '../db.js'

interface NewsArticle {
  id: number
  title: string
  slug: string
  summary: string
  content: string
  category: string
  published_at: string
  created_at: string
}

const newsRoutes: FastifyPluginAsync = async (app) => {
  app.get('/news', async () => {
    const articles = db.prepare(`
      SELECT id, title, slug, summary, category, published_at
      FROM news
      ORDER BY published_at DESC
    `).all() as Omit<NewsArticle, 'content' | 'created_at'>[]
    return articles
  })

  app.get<{ Params: { slug: string } }>('/news/:slug', async (request, reply) => {
    const { slug } = request.params
    const article = db.prepare('SELECT * FROM news WHERE slug = ?').get(slug) as NewsArticle | undefined
    if (!article) {
      return reply.code(404).send({ error: 'Article not found' })
    }
    return article
  })
}

export default newsRoutes
