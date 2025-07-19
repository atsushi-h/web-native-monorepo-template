import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import type { Env } from '../app'

export function getDb(env: Env) {
  const connectionString = env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  // テスト環境ではモックDBを使用
  if (connectionString.startsWith('mock://')) {
    // モックDB用の空のドライバーを返す
    // 実際のクエリはルート層でモックされる
    // biome-ignore lint/suspicious/noExplicitAny: Mock DB placeholder for testing
    return null as any
  }

  // Supabase connection pooler requires prepare: false
  // Cloudflare Workersでは接続プールは自動的に管理される
  const queryClient = postgres(connectionString, {
    prepare: false,
    max: 1, // Cloudflare Workersでは1接続のみ
  })

  return drizzle({ client: queryClient })
}

// テスト環境用のモックDB接続判定
export function isTestEnvironment(env: Env): boolean {
  return env.DATABASE_URL?.startsWith('mock://') ?? false
}
