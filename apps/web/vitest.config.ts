import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-native-svg': '@tamagui/react-native-svg',
    },
  },
  define: {
    DEV: 'false',
    TAMAGUI_TARGET: '"web"',
    'process.env.TAMAGUI_TARGET': '"web"',
    'process.env.NODE_ENV': '"test"',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test-setup.ts'],
  },
})
