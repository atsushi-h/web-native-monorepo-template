import { Hono } from 'hono'
import type { Env } from '../app'

const health = new Hono<{ Bindings: Env }>().get('/', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: 'cloudflare-workers',
  })
})

export default health
