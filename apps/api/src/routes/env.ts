import { Hono } from 'hono'
import type { Env } from '../app'

const env = new Hono<{ Bindings: Env }>()
  .get('/env', (c) => {
    return c.json({
      message: 'Environment variables check',
      cors_origins: c.env?.CORS_ORIGINS || 'not set',
      cors_origins_array: c.env?.CORS_ORIGINS?.split(',') || [],
      has_env: !!c.env,
      // 秘密情報は存在確認のみ（値は表示しない）
      has_api_secret: !!c.env?.API_SECRET_KEY,
      has_database_binding: !!c.env?.DB,
    })
  })
  .get('/protected', (c) => {
    const apiKey = c.env?.API_SECRET_KEY

    if (!apiKey) {
      return c.json({ error: 'API_SECRET_KEY not configured' }, 500)
    }

    // 実際の認証ロジック例
    const providedKey = c.req.header('X-API-Key')
    if (!providedKey || providedKey !== apiKey) {
      return c.json({ error: 'Invalid API key' }, 401)
    }

    return c.json({
      message: 'Access granted to protected resource',
      database_connected: !!c.env?.DB,
      timestamp: new Date().toISOString(),
    })
  })
  .get('/test', (c) => {
    return c.json({
      message: 'Test endpoint working!',
      method: c.req.method,
      url: c.req.url,
      headers: Object.fromEntries(c.req.raw.headers.entries()),
    })
  })
  .post('/test', async (c) => {
    const body = await c.req.json().catch(() => ({}))
    return c.json({
      message: 'POST test endpoint working!',
      received: body,
      timestamp: new Date().toISOString(),
    })
  })

export default env
