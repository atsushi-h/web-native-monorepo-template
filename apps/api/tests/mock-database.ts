import type { Env } from '../src/app'

// テスト環境でのモックDB使用のため
// biome-ignore lint/suspicious/noExplicitAny: Test mock can be any implementation
export async function getMockDb(): Promise<any> {
  // 動的インポートでテストヘルパーを取得（テスト環境でのみ利用可能）
  try {
    // biome-ignore lint/suspicious/noExplicitAny: Test helper dynamic import
    const testHelpers = (await import('./utils/test-helpers')) as any
    return testHelpers.mockDb
  } catch {
    return null
  }
}

export function isTestEnvironment(env: Env): boolean {
  return env.NODE_ENV === 'test'
}
