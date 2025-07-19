# React Native Testing with Vitest

このディレクトリには、React NativeアプリのVitestベースのテストが含まれています。

## 現在のステータス

✅ **動作中**: シンプルな数学テスト  
🔧 **開発中**: React Nativeコンポーネントテスト  

## テスト環境の構成

### 成功した設定
- Vitest 3.2.4 での基本テスト実行
- 適切なモノレポ統合（`pnpm test`で実行可能）
- TypeScript サポート

### 現在の制限
- React Native Testing Library との完全な互換性はまだ開発中
- Tamagui コンポーネントテストは設定調整が必要
- Expo 特有のモジュールとの統合は継続的な改善が必要

## 利用可能なテストファイル

### 実行中のテスト
- `simple.test.tsx` - 基本的な数学テスト（動作確認用）

### 開発中のテスト（一時的に無効化）
- `basic-components.test.disabled` - React Native基本コンポーネント
- `hello-wave.test.disabled` - HelloWaveコンポーネント
- `themed-text.test.disabled` - ThemedTextコンポーネント
- `tamagui-integration.test.disabled` - Tamagui統合テスト

## 実装されたテスト機能

### テスト設定
- ✅ `test-setup.ts` - 包括的なモック設定
- ✅ `vitest.config.ts` - React Native Web対応設定
- ✅ JSDOM環境での実行
- ✅ TypeScript + JSX サポート

### モック対象
- ✅ Expo モジュール (Constants, Font, Haptics, StatusBar)
- ✅ React Navigation
- ✅ React Native Reanimated
- ✅ React Native Gesture Handler
- ✅ Tamagui コア機能
- ✅ アプリ固有フック (useThemeColor, useColorScheme)

### テストパターン
- ✅ コンポーネントレンダリング
- ✅ ユーザーインタラクション (Pressable, TextInput)
- ✅ プロップス検証
- ✅ 状態管理
- ✅ イベントハンドリング

## 今後の改善予定

1. **React Native Testing Library 互換性向上**
   - 依存関係の調整
   - TypeScript型定義の解決

2. **Tamagui テストサポート**
   - カスタムレンダー関数
   - テーマプロバイダー統合

3. **E2E テスト統合**
   - Detox または Playwright の検討

## 使用方法

```bash
# 現在動作するテスト実行
pnpm --filter=@repo/native test

# 開発中テストの有効化（要調整）
mv test/hello-wave.test.disabled test/hello-wave.test.tsx
pnpm --filter=@repo/native test
```

## トラブルシューティング

### よくある問題
1. **SyntaxError: Unexpected token 'typeof'**
   - React Native Testing Library との依存関係問題
   - 解決策: モック設定の改善が必要

2. **コンポーネントインポートエラー**
   - パスエイリアス設定確認
   - ファイル拡張子の明示

### 推奨される代替案
現在のVitest環境での制限がある場合は、以下を検討してください：

1. **Jest への移行** - React Native Testing Library の公式サポート
2. **Web専用テスト** - react-native-web コンポーネントのみテスト
3. **単体テストの分離** - ビジネスロジックとUI を分けてテスト

---

*最新の情報については、Context7 や React Native Testing Library の公式ドキュメントを参照してください。*