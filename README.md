# React Router v7 + Expo + Hono モノレポテンプレート

モダンなフルスタック開発のためのTurborepoベースのモノレポテンプレートです。

## 🚀 特徴

- **React Router v7 SPA** - 高性能なWebアプリケーション
- **Expo SDK 53** - クロスプラットフォームモバイルアプリ
- **Hono API** - Cloudflare Workers対応の高速API
- **Tamagui** - Web/Native共通UIコンポーネント
- **TypeScript** - 完全な型安全性
- **Turborepo** - 効率的なモノレポ管理
- **Biome** - 高速なlint & フォーマット

## 📁 プロジェクト構成

```
web-native-monorepo-template/
├── apps/
│   ├── web/                    # React Router v7 Webアプリ (SPA)
│   ├── native/                 # Expo React Nativeアプリ
│   └── api/                    # Hono APIアプリ (Cloudflare Workers)
├── packages/
│   ├── ui/                     # Tamagui共有UIコンポーネント
│   └── typescript-config/      # 共有TypeScript設定
└── docs/                       # プロジェクトドキュメント
```

## 🛠️ 技術スタック

### Web App (`apps/web`)
- **React Router v7** - SPA Mode
- **Tamagui** - クロスプラットフォームUI
- **React Native Web** - React Nativeコンポーネント対応
- **Vite** - 高速ビルドツール
- **Vitest** - 高速テストランナー

### Native App (`apps/native`)
- **Expo SDK 53** - React Nativeフレームワーク
- **Expo Router** - ファイルベースルーティング
- **Tamagui** - ネイティブUI対応

### API (`apps/api`)
- **Hono** - 高速Webフレームワーク
- **Drizzle ORM** - 型安全なORM
- **Cloudflare D1** - サーバーレスSQLデータベース
- **Cloudflare Workers** - エッジランタイム
- **TypeScript** - 型安全なAPI開発

### パッケージ
- **@repo/ui** - Tamagui共有コンポーネント
- **@repo/typescript-config** - 共有TypeScript設定

## 🚀 開発開始

### 前提条件

- Node.js >= 24
- pnpm 10.12.4 (自動インストール)

### セットアップ

```bash
# リポジトリをクローン
git clone <repository-url>
cd web-native-monorepo-template

# 依存関係をインストール
pnpm install

# 全アプリの開発サーバーを起動
pnpm dev
```

### 個別アプリの起動

```bash
# Webアプリのみ (http://localhost:3000)
pnpm dev:web

# Nativeアプリのみ
pnpm dev:native

# APIのみ (http://localhost:8787)
pnpm dev:api
```

## 🧪 テスト

```bash
# 全プロジェクトのテスト実行
pnpm test

# Webアプリのテストのみ
pnpm --filter web test

# テストをウォッチモードで実行
pnpm --filter web test:watch
```

## 🏗️ ビルド

```bash
# 全プロジェクトをビルド
pnpm build

# 特定のアプリのみビルド
pnpm --filter web build
pnpm --filter native build
pnpm --filter api build
```

## 🔧 コード品質

```bash
# コードフォーマット & Lint (自動修正)
pnpm fix

# コード品質チェック
pnpm check

# 型チェック
pnpm check-types
```

## 📱 主な機能

### Web App
- **React Router v7** によるSPAルーティング
- **Tamagui** によるレスポンシブUI
- **React Native Web** によるネイティブライクな操作感
- **包括的なテストスイート** (Vitest + Testing Library)

### Native App
- **Expo Router** によるファイルベースルーティング
- **プラットフォーム固有の最適化**
- **ハプティックフィードバック**
- **テーマ対応コンポーネント**

### Shared UI Package
- **Tamagui** ベースのコンポーネントライブラリ
- **Web/Native両対応**
- **型安全なプロパティ**
- **カスタマイズ可能なテーマ**

## 📚 ドキュメント

### 全体設計・ワークフロー
- 📘 [開発ガイド](./docs/DEVELOPMENT.md) - 詳細なアーキテクチャとAPI
- 📗 [Git/GitHubワークフロー](./docs/GIT_WORKFLOW.md) - ブランチルールとPR作成
- 📙 [コマンドリファレンス](./docs/COMMANDS.md) - 利用可能なコマンド
- 🔍 [トラブルシューティング](./docs/TROUBLESHOOTING.md) - よくある問題と解決方法

### API・データベース
- 🔑 [API設定ガイド](./docs/API.md) - 環境設定・開発ワークフロー
- 🗄️ [D1データベース設定](./docs/D1_SETUP.md) - Cloudflare D1セットアップ

### 開発ツール
- 🔧 [MCP設定ガイド](./docs/MCP.md) - Claude Code設定
- 🎨 [Tamagui設定ガイド](./docs/TAMAGUI_SETUP.md) - UI コンポーネント

### アプリ個別
各アプリの詳細な使い方は、apps/*/README.md を参照（最低限の情報のみ）

## 🤝 開発ワークフロー

1. **新機能開発**
   ```bash
   # ブランチ作成
   git checkout -b feature/new-feature
   
   # コード作成
   # ...
   
   # コード品質チェック
   pnpm fix && pnpm check-types
   
   # コミット
   git commit -m "feat: add new feature"
   ```

2. **共有コンポーネント作成**
   - `packages/ui/src/` にコンポーネント作成
   - Web/Native両対応の実装
   - 適切なexportを `packages/ui/src/index.ts` に追加

3. **テスト作成**
   - コンポーネントとページのテストを必ず作成
   - Tamagui コンポーネントはProviderでラップしてテスト

## 📄 ライセンス

MIT License

## 🙏 貢献

プルリクエストやイシューの報告を歓迎します！

---

**Claude Code** での開発を想定した設定済みテンプレートです。
詳細は [CLAUDE.md](./CLAUDE.md) を参照してください。