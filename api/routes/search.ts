import type { FastifyPluginAsync } from 'fastify'
import { db } from '../db.js'

interface SearchQuery {
  q?: string
}

const normalizeQuery = (value?: string) => {
  if (typeof value !== 'string') return ''

  const sanitized = value.trim().replace(/\s+/g, ' ')
  return sanitized.length > 0 ? sanitized : ''
}

const searchRoutes: FastifyPluginAsync = async (app) => {
  app.get<{ Querystring: SearchQuery }>('/search', async (request) => {
    const query = normalizeQuery(request.query.q)

    if (!query || query.length < 2) {
      return { events: [], news: [], resources: [] }
    }

    const term = `%${query}%`

    const events = db.prepare(`
      SELECT
        id,
        title,
        description,
        event_date,
        event_type,
        '/events' AS href
      FROM events
      WHERE LOWER(title) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?)
      ORDER BY event_date ASC
      LIMIT 8
    `).all(term, term)

    const news = db.prepare(`
      SELECT
        id,
        title,
        slug,
        summary,
        category,
        '/jamb-news' AS href
      FROM news
      WHERE LOWER(title) LIKE LOWER(?) OR LOWER(summary) LIKE LOWER(?) OR LOWER(content) LIKE LOWER(?)
      ORDER BY published_at DESC
      LIMIT 8
    `).all(term, term, term)

    const resources = db.prepare(`
      SELECT
        id,
        title,
        description,
        resource_type,
        '/resources' AS href
      FROM resources
      WHERE LOWER(title) LIKE LOWER(?) OR LOWER(description) LIKE LOWER(?)
      ORDER BY created_at DESC
      LIMIT 8
    `).all(term, term)

    return { events, news, resources }
  })
}

export default searchRoutes
