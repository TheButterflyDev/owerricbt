import Database from 'better-sqlite3'
import { Pool } from 'pg'
import { mkdirSync } from 'fs'
import { dirname } from 'path'

const DB_PATH = './data/owerricbt.db'
const databaseUrl = process.env.DATABASE_URL

const schemaSql = `
  CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    event_date TEXT NOT NULL,
    event_time TEXT,
    location TEXT,
    event_type TEXT NOT NULL DEFAULT 'exam',
    status TEXT NOT NULL DEFAULT 'upcoming',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'jamb',
    published_at TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT,
    resource_type TEXT NOT NULL DEFAULT 'guide',
    href TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    read INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    source TEXT NOT NULL DEFAULT 'contact-page',
    subscribed_at TIMESTAMP NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS site_stats (
    id SERIAL PRIMARY KEY,
    stat_key TEXT NOT NULL UNIQUE,
    stat_value TEXT NOT NULL,
    label TEXT NOT NULL
  );
`

const sqliteDb = new Database(DB_PATH)
sqliteDb.pragma('journal_mode = WAL')
sqliteDb.pragma('foreign_keys = ON')

mkdirSync(dirname(DB_PATH), { recursive: true })

const pgPool = databaseUrl ? new Pool({
  connectionString: databaseUrl,
  max: 10,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
}) : null

const isPostgres = Boolean(pgPool)

if (isPostgres) {
  await pgPool!.query(schemaSql)
} else {
  sqliteDb.exec(schemaSql.replace(/SERIAL PRIMARY KEY/g, 'INTEGER PRIMARY KEY AUTOINCREMENT').replace(/TIMESTAMP/g, 'TEXT').replace(/NOW\(\)/g, "(datetime('now'))"))
}

const normalizePgParams = (params: unknown[] = []) => params.map((value) => value ?? null)

const convertPgSqlToSqlite = (sql: string) => {
  const normalized = sql.replace(/\s+/g, ' ').trim()
  const sqliteSql = normalized.replace(/\$\d+/g, '?').replace(/\s+RETURNING\s+id\s*$/i, '')
  return sqliteSql
}

export const db = {
  async all<T>(sql: string, params: unknown[] = []): Promise<T[]> {
    if (isPostgres) {
      const result = await pgPool!.query(sql, normalizePgParams(params))
      return result.rows as T[]
    }

    const sqliteSql = convertPgSqlToSqlite(sql)
    return sqliteDb.prepare(sqliteSql).all(...params) as T[]
  },

  async get<T>(sql: string, params: unknown[] = []): Promise<T | undefined> {
    if (isPostgres) {
      const result = await pgPool!.query(sql, normalizePgParams(params))
      return (result.rows[0] as T | undefined)
    }

    const sqliteSql = convertPgSqlToSqlite(sql)
    return sqliteDb.prepare(sqliteSql).get(...params) as T | undefined
  },

  async run(sql: string, params: unknown[] = []): Promise<{ lastInsertRowid?: number | bigint; changes?: number; rowCount?: number }> {
    if (isPostgres) {
      const normalizedSql = sql.trim().toUpperCase().startsWith('INSERT') && !sql.toUpperCase().includes('RETURNING')
        ? `${sql} RETURNING id`
        : sql

      const result = await pgPool!.query(normalizedSql, normalizePgParams(params))
      return {
        lastInsertRowid: result.rows[0]?.id ?? undefined,
        changes: result.rowCount ?? 0,
        rowCount: result.rowCount ?? 0,
      }
    }

    const sqliteSql = convertPgSqlToSqlite(sql)
    const result = sqliteDb.prepare(sqliteSql).run(...params)
    return {
      lastInsertRowid: result.lastInsertRowid,
      changes: result.changes,
      rowCount: result.changes,
    }
  },

  async exec(sql: string): Promise<void> {
    if (isPostgres) {
      await pgPool!.query(sql)
      return
    }

    sqliteDb.exec(sql)
  },

  async close(): Promise<void> {
    if (isPostgres) {
      await pgPool!.end()
      return
    }

    sqliteDb.close()
  },
}
