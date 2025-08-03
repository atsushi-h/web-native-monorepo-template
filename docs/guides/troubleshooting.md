# トラブルシューティング

このドキュメントでは、よくある問題と解決方法を説明します。

## よくある問題と解決方法

### 型エラー

| 問題 | 解決方法 |
|------|----------|
| TypeScript型エラー | `pnpm check-types`で詳細確認 |
| 型定義が見つからない | `pnpm add -D @types/<package-name>` |
| 型の競合 | `tsconfig.json`のpathsを確認 |

### 依存関係の問題

| 問題 | 解決方法 |
|------|----------|
| 依存関係の競合 | `pnpm install --force` |
| パッケージが見つからない | `pnpm add <package> --filter=<app>` |
| バージョンの不整合 | `package.json`でバージョンを固定 |

### キャッシュの問題

| 問題 | 解決方法 |
|------|----------|
| ビルドキャッシュの問題 | `turbo daemon clean` |
| pnpmキャッシュの問題 | `pnpm store prune` |
| node_modulesの問題 | `rm -rf node_modules && pnpm install` |

### Expo（Native）の問題

| 問題 | 解決方法 |
|------|----------|
| Expo環境の問題 | `expo doctor`で環境チェック |
| iOS Simulatorが起動しない | Xcode設定を確認 |
| Android Emulatorが起動しない | Android Studioの設定を確認 |
| Metro bundlerエラー | `expo start --clear` |

### API（Cloudflare Workers）の問題

| 問題 | 解決方法 |
|------|----------|
| Wrangler開発サーバーエラー | `cd apps/api && wrangler dev --env development --local`で詳細確認 |
| 環境変数が読み込まれない | `.dev.vars`ファイルの存在と内容を確認 |
| D1データベースエラー | `pnpm dev:api`で環境設定付き起動を確認 |
| "D1 Database binding is not set"エラー | `--env development`フラグの指定漏れを確認 |
| CORSエラー | `wrangler.toml`のCORS設定を確認 |
| デプロイエラー | Cloudflareアカウント設定を確認 |
| Drizzle Kitエラー | `.dev.vars`にCloudflare認証情報があるか確認 |

### Web（React Router v7）の問題

| 問題 | 解決方法 |
|------|----------|
| React Router v7ビルドエラー | `cd apps/web && pnpm build`で詳細確認 |
| SSRエラー | `react-router.config.ts`でSSRを無効化 |
| ハイドレーションエラー | `ssr: false`の設定を確認 |

### Tamagui（UI）の問題

| 問題 | 解決方法 |
|------|----------|
| スタイルが適用されない | Tamaguiプロバイダーの設定を確認 |
| Web/Nativeでレンダリングが異なる | `@tamagui/core`の設定を確認 |
| アニメーションが動かない | `@tamagui/animations-react-native`の設定を確認 |

## デバッグ手順

### 1. 基本的なデバッグ

```bash
# まずは型チェック
pnpm check-types

# 次にlintチェック
pnpm fix

# キャッシュクリア
turbo daemon clean

# 依存関係の再インストール
pnpm install --force
```

### 2. アプリ別のデバッグ

#### Web（React Router v7）
```bash
cd apps/web
pnpm dev --verbose
```

#### Native（Expo）
```bash
cd apps/native
expo start --clear
expo doctor
```

#### API（Hono）
```bash
cd apps/api
# 環境設定付きで起動（推奨）
pnpm dev

# または直接Wranglerで
wrangler dev --env development --local
```

### 3. 詳細なログの確認

```bash
# Turboの詳細ログ
turbo dev --verbosity=2

# Biomeの詳細ログ
biome check --verbose

# pnpmの詳細ログ
pnpm --reporter=append-only dev
```

## エラーメッセージ別対処法

### "Module not found"
1. `pnpm install`を実行
2. `package.json`でパッケージ名を確認
3. `tsconfig.json`のpathsを確認

### "Type error"
1. `pnpm check-types`で詳細確認
2. 型定義ファイルの存在を確認
3. `@types/`パッケージの追加を検討

### "Build failed"
1. `pnpm fix`でコードを修正
2. 依存関係を最新に更新
3. キャッシュをクリア

### "Port already in use"
1. 使用中のポートを確認: `lsof -i :3000`
2. プロセスを終了: `kill -9 <PID>`
3. 別のポートを使用: `PORT=3001 pnpm dev`

## 環境変数の問題

### APIアプリの環境変数

#### 問題: 環境変数が読み込まれない
```bash
# 以下を確認
1. .dev.varsファイルが存在するか
ls apps/api/.dev.vars

2. .dev.varsに必要な変数があるか
cat apps/api/.dev.vars

3. 正しいコマンドで起動しているか
pnpm dev:api  # または pnpm --filter api dev
```

#### 問題: Drizzle Kitが動作しない
```bash
# .dev.varsに以下が設定されているか確認
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_API_TOKEN=your-api-token
D1_DATABASE_ID_DEV=your-database-id
```

#### 問題: D1データベースにアクセスできない
```bash
# 開発時は必ず環境を指定
pnpm dev:api  # --env developmentが自動付与される

# 手動実行時も環境指定が必要
wrangler dev --env development --local
```

### 環境変数ファイルの移行
旧`.env`ファイルから`.dev.vars`への移行：
```bash
# 1. .envの内容を.dev.varsにコピー
cat apps/api/.env >> apps/api/.dev.vars

# 2. .envファイルを削除
rm apps/api/.env

# 3. drizzle.config.tsが.dev.varsを参照することを確認
```

## 問題が解決しない場合

1. **GitHub Issues**を確認
2. **ドキュメント**を再読
3. **依存関係**を最新バージョンに更新
4. **新しいブランチ**で問題を再現
5. **Claude Code**に相談