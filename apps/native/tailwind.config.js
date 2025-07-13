const gluestackPlugin = require('@gluestack-ui/nativewind-utils/tailwind-plugin')

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    '../../packages/ui/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [gluestackPlugin],
  theme: {
    extend: {},
  },
  plugins: [],
}