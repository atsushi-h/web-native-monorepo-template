# Tamagui Setup Guide

This monorepo has been configured with Tamagui for cross-platform UI components that work seamlessly across Next.js (web) and Expo (native) applications.

## 📦 Installed Packages

### Core Dependencies
- **`tamagui`** (v1.132.7) - Main Tamagui package
- **`@tamagui/core`** (v1.132.7) - Core functionality
- **`@tamagui/config`** (v1.132.7) - Default configuration
- **`@tamagui/animations-react-native`** - Animation support
- **`@tamagui/font-inter`** - Inter font package

### Platform-Specific
- **Next.js**: `@tamagui/next-plugin`, `@tamagui/next-theme`
- **Expo**: `@tamagui/babel-plugin`, `expo-font`

## 🏗️ Configuration Files

### 1. Shared Configuration (`packages/ui/src/tamagui.config.ts`)
```typescript
import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui'

const tamaguiConfig = createTamagui(defaultConfig)
export default tamaguiConfig
```

### 2. Next.js Configuration (`apps/web/next.config.js`)
```javascript
import { withTamagui } from '@tamagui/next-plugin'

const tamaguiPlugin = withTamagui({
  config: '../../packages/ui/src/tamagui.config.ts',
  components: ['tamagui', '@repo/ui'],
  useReactNativeWebLite: false, // React 19互換性のためfalseに設定
  disableExtraction: true, // React 19互換性のためextractionを無効化
})
```

### 3. Expo Configuration
- **Babel** (`apps/native/babel.config.js`): Configured with Tamagui babel plugin
- **Metro** (`apps/native/metro.config.js`): Set up for monorepo support

## 🎨 Example Components

### 1. Tamagui Button (`packages/ui/src/tamagui-button.tsx`)
A styled button component with variants (primary, secondary, ghost) and sizes (small, medium, large).

### 2. Tamagui Card (`packages/ui/src/tamagui-card.tsx`)
A card component with title, description, and footer support.

## 🚀 Usage Examples

### Web (Next.js)
```tsx
import { TamaguiButton } from '@repo/ui/button'
import { TamaguiCard } from '@repo/ui/card'
import { YStack } from 'tamagui'

export default function Page() {
  return (
    <YStack space="$4" p="$4">
      <TamaguiCard title="Welcome" description="Cross-platform UI">
        <TamaguiButton>Click me!</TamaguiButton>
      </TamaguiCard>
    </YStack>
  )
}
```

### Native (Expo)
The same components work identically in React Native:
```tsx
import { TamaguiButton } from '@repo/ui/button'
import { TamaguiCard } from '@repo/ui/card'

// Use exactly the same way as on web!
```

## 📝 Important Notes

1. **Clear Cache**: When first running the apps after setup, clear the cache:
   - Web: `pnpm dev:web`
   - Native: `npx expo start -c`

2. **Theme Support**: Both apps are configured with automatic theme switching based on system preferences.

3. **SSR Support**: The Next.js app includes proper CSS injection for server-side rendering.

4. **Type Safety**: Full TypeScript support with proper type exports.

## 🔧 Development Tips

1. Create new Tamagui components in `packages/ui/src/`
2. Use Tamagui tokens (e.g., `$space`, `$color`) for consistent styling
3. Components automatically work on both platforms without changes
4. Use the default config tokens or extend the config for custom design systems

## 📚 Resources

- [Tamagui Documentation](https://tamagui.dev)
- [Configuration Guide](https://tamagui.dev/docs/core/configuration)
- [Component Library](https://tamagui.dev/ui/intro)