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
    const resources = await db.all<Omit<Resource, 'content' | 'created_at'>>(`
      SELECT id, title, description, resource_type, href
      FROM resources
      ORDER BY created_at DESC
    `)
    return resources
  })

  app.get<{ Params: { id: string } }>('/resources/:id', async (request, reply) => {
    const { id } = request.params
    const resource = await db.get<Resource>('SELECT * FROM resources WHERE id = $1', [Number(id)])
    if (!resource) {
      return reply.code(404).send({ error: 'Resource not found' })
    }
    return resource
  })
}

export default resourcesRoutes
