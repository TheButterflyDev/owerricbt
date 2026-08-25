import type { FastifyPluginAsync } from 'fastify'
import { db } from '../db.js'

interface SearchQuery {
  q?: string
}

const searchRoutes: FastifyPluginAsync = async (app) => {
  app.get<{ Querystring: SearchQuery }>('/search', async (request) => {
    const { q } = request.query
    if (!q || q.trim().length === 0) {
      return { events: [], news: [], resources: [] }
    }

    const term = `%${q}%`

    const events = db.prepare(`
      SELECT id, title, description, event_date, event_type
      FROM events
      WHERE title LIKE ? OR description LIKE ?
      ORDER BY event_date ASC
      LIMIT 10
    `).all(term, term)

    const news = db.prepare(`
      SELECT id, title, slug, summary, category
      FROM news
      WHERE title LIKE ? OR summary LIKE ? OR content LIKE ?
      ORDER BY published_at DESC
      LIMIT 10
    `).all(term, term, term)

    const resources = db.prepare(`
      SELECT id, title, description, resource_type
      FROM resources
      WHERE title LIKE ? OR description LIKE ?
      ORDER BY created_at DESC
      LIMIT 10
    `).all(term, term)

    return { events, news, resources }
  })
}

export default searchRoutes
