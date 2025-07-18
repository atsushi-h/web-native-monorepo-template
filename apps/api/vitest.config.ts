import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config'

export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: {
        wrangler: { configPath: './wrangler.toml' },
      },
    },
    globals: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    // パフォーマンス最適化
    maxConcurrency: 5,
    testTimeout: 10000,
    hookTimeout: 10000,
    // カバレッジ設定
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['tests/**', '**/*.d.ts', 'dist/**', 'node_modules/**'],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
  esbuild: {
    target: 'es2022',
  },
})
