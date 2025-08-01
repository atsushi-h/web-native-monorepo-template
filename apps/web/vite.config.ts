import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
    },
  },
  define: {
    DEV: process.env.NODE_ENV === 'development' ? 'true' : 'false',
    TAMAGUI_TARGET: '"web"',
    'process.env.TAMAGUI_TARGET': '"web"',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  optimizeDeps: {
    include: [
      'react-native-web',
      'react-native-svg-web',
      '@repo/ui',
      'tamagui',
      '@tamagui/lucide-icons',
    ],
  },
  ssr: {
    noExternal: ['@tamagui/*', 'tamagui'],
    external: ['react-native-svg', 'react-native-svg-web'],
  },
})
