import { describe, expect, it } from 'vitest'
import { createApp } from '../../src/app'
import { assertResponseStatus, createMockEnv } from '../utils/test-helpers'

describe('Security', () => {
  describe('Security headers', () => {
    it('should include security headers on all responses', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/api/todos', {}, env)

      assertResponseStatus(response, 200)

      // セキュリティヘッダーの確認
      expect(response.headers.get('x-content-type-options')).toBe('nosniff')
      expect(response.headers.get('x-frame-options')).toBe('DENY')
      expect(response.headers.get('x-xss-protection')).toBe('1; mode=block')
      expect(response.headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin')
    })

    it('should include security headers on error responses', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/non-existent', {}, env)

      assertResponseStatus(response, 404)

      // エラーレスポンスでもセキュリティヘッダーが含まれることを確認
      expect(response.headers.get('x-content-type-options')).toBe('nosniff')
      expect(response.headers.get('x-frame-options')).toBe('DENY')
      expect(response.headers.get('x-xss-protection')).toBe('1; mode=block')
      expect(response.headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin')
    })

    it('should include security headers on all endpoints', async () => {
      const app = createApp()
      const env = createMockEnv()

      const endpoints = ['/api/todos']

      for (const endpoint of endpoints) {
        const response = await app.request(endpoint, {}, env)

        expect(response.headers.get('x-content-type-options')).toBe('nosniff')
        expect(response.headers.get('x-frame-options')).toBe('DENY')
        expect(response.headers.get('x-xss-protection')).toBe('1; mode=block')
        expect(response.headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin')
      }
    })
  })

  describe('Content Type validation', () => {
    it('should return correct content type for JSON responses', async () => {
      const app = createApp()
      const env = createMockEnv()

      const response = await app.request('/api/todos', {}, env)

      assertResponseStatus(response, 200)
      expect(response.headers.get('content-type')).toContain('application/json')
    })

    it('should handle requests with different content types', async () => {
      const app = createApp()
      const env = createMockEnv()

      // text/plain のリクエスト
      const response = await app.request(
        '/api/todos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: 'plain text data',
        },
        env,
      )

      assertResponseStatus(response, 400)
      expect(response.headers.get('content-type')).toContain('application/json')
    })
  })
})
