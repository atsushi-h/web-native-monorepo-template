# CLAUDE.md

このファイルは、Claude Code (claude.ai/code)がこのリポジトリを効率的に扱うためのガイドです。

## 目次

- [プロジェクト概要](#プロジェクト概要)
- [クイックスタート](#クイックスタート)
- [コマンドリファレンス](#コマンドリファレンス)
- [Claude Code設定](#claude-code設定)
- [詳細ドキュメント](#詳細ドキュメント)

## プロジェクト概要

**Next.js + Expo モノレポテンプレート**
- Turborepo + pnpmによるモノレポ管理
- TypeScript + Biome（コード品質）
- Web（Next.js）とNative（Expo）の同時開発

### 構成
- `apps/web` - Next.js Webアプリ（ポート3000）
- `apps/native` - Expo React Nativeアプリ
- `packages/ui` - 共有UIコンポーネント
- `packages/typescript-config` - 共有TypeScript設定

## クイックスタート

```bash
# 依存関係のインストール
pnpm install

# 開発サーバー起動
pnpm dev          # すべてのアプリ
pnpm dev:web      # Webのみ
pnpm dev:native   # Nativeのみ

# コード品質チェック
pnpm fix          # 自動修正
pnpm check        # 包括的チェック
```

## コマンドリファレンス

| コマンド | 説明 | 使用場面 |
|---------|------|---------|
| `pnpm dev` | すべてのアプリを開発モードで起動 | 通常の開発時 |
| `pnpm dev:web` | Webアプリのみ起動 | Web開発に集中したい時 |
| `pnpm dev:native` | Nativeアプリのみ起動 | Native開発に集中したい時 |
| `pnpm build` | すべてのアプリをビルド | 本番デプロイ前 |
| `pnpm fix` | コードの自動修正とフォーマット | コミット前（必須） |
| `pnpm check` | lint + format + 型チェック | PR作成前（必須） |
| `pnpm check-types` | TypeScript型チェックのみ | 型エラーの確認時 |

### アプリ個別のコマンド

```bash
# Turboフィルターを使用
turbo dev --filter=@repo/web
turbo build --filter=@repo/native

# Native特有のコマンド
expo start --ios      # iOS開発
expo start --android  # Android開発
```

## Claude Code設定

### 自動品質チェック（Hooks）

コード変更時に自動実行される処理：
1. `pnpm fix` - コード自動修正
2. `pnpm check-types` - 型チェック

### MCP (Model Context Protocol)

Playwright（ブラウザ自動化）とContext 7（最新ドキュメント参照）が利用可能です。

詳細は [MCP設定ガイド](./docs/MCP.md) を参照してください。

### 権限設定

- ✅ 許可: Git操作、pnpm/npmコマンド、ファイル読み書き
- ❌ 禁止: sudo、rm -rf、機密ファイルへのアクセス

## 開発のベストプラクティス

### 1. 新機能の追加
- 共有コンポーネント → `packages/ui/src/`
- アプリ固有コード → 各アプリの`src/`
- 型定義 → 適切なパッケージの`types/`

### 2. コミット前のチェックリスト
- [ ] `pnpm fix`を実行
- [ ] `pnpm check-types`でエラーがない
- [ ] 不要なconsole.logを削除
- [ ] コミットメッセージが規約に従っている

### 3. 依存関係の追加
```bash
# ワークスペースのルート
pnpm add -w <package>

# 特定のアプリ/パッケージ
pnpm add <package> --filter=@repo/web
```

## トラブルシューティング

### よくある問題と解決方法

| 問題 | 解決方法 |
|------|----------|
| 型エラー | `pnpm check-types`で詳細確認 |
| 依存関係の競合 | `pnpm install --force` |
| キャッシュの問題 | `turbo daemon clean` |
| Expoの問題 | `expo doctor`で環境チェック |

## 詳細ドキュメント

- 📘 [開発ガイド](./docs/DEVELOPMENT.md) - アーキテクチャとパッケージの詳細
- 📗 [Git/GitHubワークフロー](./docs/GIT_WORKFLOW.md) - ブランチルールとPR作成手順
- 📙 [Claude設定詳細](./.claude/README.md) - Hooks設定とカスタマイズ
- 🔧 [MCP設定ガイド](./docs/MCP.md) - MCPサーバーとContext 7の使用方法

---

⚡ **重要**: コミット前は必ず`pnpm fix`と`pnpm check`を実行してください。