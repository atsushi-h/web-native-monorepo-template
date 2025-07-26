# Cloudflare D1 セットアップガイド

このガイドでは、SupabaseからCloudflare D1への移行手順と、効率的な開発ワークフローを説明します。

## 前提条件

1. Cloudflareアカウントの作成
2. Cloudflare APIトークンの取得
3. アカウントIDの確認

## セットアップ手順

### 1. 環境変数の設定

`.env`ファイルを作成し、以下の環境変数を設定してください：

```bash
# Cloudflare設定
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token
```

### 2. D1データベースの作成

```bash
# 開発環境用データベース
npx wrangler d1 create web-native-db-dev

# 本番環境用データベース
npx wrangler d1 create web-native-db-prd
```

### 3. データベースIDの設定

作成されたデータベースのIDを`.env`に追加：

```bash
D1_DATABASE_ID_DEV=your-dev-db-id
D1_DATABASE_ID_PRD=your-prd-db-id
```

### 4. wrangler.tomlの更新

`wrangler.toml`のD1設定を更新：

```toml
[[d1_databases]]
binding = "DB"
database_name = "web-native-db-dev"
database_id = "your-dev-db-id"
preview_database_id = "your-dev-db-id"
migrations_dir = "drizzle/migrations"
```

### 5. マイグレーションの生成と適用

```bash
# マイグレーション生成
pnpm db:generate

# ローカル環境に適用
npx wrangler d1 migrations apply web-native-db-dev --local

# リモート環境に適用
npx wrangler d1 migrations apply web-native-db-dev --remote
```

## 開発ワークフロー

### ローカルDB vs リモートDBの使い分け

#### 🏠 ローカルDB（推奨：日常開発）
```bash
pnpm dev:local
# または
pnpm dev --local
```

**メリット：**
- ⚡ 高速（ネットワーク不要）
- 🚀 無制限リクエスト
- 🧪 データを自由に実験可能
- ✈️ オフライン開発可能

**用途：**
- 日常的な機能開発
- 単体・統合テスト
- スキーマ変更の実験
- デバッグ作業

#### ☁️ リモートDB（本番環境に近い検証）
```bash
pnpm dev:remote
# または
pnpm dev
```

**メリット：**
- 🌍 本番環境と同じCloudflareエッジ
- 👥 チーム間でのデータ共有
- 📊 実際のレスポンス時間を測定
- 🔒 本番環境と同じセキュリティ

**用途：**
- 統合テスト・デモ準備
- パフォーマンス検証
- チーム間での機能確認
- 本番デプロイ前の最終確認

## データベース操作コマンド

### データの確認
```bash
# ローカルDBの内容を確認
npx wrangler d1 execute web-native-db-dev --local --command "SELECT * FROM todos"

# リモートDBの内容を確認
npx wrangler d1 execute web-native-db-dev --command "SELECT * FROM todos"
```

### データのリセット
```bash
# ローカルDBをリセット（ファイル削除）
rm -rf .wrangler/state/d1

# リモートDBをリセット（データ削除）
npx wrangler d1 execute web-native-db-dev --command "DELETE FROM todos"
```

### マイグレーション管理
```bash
# 新しいマイグレーション生成
pnpm db:generate

# ローカルに適用
npx wrangler d1 migrations apply web-native-db-dev --local

# リモートに適用
npx wrangler d1 migrations apply web-native-db-dev --remote

# マイグレーション状況確認
npx wrangler d1 migrations list web-native-db-dev
```

## API テスト例

### ローカルDBでのテスト
```bash
# サーバー起動
pnpm dev:local

# データ作成
curl -X POST http://localhost:8787/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "ローカルテスト", "completed": false}'

# データ確認
curl http://localhost:8787/api/todos
```

### リモートDBでのテスト
```bash
# サーバー起動
pnpm dev:remote

# データ作成
curl -X POST http://localhost:8787/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "リモートテスト", "completed": false}'

# Cloudflare D1コンソールでも確認可能
```

## トラブルシューティング

### APIトークンが無い場合

1. [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens)にアクセス
2. "Create Token" をクリック
3. "Custom token" を選択
4. 以下の権限を付与：
   - Account: Cloudflare D1:Edit
   - Account: Account Settings:Read

### データベースIDが分からない場合

```bash
npx wrangler d1 list
```

### ローカルとリモートでデータが異なる

これは正常です。ローカルDBとリモートDBは独立しています：
- ローカル：`.wrangler/state/d1/` 内のSQLiteファイル
- リモート：Cloudflare D1サービス上のデータベース

### マイグレーションエラー

```bash
# 環境変数が正しく設定されているか確認
pnpm db:generate

# エラーメッセージ: "Missing required environment variables"
# → .envファイルの設定を確認
```

## 注意事項

- **開発効率重視**：日常開発では `pnpm dev:local` を使用
- **本番確認**：デプロイ前は `pnpm dev:remote` で最終確認
- **データ同期**：ローカルとリモートのデータは自動同期されません
- **SQLite制限**：同時接続数やデータ型の制限に注意
- **バックアップ**：重要なデータは定期的にエクスポート