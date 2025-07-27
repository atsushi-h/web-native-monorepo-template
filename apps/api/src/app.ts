import { Hono } from 'hono'
import { describeRoute } from 'hono-openapi'
import { resolver } from 'hono-openapi/zod'
import { z } from 'zod'
import 'zod-openapi/extend'
import { corsMiddleware } from './middleware/cors'
import { errorHandler } from './middleware/error'
import { securityHeaders } from './middleware/security'
import env from './routes/env'
import health from './routes/health'
import todos from './routes/todos/index'

export interface Env {
  CORS_ORIGINS?: string
  API_SECRET_KEY?: string
  NODE_ENV?: 'development' | 'dev' | 'production' | 'test'
  // D1 Database binding
  DB: D1Database
}

const RootResponseSchema = z
  .object({
    message: z.string().openapi({
      description: 'Welcome message',
      example: 'Hello from Hono API!',
    }),
    timestamp: z.string().datetime().openapi({
      description: 'Current timestamp in ISO 8601 format',
      example: '2024-01-15T10:30:00Z',
    }),
    version: z.string().openapi({
      description: 'API version',
      example: '1.0.0',
    }),
    cors_origins: z.union([z.string(), z.array(z.string())]).openapi({
      description: 'Configured CORS origins',
      example: ['http://localhost:3000', 'https://example.com'],
    }),
  })
  .openapi({ ref: 'RootResponse' })

export function createApp() {
  const app = new Hono<{ Bindings: Env }>()

  // グローバルミドルウェア
  app.use('*', securityHeaders())
  app.use('*', corsMiddleware())

  // ルートエンドポイント
  const routes = app
    .get(
      '/',
      describeRoute({
        description: 'API root endpoint',
        summary: 'Get API information',
        responses: {
          200: {
            description: 'API information retrieved successfully',
            content: {
              'application/json': {
                schema: resolver(RootResponseSchema),
              },
            },
          },
        },
      }),
      (c) => {
        return c.json({
          message: 'Hello from Hono API!',
          timestamp: new Date().toISOString(),
          version: '1.0.0',
          cors_origins: c.env?.CORS_ORIGINS ? c.env.CORS_ORIGINS.split(',') : 'not configured',
        })
      },
    )
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
