# MCP (Model Context Protocol)

Claude CodeでのMCP利用ガイド

## 設定済みMCPサーバー

### Playwright MCP
ブラウザ自動化が可能です。

```bash
# 初回使用時は承認が必要
/mcp

# 使用例: "Use playwright mcp to open https://example.com"
```

### Context 7 MCP
最新のライブラリドキュメントを参照できます。

```bash
# React、Next.js、Expoなどの最新ドキュメントを取得
# 例: "Get React hooks documentation using context 7"
```

## Context 7の推奨使用方法

- **コンポーネント作成前**: 最新のAPI仕様を確認
- **React/Next.js/Expo**: ベストプラクティスを参照
- **新しいライブラリ**: 使用方法を調査
- **型定義**: 最新の機能変更を確認

## 開発ワークフローでの活用

### 1. 設計段階
Context 7で最新のAPI仕様やベストプラクティスを確認

### 2. 実装前
使用予定のライブラリのドキュメントをContext 7で取得

### 3. 実装中
不明な点があればContext 7で最新情報を参照

### 4. レビュー前
最新の推奨パターンと照合

## 設定ファイル

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