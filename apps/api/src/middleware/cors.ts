import type { MiddlewareHandler } from 'hono'
import { cors } from 'hono/cors'
import type { Env } from '../app'

export const corsMiddleware = (): MiddlewareHandler<{ Bindings: Env }> => {
  return (c, next) => {
    const corsOrigins = c.env?.CORS_ORIGINS?.split(',').map((origin) => origin.trim()) || []

    // 本番環境では明示的なオリジン指定を強制
    const origins = corsOrigins.length > 0 ? corsOrigins : ['http://localhost:3000']

    return cors({
      origin: origins,
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
    })(c, next)
  }
}
