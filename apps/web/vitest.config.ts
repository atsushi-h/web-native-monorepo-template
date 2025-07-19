import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/test-setup.ts'],
    globals: true,
    include: ['test/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': new URL('./app', import.meta.url).pathname,
    },
  },
})
