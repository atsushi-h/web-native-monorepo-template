# API設定ガイド

このドキュメントでは、Hono + Cloudflare D1 APIアプリの設定と開発ワークフローについて説明します。

## 📋 概要

- **フレームワーク**: Hono
- **データベース**: Cloudflare D1 (SQLite)
- **ORM**: Drizzle ORM
- **ランタイム**: Cloudflare Workers
- **認証**: APIキー認証

## 🚀 クイックスタート

### 1. 依存関係インストール
```bash
pnpm install
```

### 2. 環境設定
```bash
# 環境変数ファイルを作成
cp apps/api/.env.example apps/api/.env
cp apps/api/.dev.vars.example apps/api/.dev.vars

# Cloudflare D1セットアップ（詳細はD1_SETUP.mdを参照）
# 必要な環境変数を設定
```

### 3. 開発サーバー起動
```bash
# ローカルDB使用（推奨）
pnpm --filter api dev:local

# リモートDB使用（検証用）
pnpm --filter api dev:remote
```

## 🔧 環境変数管理

### 基本方針
- **非秘密情報**: `wrangler.toml`に記載（Gitコミット対象）
- **秘密情報**: `.dev.vars`で管理（Gitignore対象）
- **D1データベース**: バインディング設定

### 環境変数一覧

| 変数名 | 設定場所 | 用途 |
|--------|----------|------|
| `CORS_ORIGINS` | `wrangler.toml` | CORS許可オリジン |
| `API_SECRET_KEY` | `.dev.vars` | API認証キー |
| `CLOUDFLARE_ACCOUNT_ID` | `.env` | CloudflareアカウントID |
| `CLOUDFLARE_API_TOKEN` | `.env` | Cloudflare APIトークン |
| `D1_DATABASE_ID_DEV` | `.env` | 開発用D1データベースID |
| `D1_DATABASE_ID_PRD` | `.env` | 本番用D1データベースID |

### D1データベース設定

データベース接続は環境変数ではなく、Cloudflare Workersのバインディング機能を使用：

```toml
# wrangler.toml
[[d1_databases]]
binding = "DB"
database_name = "web-native-db-dev"
database_id = "your-database-id"
migrations_dir = "drizzle/migrations"
```

## 本番環境での設定

```bash
# Cloudflare Dashboard または wrangler secret コマンドを使用
wrangler secret put API_SECRET_KEY
wrangler secret put DATABASE_URL
```

## API開発コマンド

```bash
# API開発サーバー起動
cd apps/api && wrangler dev

# APIビルド
cd apps/api && wrangler build

# API環境変数の設定
cp apps/api/.dev.vars.example apps/api/.dev.vars
```

## Cloudflare Workers 固有の設定

### wrangler.toml
- アプリケーション設定
- 非秘密の環境変数
- ルーティング設定

### .dev.vars
- 開発用の秘密情報
- `.gitignore`で除外される
- 本番では Cloudflare Dashboard で設定