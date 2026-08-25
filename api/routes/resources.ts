import type { FastifyPluginAsync } from 'fastify'
import { db } from '../db.js'

interface Resource {
  id: number
  title: string
  description: string
  content: string | null
  resource_type: string
  href: string | null
  created_at: string
}

const resourcesRoutes: FastifyPluginAsync = async (app) => {
  app.get('/resources', async () => {
    const resources = db.prepare(`
      SELECT id, title, description, resource_type, href
      FROM resources
      ORDER BY created_at DESC
    `).all() as Omit<Resource, 'content' | 'created_at'>[]
    return resources
  })

  app.get<{ Params: { id: string } }>('/resources/:id', async (request, reply) => {
    const { id } = request.params
    const resource = db.prepare('SELECT * FROM resources WHERE id = ?').get(id) as Resource | undefined
    if (!resource) {
      return reply.code(404).send({ error: 'Resource not found' })
    }
    return resource
  })
}

export default resourcesRoutes
