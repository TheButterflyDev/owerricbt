import Fastify from 'fastify'
import FastifyVite from '@fastify/vite'

const server = Fastify({
  logger: true,
})

// Register the Fastify Vite plugin
await server.register(FastifyVite, {
  root: import.meta.url,
  dev: process.env.NODE_ENV !== 'production',
})

// Wait until Vite is fully prepared
await server.vite.ready()

// Add your API endpoints below this line
server.get('/api/data', async () => {
  return { hello: 'from Fastify backend!' }
})

// Start the server
const start = async () => {
  try {
    await server.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
