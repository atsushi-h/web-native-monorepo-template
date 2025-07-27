import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env' })

// 環境変数のバリデーション
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
const token = process.env.CLOUDFLARE_API_TOKEN
const databaseIdDev = process.env.D1_DATABASE_ID_DEV
const databaseIdPrd = process.env.D1_DATABASE_ID_PRD

if (!accountId || !token) {
  console.warn('CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are required for remote operations')
}

// データベースIDは .dev.vars から自動取得
const databaseId =
  process.env.NODE_ENV === 'production'
    ? databaseIdPrd || process.env.D1_DATABASE_ID_PRD
    : databaseIdDev || process.env.D1_DATABASE_ID_DEV

const requireEnv = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`${name} is required`)
  }
  return value
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: requireEnv(accountId, 'CLOUDFLARE_ACCOUNT_ID'),
    databaseId: requireEnv(databaseId, 'Database ID'),
    token: requireEnv(token, 'CLOUDFLARE_API_TOKEN'),
  },
})
