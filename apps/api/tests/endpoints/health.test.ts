import { describe, expect, it } from 'vitest'
import { createApp } from '../../src/app'
import {
  assertJsonProperty,
  assertResponseStatus,
  assertValidTimestamp,
  createMockEnv,
  parseJsonResponse,
} from '../utils/test-helpers'

describe('/api/health', () => {
  it('should return healthy status', async () => {
    const app = createApp()
    const env = createMockEnv()

    const response = await app.request('/api/health', {}, env)

    assertResponseStatus(response, 200)

    const data = await parseJsonResponse(response)

    assertJsonProperty(data, 'status', 'healthy')
    assertJsonProperty(data, 'environment', 'cloudflare-workers')
    assertValidTimestamp(assertJsonProperty(data, 'timestamp'))
  })

  it('should have correct content type', async () => {
    const app = createApp()
    const env = createMockEnv()

    const response = await app.request('/api/health', {}, env)

    expect(response.headers.get('content-type')).toContain('application/json')
  })

  it('should work without environment variables', async () => {
    const app = createApp()
    const env = createMockEnv({
      CORS_ORIGINS: undefined,
      API_SECRET_KEY: undefined,
      DATABASE_URL: undefined,
      NODE_ENV: undefined,
    })

    const response = await app.request('/api/health', {}, env)

    assertResponseStatus(response, 200)

    const data = await parseJsonResponse(response)
    assertJsonProperty(data, 'status', 'healthy')
  })
})
