import type { FastifyPluginAsync } from 'fastify'
import { db } from '../db.js'

interface Event {
  id: number
  title: string
  description: string
  event_date: string
  event_time: string | null
  location: string | null
  event_type: string
  status: string
  created_at: string
}

const eventsRoutes: FastifyPluginAsync = async (app) => {
  app.get('/events', async () => {
    const events = db.prepare(`
      SELECT * FROM events
      WHERE status = 'upcoming'
      ORDER BY event_date ASC
    `).all() as Event[]
    return events
  })

  app.get<{ Params: { id: string } }>('/events/:id', async (request, reply) => {
    const { id } = request.params
    const event = db.prepare('SELECT * FROM events WHERE id = ?').get(id) as Event | undefined
    if (!event) {
      return reply.code(404).send({ error: 'Event not found' })
    }
    return event
  })
}

export default eventsRoutes
