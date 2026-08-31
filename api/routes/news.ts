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
    const articles = await db.all<Omit<NewsArticle, 'content' | 'created_at'>>(`
      SELECT id, title, slug, summary, category, published_at
      FROM news
      ORDER BY published_at DESC
    `)
    return articles
  })

  app.get<{ Params: { slug: string } }>('/news/:slug', async (request, reply) => {
    const { slug } = request.params
    const article = await db.get<NewsArticle>('SELECT * FROM news WHERE slug = $1', [slug])
    if (!article) {
      return reply.code(404).send({ error: 'Article not found' })
    }
    return article
  })
}

export default newsRoutes
