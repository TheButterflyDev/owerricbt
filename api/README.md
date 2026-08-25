# Owerri CBT HI-TECH — Backend API

Fastify 5 + SQLite backend serving the Owerri CBT HI-TECH frontend.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Fastify v5 |
| Runtime | Node.js via tsx (hot-reload in dev) |
| Language | TypeScript |
| Database | SQLite via better-sqlite3 |
| CORS | @fastify/cors |

## Project Structure

```
api/
├── server.ts          # Entry point — Fastify server setup, plugin registration
├── db.ts              # SQLite connection + schema initialization
├── seed.ts            # Database seeder with sample data
├── routes/            # Route modules (one file per resource)
│   ├── events.ts
│   ├── news.ts
│   ├── resources.ts
│   ├── contact.ts
│   ├── search.ts
│   └── stats.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup

```bash
npm install          # install dependencies
npm run dev          # start dev server with hot-reload (port 3000)
npm run seed         # seed database with sample data
```

## API Endpoints

### Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | List all upcoming events |
| GET | `/api/events/:id` | Get single event by ID |

### JAMB News
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/news` | List all news articles (newest first) |
| GET | `/api/news/:slug` | Get single article by slug |

### Resources
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/resources` | List all learning resources |
| GET | `/api/resources/:id` | Get single resource with full content |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit a contact form message |

### Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/search?q=...` | Search across news, events, and resources |

### Site Stats
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/site/stats` | Get dynamic site stats (reviews, students, years) |

## Database Schema

The SQLite database is stored at `./data/owerricbt.db` and auto-created on first run.

### Tables

- **events** — Exam dates, registration deadlines, training schedules
- **news** — JAMB news articles with slug-based routing
- **resources** — Learning guides, articles, FAQs
- **contact_messages** — Submitted contact form messages
- **site_stats** — Dynamic site-wide statistics

## Frontend Integration

The frontend (Vite dev server on port 5173) proxies `/api/*` requests to `http://localhost:3000` via the Vite config proxy. No CORS issues in dev.
