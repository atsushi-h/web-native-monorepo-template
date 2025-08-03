# Tamaguiセットアップガイド

このモノレポは、React Router v7（Web）とExpo（Native）アプリケーション間でシームレスに動作するクロスプラットフォームUIコンポーネントのためにTamaguiで構成されています。

## 📦 インストール済みパッケージ

### コア依存関係
- **`tamagui`** (v1.132.7) - メインTamaguiパッケージ
- **`@tamagui/core`** (v1.132.7) - コア機能
- **`@tamagui/config`** (v1.132.7) - デフォルト設定
- **`@tamagui/animations-react-native`** - アニメーションサポート
- **`@tamagui/font-inter`** - Interフォントパッケージ

### プラットフォーム固有
- **React Router v7**: 適切なエイリアスを持つ`react-native-web`
- **Expo**: `@tamagui/babel-plugin`、`expo-font`

## 🏗️ 設定ファイル

### 1. 共有設定（`packages/ui/src/tamagui.config.ts`）
```typescript
import { defaultConfig } from '@tamagui/config/v4'
import { createTamagui } from 'tamagui'

const tamaguiConfig = createTamagui(defaultConfig)
export default tamaguiConfig
```

### 2. React Router v7設定（`apps/web/vite.config.ts`）
```typescript
export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-native-svg': '@tamagui/react-native-svg',
    },
  },
  define: {
    DEV: process.env.NODE_ENV === 'development' ? 'true' : 'false',
    TAMAGUI_TARGET: '"web"',
    'process.env.TAMAGUI_TARGET': '"web"',
  },
})
```

### 3. Expo設定
- **Babel** (`apps/native/babel.config.js`): Tamagui babelプラグインで設定
- **Metro** (`apps/native/metro.config.js`): モノレポサポート用にセットアップ

## 🎨 サンプルコンポーネント

### 1. Tamaguiボタン（`packages/ui/src/tamagui-button.tsx`）
バリアント（primary、secondary、ghost）とサイズ（small、medium、large）を持つスタイル付きボタンコンポーネント。

### 2. Tamaguiカード（`packages/ui/src/tamagui-card.tsx`）
タイトル、説明、フッターサポートを持つカードコンポーネント。

## 🚀 使用例

### Web（React Router v7）
```tsx
import { TamaguiButton } from '@repo/ui/button'
import { TamaguiCard } from '@repo/ui/card'
import { YStack } from 'tamagui'

export default function Page() {
  return (
    <YStack space="$4" p="$4">
      <TamaguiCard title="Welcome" description="クロスプラットフォームUI">
        <TamaguiButton>クリックしてください！</TamaguiButton>
      </TamaguiCard>
    </YStack>
  )
}
```

### Native（Expo）
同じコンポーネントがReact Nativeでも同じように動作します：
```tsx
import { TamaguiButton } from '@repo/ui/button'
import { TamaguiCard } from '@repo/ui/card'

// Webと全く同じ方法で使用できます！
```

## 📝 重要事項

1. **キャッシュクリア**: セットアップ後、初めてアプリを実行する際はキャッシュをクリアしてください：
   - Web: `pnpm dev:web`
   - Native: `npx expo start -c`

2. **テーマサポート**: 両方のアプリはシステム設定に基づく自動テーマ切り替えで構成されています。

3. **SPAモード**: React Router v7アプリは、最適なパフォーマンスのためSSRを無効にしたSPAモードで構成されています。

4. **型安全性**: 適切な型エクスポートを含む完全なTypeScriptサポート。

## 🔧 開発のヒント

1. 新しいTamaguiコンポーネントは`packages/ui/src/`に作成
2. 一貫したスタイリングのためにTamaguiトークン（例：`$space`、`$color`）を使用
3. コンポーネントは変更なしで両プラットフォームで自動的に動作
4. デフォルトの設定トークンを使用するか、カスタムデザインシステム用に設定を拡張

## 📚 リソース

- [Tamaguiドキュメント](https://tamagui.dev)
- [設定ガイド](https://tamagui.dev/docs/core/configuration)
- [コンポーネントライブラリ](https://tamagui.dev/ui/intro)