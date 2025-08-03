# MCP (Model Context Protocol)

Claude CodeでのMCP利用ガイド

## 🔧 設定済みMCPサーバー

### Playwright MCP - ブラウザ自動化
ブラウザの自動操作、スクリーンショット撮影、E2Eテストの実行が可能です。

```bash
# 初回使用時は承認が必要
/mcp

# 使用例
"Use playwright mcp to open https://example.com and take a screenshot"
"Use playwright to test the login flow on localhost:3000"
"Navigate to the dashboard and check if the user data loads correctly"
```

**主な機能:**
- Webページの自動操作（クリック、入力、ナビゲーション）
- スクリーンショット撮影
- DOM要素の検査
- ネットワークリクエストの監視
- コンソールログの取得

### Context 7 MCP - 最新ドキュメント参照
最新のライブラリドキュメントとベストプラクティスを即座に取得できます。

```bash
# 使用例
"Get React hooks documentation using context 7"
"Find the latest Expo SDK 53 navigation patterns"
"Show me Tamagui component examples from context 7"
"Get Cloudflare Workers D1 database setup guide"
```

**対応ライブラリ:**
- React、React Router、Next.js
- Expo、React Native
- Tamagui、NativeWind
- Cloudflare Workers、Hono
- TypeScript、Vite、その他多数

## 🚀 実践的な使用例

### 1. 新機能の実装前
```bash
# 最新のReact Routerのデータ取得パターンを確認
"Get React Router v7 data loading patterns from context 7"

# Tamaguiの最新コンポーネントAPIを確認
"Show me Tamagui Button component API using context 7"
```

### 2. デバッグ時
```bash
# ブラウザで実際の動作を確認
"Use playwright to open localhost:3000 and check if the button is clickable"

# エラーの原因を最新ドキュメントで調査
"Get Expo error handling best practices from context 7"
```

### 3. パフォーマンス最適化
```bash
# React Router v7の最新の最適化手法を確認
"Find React Router v7 performance optimization techniques"

# 実際のページロード時間を測定
"Use playwright to measure page load time on localhost:3000"
```

## 📋 開発ワークフローでの活用

### 設計段階
1. Context 7で最新のアーキテクチャパターンを確認
2. 類似プロジェクトの実装例を調査
3. ベストプラクティスに基づいた設計

### 実装段階
1. 不明なAPIはContext 7で即座に確認
2. 実装したUIをPlaywrightで動作確認
3. エラーが出たら最新のトラブルシューティング情報を取得

### テスト段階
1. PlaywrightでE2Eテストシナリオを実行
2. 異なるビューポートでのレスポンシブ確認
3. パフォーマンス測定とボトルネックの特定

### レビュー段階
1. 最新の推奨パターンと照合
2. セキュリティベストプラクティスの確認
3. アクセシビリティ要件の検証

## ⚙️ 設定ファイル

MCPサーバーは `.mcp.json` で管理されています：

```json
{
  "mcpServers": {
    "playwright": {
      "command": "pnpm",
      "args": ["dlx", "@playwright/mcp@latest", "--config", "./playwright-mcp-config.json"]
    },
    "context7": {
      "type": "stdio",
      "command": "pnpm", 
      "args": ["dlx", "@upstash/context7-mcp@latest"]
    }
  }
}
```

## 💡 活用のヒント

1. **Context 7は常に最新**: npmのバージョンに関係なく、常に最新のドキュメントを提供
2. **Playwrightで視覚的確認**: UIの変更は実際にブラウザで確認
3. **組み合わせて使用**: Context 7で調べた実装をPlaywrightで検証
4. **エラー解決に活用**: エラーメッセージをContext 7で検索して解決策を見つける

## 🔗 関連リソース

- [MCP公式ドキュメント](https://github.com/anthropics/mcp)
- [Playwright MCP](https://github.com/anthropics/playwright-mcp)
- [Context 7 MCP](https://github.com/upstash/context7-mcp)