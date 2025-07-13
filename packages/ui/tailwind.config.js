const gluestackPlugin = require('@gluestack-ui/nativewind-utils/tailwind-plugin')

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../apps/web/app/**/*.{js,ts,jsx,tsx}",
    "../../apps/native/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [gluestackPlugin],
  theme: {
    extend: {
      // gluestack-uiのテーマ設定と統合される
    },
  },
  plugins: [],
}