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
# エディタで実際の値に更新

# 開発サーバー起動（ローカルDB）
pnpm dev:local
```

## 📋 主なコマンド

| コマンド | 説明 |
|----------|------|
| `pnpm dev:local` | ローカルDB使用 |
| `pnpm dev:remote` | リモートDB使用 |
| `pnpm test` | テスト実行 |
| `pnpm build` | ビルド |

## 📚 詳細ドキュメント

- **[API設定ガイド](../../docs/API.md)** - 環境設定・開発ワークフロー
- **[D1データベース設定](../../docs/D1_SETUP.md)** - Cloudflare D1セットアップ
- **[開発ガイド](../../docs/DEVELOPMENT.md)** - アーキテクチャ詳細
- **[トラブルシューティング](../../docs/TROUBLESHOOTING.md)** - 問題解決

## 🔗 APIエンドポイント

| エンドポイント | 説明 |
|----------------|------|
| `GET /api/todos` | Todo一覧 |
| `POST /api/todos` | Todo作成 |
| `GET /api/health` | ヘルスチェック |

詳細は [API設定ガイド](../../docs/API.md) を参照