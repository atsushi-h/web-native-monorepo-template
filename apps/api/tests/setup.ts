// グローバルテスト設定
import { afterAll, beforeAll } from 'vitest'

beforeAll(() => {
  // テスト環境の初期化
  console.log('🧪 テスト環境を初期化中...')
})

afterAll(() => {
  // テスト環境のクリーンアップ
  console.log('🧹 テスト環境をクリーンアップ中...')
})

// Cloudflare Workers環境のモック用グローバル設定
global.btoa = global.btoa || ((str: string) => Buffer.from(str).toString('base64'))
global.atob = global.atob || ((str: string) => Buffer.from(str, 'base64').toString())
