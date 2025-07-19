import type { MiddlewareHandler } from 'hono'
import type { Env } from '../app'

export const securityHeaders = (): MiddlewareHandler<{ Bindings: Env }> => {
  return async (c, next) => {
    await next()

    // セキュリティヘッダーの追加
    c.header('X-Content-Type-Options', 'nosniff')
    c.header('X-Frame-Options', 'DENY')
    c.header('X-XSS-Protection', '1; mode=block')
    c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  }
}
