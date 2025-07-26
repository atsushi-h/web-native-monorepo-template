import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({ path: '.env' })

// 環境変数のバリデーション
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
const token = process.env.CLOUDFLARE_API_TOKEN
const databaseIdDev = process.env.D1_DATABASE_ID_DEV
const databaseIdPrd = process.env.D1_DATABASE_ID_PRD

if (!accountId || !token || !databaseIdDev || !databaseIdPrd) {
  throw new Error(
    'Missing required environment variables. Please check D1_SETUP.md for setup instructions.',
  )
}

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle/migrations',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId,
    databaseId: process.env.NODE_ENV === 'production' ? databaseIdPrd : databaseIdDev,
    token,
  },
})
