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
    const events = await db.all<Event>(`
      SELECT * FROM events
      WHERE status = 'upcoming'
      ORDER BY event_date ASC
    `)
    return events
  })

  app.get<{ Params: { id: string } }>('/events/:id', async (request, reply) => {
    const { id } = request.params
    const event = await db.get<Event>('SELECT * FROM events WHERE id = $1', [Number(id)])
    if (!event) {
      return reply.code(404).send({ error: 'Event not found' })
    }
    return event
  })
}

export default eventsRoutes
