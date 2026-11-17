import { Hono } from 'hono'

type Env = { ASSETS: Fetcher }

const app = new Hono<{ Bindings: Env }>()

app.get('/api/health', (c) => c.json({ ok: true }))

// Aset statis dan fallback SPA ditangani oleh binding ASSETS.
app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
