import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import type { Env } from '../app'

// Cloudflare Workersではグローバル変数の使用は推奨されない
// 各リクエストごとに新しい接続を作成する必要がある

export function getDb(env: Env) {
  const connectionString = env.DATABASE_URL
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set')
  }

  // テスト環境ではモックDBを使用
  if (connectionString.startsWith('mock://')) {
    // モックDB用の空のドライバーを返す
    // 実際のクエリはルート層でモックされる
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
