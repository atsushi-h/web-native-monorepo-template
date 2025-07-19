import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/test-setup.ts'],
    globals: true,
    include: ['test/**/*.test.{ts,tsx}', '!test/*.test.disabled'],
    exclude: ['node_modules', 'dist', '.expo'],
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
  },
  resolve: {
    alias: {
      '@': new URL('.', import.meta.url).pathname,
      'react-native': 'react-native-web',
    },
    conditions: ['development', 'browser'],
  },
  define: {
    __DEV__: true,
    'process.env.NODE_ENV': '"test"',
    'process.env.EXPO_ROUTER_IMPORT_MODE': '"lazy"',
  },
  optimizeDeps: {
    include: ['react-native-web', '@testing-library/react-native'],
    exclude: ['react-native'],
  },
  esbuild: {
    loader: 'tsx',
    include: /\.[jt]sx?$/,
    exclude: [],
  },
})
