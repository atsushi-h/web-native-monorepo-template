const gluestackPlugin = require('@gluestack-ui/nativewind-utils/tailwind-plugin')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [gluestackPlugin],
  theme: {
    extend: {},
  },
  plugins: [],
}