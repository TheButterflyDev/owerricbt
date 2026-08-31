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

    const events = await db.all(`
      SELECT
        id,
        title,
        description,
        event_date,
        event_type,
        '/events' AS href
      FROM events
      WHERE LOWER(title) LIKE LOWER($1) OR LOWER(description) LIKE LOWER($2)
      ORDER BY event_date ASC
      LIMIT 8
    `, [term, term])

    const news = await db.all(`
      SELECT
        id,
        title,
        slug,
        summary,
        category,
        '/jamb-news' AS href
      FROM news
      WHERE LOWER(title) LIKE LOWER($1) OR LOWER(summary) LIKE LOWER($2) OR LOWER(content) LIKE LOWER($3)
      ORDER BY published_at DESC
      LIMIT 8
    `, [term, term, term])

    const resources = await db.all(`
      SELECT
        id,
        title,
        description,
        resource_type,
        '/resources' AS href
      FROM resources
      WHERE LOWER(title) LIKE LOWER($1) OR LOWER(description) LIKE LOWER($2)
      ORDER BY created_at DESC
      LIMIT 8
    `, [term, term])

    return { events, news, resources }
  })
}

export default searchRoutes
