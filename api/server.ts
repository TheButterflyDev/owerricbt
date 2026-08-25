import Fastify from 'fastify'
import cors from '@fastify/cors'
import { db } from './db.js'
import eventsRoutes from './routes/events.js'
import newsRoutes from './routes/news.js'
import resourcesRoutes from './routes/resources.js'
import contactRoutes from './routes/contact.js'
import searchRoutes from './routes/search.js'
import statsRoutes from './routes/stats.js'

const server = Fastify({
  logger: true,
})

await server.register(cors, {
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
})

await server.register(eventsRoutes, { prefix: '/api' })
await server.register(newsRoutes, { prefix: '/api' })
await server.register(resourcesRoutes, { prefix: '/api' })
await server.register(contactRoutes, { prefix: '/api' })
await server.register(searchRoutes, { prefix: '/api' })
await server.register(statsRoutes, { prefix: '/api' })

server.get('/api/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000
    await server.listen({ port, host: '0.0.0.0' })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
