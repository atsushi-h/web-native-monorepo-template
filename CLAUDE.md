# CLAUDE.md

このファイルは、Claude Code (claude.ai/code)がこのリポジトリを効率的に扱うためのガイドです。

## プロジェクト概要

**React Router v7 + Expo + Hono モノレポテンプレート**
- Turborepo + pnpmによるモノレポ管理
- TypeScript + Biome（コード品質）+ Tamagui（クロスプラットフォームUI）
- Web（React Router v7 SPA）、Native（Expo）、API（Hono）の同時開発

### 構成
- `apps/web` - React Router v7 Webアプリ（SPA、ポート3000）
- `apps/native` - Expo React Nativeアプリ  
- `apps/api` - Hono APIアプリ（Cloudflare Workers、ポート8787）
- `packages/ui` - Tamagui共有UIコンポーネント
- `packages/typescript-config` - 共有TypeScript設定

## 基本コマンド

```bash
# 開発サーバー起動
pnpm dev          # すべてのアプリ
pnpm dev:web      # Webのみ
pnpm dev:native   # Nativeのみ  
pnpm dev:api      # APIのみ

# コード品質（コミット前必須）
pnpm fix          # 自動修正
pnpm check        # 包括的チェック
```


## Claude Code設定

### 自動品質チェック（Hooks）
コード変更時に自動実行：
1. `pnpm fix` - コード自動修正
2. `pnpm check-types` - 型チェック

### 権限設定
- ✅ 許可: Git操作、pnpm/npmコマンド、ファイル読み書き
- ❌ 禁止: sudo、rm -rf、機密ファイルへのアクセス

### MCP (Model Context Protocol)
Playwright（ブラウザ自動化）とContext 7（最新ドキュメント参照）が利用可能

## 開発ルール

### コード配置
- 共有UI → `packages/ui/src/` (Tamaguiコンポーネント)
- アプリ固有 → 各アプリの`src/`
- 型定義 → 適切なパッケージの`types/`

### 依存関係管理
- 最新バージョンを調べてからバージョン固定でインストール
- エラー回避のためのバージョンダウンや削除は禁止
- ファイル削除時はユーザーに確認必須

### コミット前チェックリスト
- [ ] `pnpm fix` 実行
- [ ] `pnpm check-types` でエラーなし
- [ ] 不要なconsole.log削除


## 詳細ドキュメント

- 📘 [開発ガイド](./docs/DEVELOPMENT.md) - アーキテクチャとパッケージの詳細
- 📗 [Git/GitHubワークフロー](./docs/GIT_WORKFLOW.md) - ブランチルールとPR作成手順
- 🔧 [MCP設定ガイド](./docs/MCP.md) - MCPサーバーとContext 7の使用方法
- 📙 [コマンドリファレンス](./docs/COMMANDS.md) - 詳細なコマンド一覧
- 🔍 [トラブルシューティング](./docs/TROUBLESHOOTING.md) - よくある問題と解決方法
- 🔑 [API設定ガイド](./docs/API.md) - 環境変数とAPI設定

---

⚡ **重要**: コミット前は必ず`pnpm fix`と`pnpm check`を実行してください。