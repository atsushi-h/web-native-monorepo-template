import { Hono } from 'hono'
import { describeRoute } from 'hono-openapi'
import { resolver } from 'hono-openapi/zod'
import { z } from 'zod'
import 'zod-openapi/extend'
import type { Env } from '../app'

const HealthResponseSchema = z
  .object({
    status: z.literal('healthy').openapi({
      description: 'Health status of the API',
      example: 'healthy',
    }),
    timestamp: z.string().datetime().openapi({
      description: 'Current timestamp in ISO 8601 format',
      example: '2024-01-15T10:30:00Z',
    }),
    environment: z.string().openapi({
      description: 'Environment where the API is running',
      example: 'cloudflare-workers',
    }),
  })
  .openapi({ ref: 'HealthResponse' })

const health = new Hono<{ Bindings: Env }>().get(
  '/',
  describeRoute({
    description: 'Health check endpoint',
    summary: 'Check if the API is healthy',
    tags: ['health'],
    responses: {
      200: {
        description: 'API is healthy',
        content: {
          'application/json': {
            schema: resolver(HealthResponseSchema),
          },
        },
      },
    },
  }),
  (c) => {
    return c.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: 'cloudflare-workers',
    })
  },
)

export default health
