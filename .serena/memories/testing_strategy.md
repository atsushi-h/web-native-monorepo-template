# テスト戦略

## Web App（React Router v7）
- **フレームワーク**: Vitest + React Testing Library
- **実行コマンド**:
  ```bash
  pnpm --filter web test        # 単発実行
  pnpm --filter web test:watch  # ウォッチモード
  ```
- **テストファイル**: `src/__tests__/`または同じディレクトリ

## Native App（Expo）
- **フレームワーク**: Jest + React Native Testing Library
- **実行コマンド**: `pnpm --filter native test`

## API（Hono）
- **フレームワーク**: Vitest
- **統合テスト**: Hono Testing Helper使用
- **実行コマンド**: `pnpm --filter api test`

## 共通方針
1. **ユニットテスト**: 全ての重要なロジックをカバー
2. **統合テスト**: APIエンドポイントとデータベース操作
3. **E2Eテスト**: Playwright MCPを使用
4. **カバレッジ目標**: 80%以上（重要機能は100%）

## Tamaguiコンポーネントのテスト
- TamaguiProviderでラップして実行
- プラットフォーム固有の動作は個別にテスト