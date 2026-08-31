import type { FastifyPluginAsync } from 'fastify'
import { db } from '../db.js'

interface ContactBody {
  name: string
  email: string
  subject: string
  message: string
}

interface NewsletterBody {
  email: string
  name?: string
  source?: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const normalizeInput = (value: string | undefined) => value?.trim() ?? ''

const handleNewsletterSubscription = async (request: any, reply: any) => {
  const email = normalizeInput(request.body.email)
  const name = normalizeInput(request.body.name)
  const source = normalizeInput(request.body.source) || 'contact-page'

  if (!email) {
    return reply.code(400).send({ error: 'Email is required' })
  }

  if (!emailRegex.test(email)) {
    return reply.code(400).send({ error: 'Invalid email address' })
  }

  try {
    await db.run(`
      INSERT INTO newsletter_subscribers (email, name, source)
      VALUES ($1, $2, $3)
    `, [email.toLowerCase(), name || null, source])

    return reply.code(201).send({
      success: true,
      message: 'Subscribed to newsletter successfully',
    })
  } catch (error) {
    const message = String((error as Error)?.message ?? '')
    if (message.includes('UNIQUE constraint failed')) {
      return reply.code(409).send({ error: 'This email is already subscribed' })
    }

    request.log.error({ err: error }, 'newsletter subscription failed')
    return reply.code(500).send({ error: 'Unable to process subscription right now' })
  }
}

const contactRoutes: FastifyPluginAsync = async (app) => {
  app.post<{ Body: ContactBody }>('/contact', async (request, reply) => {
    const name = normalizeInput(request.body.name)
    const email = normalizeInput(request.body.email)
    const subject = normalizeInput(request.body.subject)
    const message = normalizeInput(request.body.message)

    if (!name || !email || !subject || !message) {
      return reply.code(400).send({ error: 'All fields are required' })
    }

    if (!emailRegex.test(email)) {
      return reply.code(400).send({ error: 'Invalid email address' })
    }

    const result = await db.run(`
      INSERT INTO contact_messages (name, email, subject, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `, [name, email, subject, message])

    return reply.code(201).send({
      success: true,
      id: result.lastInsertRowid ?? result.rowCount ?? 0,
    })
  })

  app.post<{ Body: NewsletterBody }>('/newsletter', async (request, reply) => {
    return handleNewsletterSubscription(request, reply)
  })

  app.post<{ Body: NewsletterBody }>('/newsletter/subscribe', async (request, reply) => {
    return handleNewsletterSubscription(request, reply)
  })
}

export default contactRoutes
