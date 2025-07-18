# API App

Hono + Cloudflare Workers APIアプリケーション

## 開発環境セットアップ

### 1. 依存関係のインストール
```bash
pnpm install
```

### 2. 環境変数の設定
```bash
# 秘密情報用の設定ファイルを作成
cp .dev.vars.example .dev.vars

# .dev.vars を編集して実際の値を設定
```

### 3. 開発サーバー起動
```bash
pnpm dev
```

## APIエンドポイント

| エンドポイント | 説明 |
|----------------|------|
| `GET /` | Hello World + 設定確認 |
| `GET /api/health` | ヘルスチェック |
| `GET /api/env` | 環境変数確認（開発用） |
| `GET /api/protected` | 認証が必要なエンドポイント |
| `GET/POST /api/test` | テスト用エンドポイント |

## 認証テスト

```bash
# API_SECRET_KEYを使った認証テスト
curl -H "X-API-Key: dev-secret-key-12345" http://localhost:8787/api/protected
```

## ファイル説明

- `wrangler.toml` - 基本設定（コミット対象）
- `.dev.vars` - ローカル開発用秘密情報（Gitignore、各自作成）
- `.dev.vars.example` - 設定例（コミット対象）