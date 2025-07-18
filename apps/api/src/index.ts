import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// CORS設定
app.use(
  '*',
  cors({
    origin: ['http://localhost:3000', 'http://localhost:8081'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }),
)

// ルートエンドポイント
app.get('/', (c) => {
  return c.json({
    message: 'Hello from Hono API!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  })
})

// ヘルスチェックエンドポイント
app.get('/api/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: 'cloudflare-workers',
  })
})

// テストエンドポイント
app.get('/api/test', (c) => {
  return c.json({
    message: 'Test endpoint working!',
    method: c.req.method,
    url: c.req.url,
    headers: Object.fromEntries(c.req.raw.headers.entries()),
  })
})

// POST テストエンドポイント
app.post('/api/test', async (c) => {
  const body = await c.req.json().catch(() => ({}))
  return c.json({
    message: 'POST test endpoint working!',
    received: body,
    timestamp: new Date().toISOString(),
  })
})

// 404ハンドラー
app.notFound((c) => {
  return c.json({ error: 'Not Found', path: c.req.path }, 404)
})

// エラーハンドラー
app.onError((err, c) => {
  console.error('Error:', err)
  return c.json(
    {
      error: 'Internal Server Error',
      message: err.message,
    },
    500,
  )
})

export default app
