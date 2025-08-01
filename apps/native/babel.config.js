module.exports = (api) => {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui', '@repo/ui'],
          config: '../../packages/ui/src/tamagui.config.ts',
          logTimings: true,
          disableExtraction: true, // Disable extraction for now
        },
      ],
    ],
  }
}
