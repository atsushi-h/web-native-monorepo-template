import { Hono } from 'hono'
import 'zod-openapi/extend'
import { corsMiddleware } from './middleware/cors'
import { errorHandler } from './middleware/error'
import { securityHeaders } from './middleware/security'
import todos from './routes/todos/index'

export interface Env {
  CORS_ORIGINS?: string
  NODE_ENV?: 'development' | 'dev' | 'production' | 'test'
  // D1 Database binding
  DB: D1Database
}

export function createApp() {
  const app = new Hono<{ Bindings: Env }>()

  // グローバルミドルウェア
  app.use('*', securityHeaders())
  app.use('*', corsMiddleware())

  // APIルート
  const routes = app.route('/api/todos', todos)

  // 404ハンドラー
  app.notFound((c) => {
    return c.json({ error: 'Not Found', path: c.req.path }, 404)
  })

  // エラーハンドラー
  app.onError(errorHandler)

  return routes
}

export type AppType = ReturnType<typeof createApp>
