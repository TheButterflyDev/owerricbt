import type { FastifyPluginAsync } from 'fastify'
import { db } from '../db.js'

interface ContactBody {
  name: string
  email: string
  subject: string
  message: string
}

const contactRoutes: FastifyPluginAsync = async (app) => {
  app.post<{ Body: ContactBody }>('/contact', async (request, reply) => {
    const { name, email, subject, message } = request.body

    if (!name || !email || !subject || !message) {
      return reply.code(400).send({ error: 'All fields are required' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return reply.code(400).send({ error: 'Invalid email address' })
    }

    const stmt = db.prepare(`
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `)
    const result = stmt.run(name, email, subject, message)

    return reply.code(201).send({
      success: true,
      id: result.lastInsertRowid,
    })
  })
}

export default contactRoutes
