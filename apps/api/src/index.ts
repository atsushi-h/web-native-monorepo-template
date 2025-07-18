import { Hono } from 'hono'
import { cors } from 'hono/cors'

interface Env {
  CORS_ORIGINS?: string
  API_SECRET_KEY?: string
  DATABASE_URL?: string
  NODE_ENV?: string
}

const app = new Hono<{ Bindings: Env }>()

// CORS設定
app.use('*', (c, next) => {
  const corsOrigins = c.env?.CORS_ORIGINS?.split(',').map((origin) => origin.trim()) || []

  // 本番環境では明示的なオリジン指定を強制
  const origins = corsOrigins.length > 0 ? corsOrigins : ['http://localhost:3000']

  return cors({
    origin: origins,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })(c, next)
})

// ルートエンドポイント
app.get('/', (c) => {
  return c.json({
    message: 'Hello from Hono API!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    cors_origins: c.env?.CORS_ORIGINS ? c.env.CORS_ORIGINS.split(',') : 'not configured',
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

// 環境変数確認エンドポイント（開発用）
app.get('/api/env', (c) => {
  return c.json({
    message: 'Environment variables check',
    cors_origins: c.env?.CORS_ORIGINS || 'not set',
    cors_origins_array: c.env?.CORS_ORIGINS?.split(',') || [],
    has_env: !!c.env,
    // 秘密情報は存在確認のみ（値は表示しない）
    has_api_secret: !!c.env?.API_SECRET_KEY,
    has_database_url: !!c.env?.DATABASE_URL,
  })
})

// 秘密情報が必要なエンドポイント（テスト用）
app.get('/api/protected', (c) => {
  const apiKey = c.env?.API_SECRET_KEY

  if (!apiKey) {
    return c.json({ error: 'API_SECRET_KEY not configured' }, 500)
  }

  // 実際の認証ロジック例
  const providedKey = c.req.header('X-API-Key')
  if (providedKey !== apiKey) {
    return c.json({ error: 'Invalid API key' }, 401)
  }

  return c.json({
    message: 'Access granted to protected resource',
    database_connected: !!c.env?.DATABASE_URL,
    timestamp: new Date().toISOString(),
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

// エラーハンドリングテスト用エンドポイント（開発用）
app.get('/api/test-error', (_c) => {
  throw new Error('This is a test error with sensitive information: database password = secret123')
})

// 404ハンドラー
app.notFound((c) => {
  return c.json({ error: 'Not Found', path: c.req.path }, 404)
})

// エラーハンドラー
app.onError((err, c) => {
  console.error('Error:', err)

  // 開発環境かどうかを判定
  const isDev = c.env?.NODE_ENV === 'development' || c.env?.NODE_ENV === 'dev'

  // 本番環境では詳細なエラー情報を隠す
  return c.json(
    {
      error: 'Internal Server Error',
      message: isDev ? err.message : 'Something went wrong',
      ...(isDev && { stack: err.stack }), // 開発環境のみスタックトレースを含める
    },
    500,
  )
})

export default app
