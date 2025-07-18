# コマンドリファレンス

このドキュメントでは、プロジェクトで使用する全てのコマンドの詳細を説明します。

## 基本コマンド

| コマンド | 説明 | 使用場面 |
|---------|------|---------|
| `pnpm dev` | すべてのアプリを開発モードで起動 | 通常の開発時 |
| `pnpm dev:web` | Webアプリのみ起動 | Web開発に集中したい時 |
| `pnpm dev:native` | Nativeアプリのみ起動 | Native開発に集中したい時 |
| `pnpm dev:api` | APIアプリのみ起動 | API開発に集中したい時 |
| `pnpm build` | すべてのアプリをビルド | 本番デプロイ前 |
| `pnpm fix` | コードの自動修正とフォーマット | コミット前（必須） |
| `pnpm check` | lint + format + 型チェック | PR作成前（必須） |
| `pnpm check-types` | TypeScript型チェックのみ | 型エラーの確認時 |

## Turboフィルターコマンド

```bash
# 特定のアプリのみ実行
turbo dev --filter=@repo/web
turbo build --filter=@repo/native
turbo dev --filter=@repo/api

# 複数のアプリを指定
turbo dev --filter=@repo/web --filter=@repo/api
```

## アプリ個別のコマンド

### Native（Expo）

```bash
# 開発サーバー起動
expo start

# プラットフォーム別起動
expo start --ios      # iOS開発
expo start --android  # Android開発
expo start --web      # Web開発

# ビルド
expo build:ios
expo build:android

# 環境確認
expo doctor
```

### API（Hono + Cloudflare Workers）

```bash
# 開発サーバー起動
cd apps/api && wrangler dev

# ビルド
cd apps/api && wrangler build

# デプロイ
cd apps/api && wrangler deploy

# 環境変数設定
cp apps/api/.dev.vars.example apps/api/.dev.vars
```

### Web（Next.js）

```bash
# 開発サーバー起動
cd apps/web && pnpm dev

# ビルド
cd apps/web && pnpm build

# 本番サーバー起動
cd apps/web && pnpm start
```

## 依存関係管理

```bash
# ワークスペースのルートにパッケージ追加
pnpm add -w <package>

# 特定のアプリ/パッケージにパッケージ追加
pnpm add <package> --filter=@repo/web
pnpm add <package> --filter=@repo/native
pnpm add <package> --filter=@repo/api
pnpm add <package> --filter=@repo/ui

# 開発依存関係として追加
pnpm add -D <package> --filter=@repo/web

# すべての依存関係をインストール
pnpm install

# 依存関係のクリーンインストール
pnpm install --force
```

## キャッシュ管理

```bash
# Turboキャッシュをクリア
turbo daemon clean

# pnpmキャッシュをクリア
pnpm store prune

# node_modulesを削除して再インストール
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```

## Git操作

```bash
# ブランチ作成と切り替え
git checkout -b feature/新機能名

# 変更をステージング
git add .

# コミット
git commit -m "feat: 新機能を追加"

# プッシュ
git push -u origin feature/新機能名

# PR作成（GitHub CLI）
gh pr create --title "新機能追加" --body "変更内容の説明"
```

## デバッグとトラブルシューティング

```bash
# 型チェックのみ実行
pnpm check-types

# 詳細なlint結果表示
biome check --verbose

# 特定のファイルのみlint
biome check src/components/Button.tsx

# Turboの詳細ログ表示
turbo dev --verbosity=2
```