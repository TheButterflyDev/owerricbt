import type { FastifyPluginAsync } from 'fastify'
import { db } from '../db.js'

interface SiteStat {
  id: number
  stat_key: string
  stat_value: string
  label: string
}

const statsRoutes: FastifyPluginAsync = async (app) => {
  app.get('/site/stats', async () => {
    const stats = await db.all<SiteStat>('SELECT * FROM site_stats')
    const result: Record<string, { value: string; label: string }> = {}
    for (const stat of stats) {
      result[stat.stat_key] = { value: stat.stat_value, label: stat.label }
    }
    return result
  })
}

export default statsRoutes
