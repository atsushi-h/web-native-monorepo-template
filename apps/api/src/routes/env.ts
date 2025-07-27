import { Hono } from 'hono'
import { describeRoute } from 'hono-openapi'
import { resolver } from 'hono-openapi/zod'
import { z } from 'zod'
import 'zod-openapi/extend'
import type { Env } from '../app'

const EnvResponseSchema = z
  .object({
    message: z.string().openapi({
      description: 'Response message',
      example: 'Environment variables check',
    }),
    cors_origins: z.string().openapi({
      description: 'CORS origins configuration',
      example: 'http://localhost:3000,https://example.com',
    }),
    cors_origins_array: z.array(z.string()).openapi({
      description: 'CORS origins as array',
      example: ['http://localhost:3000', 'https://example.com'],
    }),
    has_env: z.boolean().openapi({
      description: 'Whether environment variables are available',
      example: true,
    }),
    has_api_secret: z.boolean().openapi({
      description: 'Whether API secret key is configured',
      example: true,
    }),
    has_database_binding: z.boolean().openapi({
      description: 'Whether database binding is available',
      example: true,
    }),
  })
  .openapi({ ref: 'EnvResponse' })

const ProtectedResponseSchema = z
  .object({
    message: z.string().openapi({
      description: 'Response message',
      example: 'Access granted to protected resource',
    }),
    database_connected: z.boolean().openapi({
      description: 'Whether database is connected',
      example: true,
    }),
    timestamp: z.string().datetime().openapi({
      description: 'Current timestamp in ISO 8601 format',
      example: '2024-01-15T10:30:00Z',
    }),
  })
  .openapi({ ref: 'ProtectedResponse' })

const TestResponseSchema = z
  .object({
    message: z.string().openapi({
      description: 'Response message',
      example: 'Test endpoint working!',
    }),
    method: z.string().openapi({
      description: 'HTTP method',
      example: 'GET',
    }),
    url: z.string().openapi({
      description: 'Request URL',
      example: 'http://localhost:8787/api/test',
    }),
    headers: z.record(z.string()).openapi({
      description: 'Request headers',
      example: { 'content-type': 'application/json' },
    }),
  })
  .openapi({ ref: 'TestResponse' })

const TestPostResponseSchema = z
  .object({
    message: z.string().openapi({
      description: 'Response message',
      example: 'POST test endpoint working!',
    }),
    received: z.any().openapi({
      description: 'Received request body',
      example: { test: 'data' },
    }),
    timestamp: z.string().datetime().openapi({
      description: 'Current timestamp in ISO 8601 format',
      example: '2024-01-15T10:30:00Z',
    }),
  })
  .openapi({ ref: 'TestPostResponse' })

const ErrorResponseSchema = z
  .object({
    error: z.string().openapi({
      description: 'Error message',
      example: 'Invalid API key',
    }),
  })
  .openapi({ ref: 'ErrorResponse' })

const env = new Hono<{ Bindings: Env }>()
  .get(
    '/env',
    describeRoute({
      description: 'Environment variables check',
      summary: 'Check environment configuration',
      tags: ['env'],
      responses: {
        200: {
          description: 'Environment configuration retrieved successfully',
          content: {
            'application/json': {
              schema: resolver(EnvResponseSchema),
            },
          },
        },
      },
    }),
    (c) => {
      return c.json({
        message: 'Environment variables check',
        cors_origins: c.env?.CORS_ORIGINS || 'not set',
        cors_origins_array: c.env?.CORS_ORIGINS?.split(',') || [],
        has_env: !!c.env,
        // 秘密情報は存在確認のみ（値は表示しない）
        has_api_secret: !!c.env?.API_SECRET_KEY,
        has_database_binding: !!c.env?.DB,
      })
    },
  )
  .get(
    '/protected',
    describeRoute({
      description: 'Protected endpoint requiring API key authentication',
      summary: 'Access protected resource',
      tags: ['env'],
      security: [{ apiKey: [] }],
      responses: {
        200: {
          description: 'Access granted',
          content: {
            'application/json': {
              schema: resolver(ProtectedResponseSchema),
            },
          },
        },
        401: {
          description: 'Unauthorized - Invalid API key',
          content: {
            'application/json': {
              schema: resolver(ErrorResponseSchema),
            },
          },
        },
        500: {
          description: 'Internal server error - API key not configured',
          content: {
            'application/json': {
              schema: resolver(ErrorResponseSchema),
            },
          },
        },
      },
    }),
    (c) => {
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
    },
  )
  .get(
    '/test',
    describeRoute({
      description: 'Test endpoint for debugging',
      summary: 'Test GET endpoint',
      tags: ['env'],
      responses: {
        200: {
          description: 'Test successful',
          content: {
            'application/json': {
              schema: resolver(TestResponseSchema),
            },
          },
        },
      },
    }),
    (c) => {
      return c.json({
        message: 'Test endpoint working!',
        method: c.req.method,
        url: c.req.url,
        headers: Object.fromEntries(c.req.raw.headers.entries()),
      })
    },
  )
  .post(
    '/test',
    describeRoute({
      description: 'Test POST endpoint for debugging',
      summary: 'Test POST endpoint',
      tags: ['env'],
      requestBody: {
        description: 'Any JSON payload',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              additionalProperties: true,
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Test successful',
          content: {
            'application/json': {
              schema: resolver(TestPostResponseSchema),
            },
          },
        },
      },
    }),
    async (c) => {
      const body = await c.req.json().catch(() => ({}))
      return c.json({
        message: 'POST test endpoint working!',
        received: body,
        timestamp: new Date().toISOString(),
      })
    },
  )

export default env
