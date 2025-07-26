import { drizzle } from 'drizzle-orm/d1'
import type { Env } from '../app'

export function getDb(env: Env) {
  // D1 Database bindingを使用
  if (!env.DB) {
    throw new Error('D1 Database binding is not set')
  }

  // テスト環境ではモックDBを使用
  if (env.NODE_ENV === 'test') {
    // モックDB用の空のドライバーを返す
    // 実際のクエリはルート層でモックされる
    // biome-ignore lint/suspicious/noExplicitAny: Mock DB placeholder for testing
    return null as any
  }

  return drizzle(env.DB)
}

// テスト環境用のモックDB接続判定
export function isTestEnvironment(env: Env): boolean {
  return env.NODE_ENV === 'test'
}
