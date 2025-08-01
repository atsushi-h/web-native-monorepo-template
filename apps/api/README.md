# API App

Hono + Cloudflare D1 APIアプリケーション

## 🚀 開発開始

```bash
# 依存関係インストール
pnpm install

# 初回セットアップ：wrangler.toml設定
cp wrangler.toml.example wrangler.toml
# エディタでdatabase_idを実際の値に更新

# 初回セットアップ：環境変数設定
cp .dev.vars.example .dev.vars
# エディタで以下の値を更新：
# - CLOUDFLARE_ACCOUNT_ID: CloudflareアカウントID
# - CLOUDFLARE_API_TOKEN: Cloudflare APIトークン（Drizzle Kit用）
# - D1_DATABASE_ID_DEV/PRD: D1データベースID

# 開発サーバー起動（ローカルDB）
pnpm dev
```

## 📋 主なコマンド

| コマンド | 説明 |
|----------|------|
| `pnpm dev` | ローカルDB使用（デフォルト） |
| `pnpm dev:remote` | リモートDB使用 |
| `pnpm test` | テスト実行 |
| `pnpm build` | ビルド |
| `pnpm openapi:generate` | OpenAPI仕様書生成 |

## 📚 詳細ドキュメント

- **[API設定ガイド](../../docs/API.md)** - 環境設定・開発ワークフロー
- **[D1データベース設定](../../docs/D1_SETUP.md)** - Cloudflare D1セットアップ
- **[開発ガイド](../../docs/DEVELOPMENT.md)** - アーキテクチャ詳細
- **[トラブルシューティング](../../docs/TROUBLESHOOTING.md)** - 問題解決

## 🔗 APIエンドポイント

| エンドポイント | 説明 |
|----------------|------|
| `GET /api/todos` | Todo一覧 |
| `GET /api/todos/:id` | Todo詳細 |
| `POST /api/todos` | Todo作成 |
| `PUT /api/todos/:id` | Todo更新 |
| `DELETE /api/todos/:id` | Todo削除 |

詳細は [API設定ガイド](../../docs/API.md) を参照

## 📖 API仕様書

OpenAPI 3.1.0準拠の仕様書を自動生成できます：

```bash
# OpenAPI仕様書を生成
pnpm openapi:generate
```

生成されたファイル：
- `openapi/generated/openapi.yaml` - YAML形式
- `openapi/generated/openapi.json` - JSON形式

**注意**: 生成されたファイルは`.gitignore`に含まれており、必要に応じてローカルで生成してください。仕様書のバージョンは`package.json`のバージョンと自動同期されます。