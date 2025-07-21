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
| Wrangler開発サーバーエラー | `cd apps/api && wrangler dev`で詳細確認 |
| 環境変数が読み込まれない | `.dev.vars`ファイルの存在を確認 |
| CORSエラー | `wrangler.toml`のCORS設定を確認 |
| デプロイエラー | Cloudflareアカウント設定を確認 |

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
wrangler dev --local
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

## 問題が解決しない場合

1. **GitHub Issues**を確認
2. **ドキュメント**を再読
3. **依存関係**を最新バージョンに更新
4. **新しいブランチ**で問題を再現
5. **Claude Code**に相談