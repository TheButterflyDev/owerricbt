# Owerri CBT HI-TECH — Frontend

React 19 + Vite 8 + Tailwind CSS 4 frontend for the Owerri CBT HI-TECH platform.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Bundler | Vite 8 |
| Language | TypeScript 6 |
| Styling | Tailwind CSS 4 |
| Routing | react-router-dom 7 |
| Command Palette | cmdk |
| Animation | motion (Framer Motion) |

## Project Structure

```
frontend/
├── src/
│   ├── main.tsx                    # App bootstrap
│   ├── App.tsx                     # Route definitions
│   ├── index.css                   # Tailwind entry + custom styles
│   ├── pages/
│   │   ├── home.tsx                # Landing page (Hero + WhyChooseUs)
│   │   ├── about.tsx               # About page
│   │   ├── events.tsx              # Events — fetches from /api/events
│   │   ├── jamb-news.tsx           # News — fetches from /api/news
│   │   ├── resources.tsx           # Resources — fetches from /api/resources
│   │   └── contact-us.tsx          # Contact form — POSTs to /api/contact
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx          # Desktop TopNav + MobileDock
│   │   │   ├── topNav.tsx          # Header with searchbar + command palette
│   │   │   ├── hero.tsx            # Hero section with WhatsApp CTA
│   │   │   └── social-proof.tsx    # WhyChooseUs — fetches from /api/site/stats
│   │   └── ui/                     # Reusable UI primitives (button, dialog, command, etc.)
│   └── lib/
│       └── utils.ts                # cn() class merge utility
├── vite.config.ts                  # Vite config with /api proxy to backend
├── tsconfig.json
├── package.json
└── index.html
```

## Setup

```bash
npm install          # install dependencies
npm run dev          # start Vite dev server (port 5173)
npm run build        # production build
```

## API Integration

The frontend consumes the Fastify backend via Vite's dev proxy. All `/api/*` requests are forwarded to `http://localhost:3000`.

### Proxy Config (`vite.config.ts`)

```ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

### Pages Wired to Backend

| Page | API Endpoint | Method |
|---|---|---|
| Searchbar (Ctrl+K) | `/api/search?q=...` | GET |
| Events | `/api/events` | GET |
| JAMB News | `/api/news` | GET |
| Resources | `/api/resources` | GET |
| Contact Us | `/api/contact` | POST |
| WhyChooseUs (stats) | `/api/site/stats` | GET |

## Running Both (Frontend + API)

From the project root:

```bash
npm run dev          # starts API (port 3000) + Frontend (port 5173) concurrently
```
