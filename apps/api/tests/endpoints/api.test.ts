import { describe, expect, it } from 'vitest'
import { createApp } from '../../src/app'
import {
  assertJsonProperty,
  assertResponseStatus,
  assertValidTimestamp,
  createHeaders,
  createMockEnv,
  parseJsonResponse,
} from '../utils/test-helpers'

describe('Basic API endpoints', () => {
  describe('GET /', () => {
    it('should return welcome message with version info', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/', {}, env)

      assertResponseStatus(response, 200)

      const data = await parseJsonResponse(response)

      assertJsonProperty(data, 'message', 'Hello from Hono API!')
      assertJsonProperty(data, 'version', '1.0.0')
      assertValidTimestamp(assertJsonProperty(data, 'timestamp'))

      const corsOrigins = assertJsonProperty(data, 'cors_origins')
      expect(Array.isArray(corsOrigins)).toBe(true)
      expect(corsOrigins).toContain('http://localhost:3000')
      expect(corsOrigins).toContain('https://example.com')
    })

    it('should handle missing CORS_ORIGINS', async () => {
      const app = createApp()
      const env = createMockEnv({ CORS_ORIGINS: undefined })

      const response = await app.request('/', {}, env)

      assertResponseStatus(response, 200)

      const data = await parseJsonResponse(response)
      assertJsonProperty(data, 'cors_origins', 'not configured')
    })
  })

  describe('GET /api/test', () => {
    it('should return test endpoint response with request info', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request(
        '/api/test',
        {
          headers: createHeaders({
            'User-Agent': 'test-agent',
            'X-Custom-Header': 'test-value',
          }),
        },
        env,
      )

      assertResponseStatus(response, 200)

      const data = await parseJsonResponse(response)

      assertJsonProperty(data, 'message', 'Test endpoint working!')
      assertJsonProperty(data, 'method', 'GET')

      const url = assertJsonProperty(data, 'url')
      expect(url).toContain('/api/test')

      const headers = assertJsonProperty(data, 'headers')
      expect(headers['content-type']).toContain('application/json')
      expect(headers['x-custom-header']).toBe('test-value')
    })
  })

  describe('POST /api/test', () => {
    it('should handle JSON POST data', async () => {
      const app = createApp()
      const env = createMockEnv()
      const testData = { message: 'Hello', number: 42 }

      const response = await app.request(
        '/api/test',
        {
          method: 'POST',
          headers: createHeaders(),
          body: JSON.stringify(testData),
        },
        env,
      )

      assertResponseStatus(response, 200)

      const data = await parseJsonResponse(response)

      assertJsonProperty(data, 'message', 'POST test endpoint working!')
      assertValidTimestamp(assertJsonProperty(data, 'timestamp'))

      const received = assertJsonProperty(data, 'received')
      expect(received).toEqual(testData)
    })

    it('should handle invalid JSON gracefully', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request(
        '/api/test',
        {
          method: 'POST',
          headers: createHeaders(),
          body: 'invalid-json',
        },
        env,
      )

      assertResponseStatus(response, 200)

      const data = await parseJsonResponse(response)

      assertJsonProperty(data, 'message', 'POST test endpoint working!')
      const received = assertJsonProperty(data, 'received')
      expect(received).toEqual({})
    })

    it('should handle empty POST body', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request(
        '/api/test',
        {
          method: 'POST',
          headers: createHeaders(),
        },
        env,
      )

      assertResponseStatus(response, 200)

      const data = await parseJsonResponse(response)
      const received = assertJsonProperty(data, 'received')
      expect(received).toEqual({})
    })
  })

  describe('GET /api/env', () => {
    it('should return environment variable status', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/api/env', {}, env)

      assertResponseStatus(response, 200)

      const data = await parseJsonResponse(response)

      assertJsonProperty(data, 'message', 'Environment variables check')
      assertJsonProperty(data, 'cors_origins', 'http://localhost:3000,https://example.com')

      const corsOriginsArray = assertJsonProperty(data, 'cors_origins_array')
      expect(corsOriginsArray).toEqual(['http://localhost:3000', 'https://example.com'])

      assertJsonProperty(data, 'has_env', true)
      assertJsonProperty(data, 'has_api_secret', true)
      assertJsonProperty(data, 'has_database_url', true)
    })

    it('should handle missing environment variables', async () => {
      const app = createApp()
      const env = createMockEnv({
        CORS_ORIGINS: undefined,
        API_SECRET_KEY: undefined,
        DATABASE_URL: undefined,
      })

      const response = await app.request('/api/env', {}, env)

      assertResponseStatus(response, 200)

      const data = await parseJsonResponse(response)

      assertJsonProperty(data, 'cors_origins', 'not set')
      const corsOriginsArray = assertJsonProperty(data, 'cors_origins_array')
      expect(corsOriginsArray).toEqual([])
      assertJsonProperty(data, 'has_api_secret', false)
      assertJsonProperty(data, 'has_database_url', false)
    })
  })

  describe('404 handler', () => {
    it('should return 404 for non-existent endpoints', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/non-existent-endpoint', {}, env)

      assertResponseStatus(response, 404)

      const data = await parseJsonResponse(response)

      assertJsonProperty(data, 'error', 'Not Found')
      assertJsonProperty(data, 'path', '/non-existent-endpoint')
    })
  })
})
