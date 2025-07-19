import { Hono } from 'hono'
import { corsMiddleware } from './middleware/cors'
import { errorHandler } from './middleware/error'
import { securityHeaders } from './middleware/security'
import env from './routes/env'
import health from './routes/health'
import todos from './routes/todos/index'

export interface Env {
  CORS_ORIGINS?: string
  API_SECRET_KEY?: string
  DATABASE_URL: string
  NODE_ENV?: 'development' | 'dev' | 'production' | 'test'
}

export function createApp() {
  const app = new Hono<{ Bindings: Env }>()

  // グローバルミドルウェア
  app.use('*', securityHeaders())
  app.use('*', corsMiddleware())

  // ルートエンドポイント
  const routes = app
    .get('/', (c) => {
      return c.json({
        message: 'Hello from Hono API!',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        cors_origins: c.env?.CORS_ORIGINS ? c.env.CORS_ORIGINS.split(',') : 'not configured',
      })
    })
    // APIルート
    .route('/api', env)
    .route('/api/health', health)
    .route('/api/todos', todos)

  // 404ハンドラー
  app.notFound((c) => {
    return c.json({ error: 'Not Found', path: c.req.path }, 404)
  })

  // エラーハンドラー
  app.onError(errorHandler)

  return routes
}

export type AppType = ReturnType<typeof createApp>
