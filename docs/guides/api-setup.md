# API設定ガイド

このドキュメントでは、Hono + Cloudflare D1 APIアプリの設定と開発ワークフローについて説明します。

## 📋 概要

- **フレームワーク**: Hono
- **データベース**: Cloudflare D1 (SQLite)
- **ORM**: Drizzle ORM
- **ランタイム**: Cloudflare Workers
- **API**: Todo管理のRESTful API

## 🚀 クイックスタート

### 1. 依存関係インストール
```bash
pnpm install
```

### 2. 環境設定
```bash
# 環境変数ファイルを作成
cp apps/api/.dev.vars.example apps/api/.dev.vars

# .dev.varsファイルを編集して以下の値を設定：
# - CLOUDFLARE_ACCOUNT_ID: CloudflareアカウントID
# - CLOUDFLARE_API_TOKEN: Cloudflare APIトークン（Drizzle Kit用）
# - D1_DATABASE_ID_DEV/PRD: D1データベースID

# Cloudflare D1セットアップ（詳細はD1_SETUP.mdを参照）
```

### 3. 開発サーバー起動
```bash
# ローカルDB使用（推奨）
pnpm api dev
# または
pnpm --filter api dev:local

# リモートDB使用（検証用）
pnpm --filter api dev:remote
```

## 🔧 環境変数管理

### 基本方針
- **非秘密情報**: `wrangler.toml`に記載（Gitコミット対象）
- **秘密情報**: `.dev.vars`で一元管理（Gitignore対象）
- **D1データベース**: バインディング設定

### 環境変数一覧

| 変数名 | 設定場所 | 用途 |
|--------|----------|------|
| `CORS_ORIGINS` | `wrangler.toml` | CORS許可オリジン |
| `NODE_ENV` | `wrangler.toml` | 実行環境（development/production） |
| `CLOUDFLARE_ACCOUNT_ID` | `.dev.vars` | CloudflareアカウントID（Drizzle Kit用） |
| `CLOUDFLARE_API_TOKEN` | `.dev.vars` | Cloudflare APIトークン（Drizzle Kit用） |
| `D1_DATABASE_ID_DEV` | `.dev.vars` | 開発用D1データベースID |
| `D1_DATABASE_ID_PRD` | `.dev.vars` | 本番用D1データベースID |

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
# 必要に応じてCloudflare Dashboard または wrangler secret コマンドで秘密情報を設定
# 現在のAPIでは認証機能を使用していないため、追加の秘密情報は不要
```

## API開発コマンド

### 基本コマンド（推奨）

```bash
# 開発サーバー起動（ローカルDB使用、推奨）
pnpm api dev
# または
pnpm --filter api dev

# リモートDB使用（Cloudflare環境でテスト）
pnpm --filter api dev:remote

# ビルド
pnpm --filter api build

# デプロイ
pnpm --filter api deploy

# OpenAPI仕様書生成
pnpm --filter api openapi:generate
```

### Wrangler直接使用

```bash
# 開発サーバー起動（development環境）
cd apps/api && wrangler dev --env development --local

# ビルド
cd apps/api && wrangler build

# デプロイ（development環境）
cd apps/api && wrangler deploy --env development

# デプロイ（production環境）
cd apps/api && wrangler deploy --env production
```

## Cloudflare Workers 固有の設定

### wrangler.toml
- アプリケーション設定
- 非秘密の環境変数
- ルーティング設定

### .dev.vars
- 開発用の秘密情報を一元管理
- Cloudflare認証情報（Drizzle Kit用）
- APIシークレット
- D1データベースID
- `.gitignore`で除外される
- 本番では Cloudflare Dashboard で設定

## 📖 OpenAPI仕様書

### 自動生成

APIの型定義からOpenAPI 3.1.0仕様書を自動生成できます：

```bash
# OpenAPI仕様書を生成
pnpm --filter api openapi:generate
```

### 生成されるファイル

```
apps/api/openapi/
├── generate-openapi.ts     # 生成スクリプト
└── generated/             # 生成されたファイル（.gitignore対象）
    ├── openapi.yaml       # YAML形式
    └── openapi.json       # JSON形式
```

**注意**: `generated/`ディレクトリは`.gitignore`に含まれています。各開発者は必要に応じてローカルで生成してください。

### 特徴

- **バージョン自動同期**: `package.json`のバージョンと自動同期
- **型安全**: Zodスキーマから自動生成
- **完全なAPI文書**: 全エンドポイント、スキーマ、認証情報を含む
- **開発者フレンドリー**: 例とバリデーションルールを含む

### 活用方法

- **APIクライアント生成**: OpenAPI CodegenやSwagger Codegenで自動生成
- **ドキュメント**: Swagger UIやRedocでインタラクティブなドキュメント
- **テスト**: APIテストツールでの仕様検証
- **チーム連携**: フロントエンド・バックエンド間のAPI仕様共有