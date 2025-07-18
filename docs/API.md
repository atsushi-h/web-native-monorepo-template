# API設定ガイド

このドキュメントでは、Hono APIアプリの環境変数管理とAPI設定について説明します。

## 環境変数管理

### 基本方針
- **非秘密情報**: `wrangler.toml`に記載（Gitコミット対象）
- **秘密情報**: `.dev.vars`で管理（Gitignore対象）

### ローカル開発での設定

```bash
# 1. 設定ファイルをコピー
cp apps/api/.dev.vars.example apps/api/.dev.vars

# 2. 実際の値を設定
# apps/api/.dev.vars を編集
```

### 環境変数の種類

| 変数名 | 設定場所 | 用途 |
|--------|----------|------|
| `CORS_ORIGINS` | `wrangler.toml` | CORS許可オリジン |
| `API_SECRET_KEY` | `.dev.vars` | API認証キー |
| `DATABASE_URL` | `.dev.vars` | データベース接続文字列 |

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