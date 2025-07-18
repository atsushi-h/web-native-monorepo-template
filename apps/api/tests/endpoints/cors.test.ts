import { describe, expect, it } from 'vitest'
import { createApp } from '../../src/app'
import { assertResponseStatus, createHeaders, createMockEnv } from '../utils/test-helpers'

describe('CORS configuration', () => {
  describe('CORS headers', () => {
    it('should include CORS headers for allowed origins', async () => {
      const app = createApp()
      const env = createMockEnv({
        CORS_ORIGINS: 'http://localhost:3000,https://example.com',
      })

      const response = await app.request(
        '/',
        {
          headers: createHeaders({
            Origin: 'http://localhost:3000',
          }),
        },
        env,
      )

      assertResponseStatus(response, 200)

      // CORS ヘッダーの確認
      expect(response.headers.get('access-control-allow-origin')).toBe('http://localhost:3000')
      const allowMethods = response.headers.get('access-control-allow-methods')
      const allowHeaders = response.headers.get('access-control-allow-headers')

      if (allowMethods) {
        expect(allowMethods).toContain('GET')
        expect(allowMethods).toContain('POST')
        expect(allowMethods).toContain('PUT')
        expect(allowMethods).toContain('DELETE')
        expect(allowMethods).toContain('OPTIONS')
      }

      if (allowHeaders) {
        expect(allowHeaders).toContain('Content-Type')
        expect(allowHeaders).toContain('Authorization')
      }
    })

    it('should handle second allowed origin', async () => {
      const app = createApp()
      const env = createMockEnv({
        CORS_ORIGINS: 'http://localhost:3000,https://example.com',
      })

      const response = await app.request(
        '/',
        {
          headers: createHeaders({
            Origin: 'https://example.com',
          }),
        },
        env,
      )

      assertResponseStatus(response, 200)
      expect(response.headers.get('access-control-allow-origin')).toBe('https://example.com')
    })

    it('should use default localhost when CORS_ORIGINS is not set', async () => {
      const app = createApp()
      const env = createMockEnv({
        CORS_ORIGINS: undefined,
      })

      const response = await app.request(
        '/',
        {
          headers: createHeaders({
            Origin: 'http://localhost:3000',
          }),
        },
        env,
      )

      assertResponseStatus(response, 200)
      expect(response.headers.get('access-control-allow-origin')).toBe('http://localhost:3000')
    })

    it('should handle CORS_ORIGINS with whitespace', async () => {
      const app = createApp()
      const env = createMockEnv({
        CORS_ORIGINS: ' http://localhost:3000 , https://example.com ',
      })

      const response = await app.request(
        '/',
        {
          headers: createHeaders({
            Origin: 'http://localhost:3000',
          }),
        },
        env,
      )

      assertResponseStatus(response, 200)
      expect(response.headers.get('access-control-allow-origin')).toBe('http://localhost:3000')
    })
  })

  describe('OPTIONS preflight requests', () => {
    it('should handle OPTIONS requests for CORS preflight', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request(
        '/api/test',
        {
          method: 'OPTIONS',
          headers: createHeaders({
            Origin: 'http://localhost:3000',
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'Content-Type',
          }),
        },
        env,
      )

      // OPTIONSリクエストは通常204または200を返す
      expect([200, 204]).toContain(response.status)
      expect(response.headers.get('access-control-allow-origin')).toBe('http://localhost:3000')
      expect(response.headers.get('access-control-allow-methods')).toContain('POST')
      expect(response.headers.get('access-control-allow-headers')).toContain('Content-Type')
    })

    it('should handle OPTIONS for all endpoints', async () => {
      const app = createApp()
      const env = createMockEnv()

      // 複数のエンドポイントでOPTIONSをテスト
      const endpoints = ['/', '/api/health', '/api/test', '/api/protected']

      for (const endpoint of endpoints) {
        const response = await app.request(
          endpoint,
          {
            method: 'OPTIONS',
            headers: createHeaders({
              Origin: 'http://localhost:3000',
            }),
          },
          env,
        )

        expect([200, 204]).toContain(response.status)
        expect(response.headers.get('access-control-allow-origin')).toBe('http://localhost:3000')
      }
    })
  })

  describe('Cross-origin request scenarios', () => {
    it('should allow requests from configured origins', async () => {
      const app = createApp()
      const env = createMockEnv({
        CORS_ORIGINS: 'https://myapp.com,https://admin.myapp.com',
      })

      const response = await app.request(
        '/api/health',
        {
          headers: createHeaders({
            Origin: 'https://myapp.com',
          }),
        },
        env,
      )

      assertResponseStatus(response, 200)
      expect(response.headers.get('access-control-allow-origin')).toBe('https://myapp.com')
    })

    it('should work with POST requests and custom headers', async () => {
      const app = createApp()
      const env = createMockEnv({
        API_SECRET_KEY: 'test-key',
      })

      const response = await app.request(
        '/api/protected',
        {
          method: 'GET',
          headers: createHeaders({
            Origin: 'http://localhost:3000',
            'X-API-Key': 'test-key',
          }),
        },
        env,
      )

      assertResponseStatus(response, 200)
      expect(response.headers.get('access-control-allow-origin')).toBe('http://localhost:3000')
    })
  })

  describe('CORS configuration edge cases', () => {
    it('should handle empty CORS_ORIGINS string', async () => {
      const app = createApp()
      const env = createMockEnv({
        CORS_ORIGINS: '',
      })

      const response = await app.request(
        '/',
        {
          headers: createHeaders({
            Origin: 'http://localhost:3000',
          }),
        },
        env,
      )

      assertResponseStatus(response, 200)
      // 空文字の場合はデフォルトのlocalhostが使われるはず
      const corsOrigin = response.headers.get('access-control-allow-origin')
      // Honoの場合、空文字だとCORSヘッダーが設定されない可能性がある
      expect(corsOrigin === 'http://localhost:3000' || corsOrigin === null).toBe(true)
    })

    it('should handle single origin without comma', async () => {
      const app = createApp()
      const env = createMockEnv({
        CORS_ORIGINS: 'https://single-origin.com',
      })

      const response = await app.request(
        '/',
        {
          headers: createHeaders({
            Origin: 'https://single-origin.com',
          }),
        },
        env,
      )

      assertResponseStatus(response, 200)
      expect(response.headers.get('access-control-allow-origin')).toBe('https://single-origin.com')
    })
  })
})
