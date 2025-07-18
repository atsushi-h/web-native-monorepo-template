import { withTamagui } from '@tamagui/next-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  experimental: {
    optimizePackageImports: ['tamagui', '@repo/ui'],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    }
    
    return config
  },
}

const tamaguiPlugin = withTamagui({
  config: '../../packages/ui/src/tamagui.config.ts',
  components: ['tamagui', '@repo/ui'],
  useReactNativeWebLite: false,
  disableExtraction: true, // Disable extraction completely for React 19 compatibility
})

export default tamaguiPlugin(nextConfig)
