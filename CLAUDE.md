# CLAUDE.md

このファイルは、このリポジトリのコードを扱う際にClaude Code (claude.ai/code)にガイダンスを提供します。

## プロジェクト概要

Turborepoとpnpmを使用したNext.js + Expoモノレポテンプレートです。以下のプロジェクトが含まれています：

- `apps/web`: Next.js Webアプリケーション（ポート3000）
- `apps/native`: ExpoのReact Nativeアプリ
- `packages/ui`: 共有Reactコンポーネントライブラリ
- `packages/typescript-config`: 共有TypeScript設定

## 一般的なコマンド

### 開発
```bash
# すべてのアプリを開発モードで起動
pnpm dev

# 特定のアプリを起動
pnpm dev:web      # Webアプリのみ
pnpm dev:native   # Nativeアプリのみ

# またはturboフィルターを使用
turbo dev --filter=@repo/web
turbo dev --filter=@repo/native
```

### ビルド
```bash
# すべてのアプリをビルド
pnpm build

# 特定のアプリをビルド
turbo build --filter=@repo/web
```

### コード品質
```bash
# コード品質チェック（lint + format + types）
pnpm check

# 問題を自動修正
pnpm fix

# 個別コマンド
pnpm lint         # すべてのプロジェクトをlint
pnpm format       # すべてのプロジェクトをformat
pnpm check-types  # すべてのプロジェクトの型チェック
```

## プロジェクト構造

### ディレクトリ構造
```
nextjs-expo-monorepo-template/
├── .claude/                    # Claude Code設定
├── .vscode/                    # VS Code設定
├── apps/
│   ├── native/                 # React Native (Expo)アプリ
│   └── web/                    # Next.js Webアプリ
├── packages/
│   ├── ui/                     # 共有UIコンポーネント
│   └── typescript-config/      # TypeScript設定
├── CLAUDE.md                   # このファイル
├── README.md
├── package.json                # ルートパッケージ
├── pnpm-workspace.yaml         # pnpmワークスペース設定
├── turbo.json                  # Turborepo設定
└── biome.json                  # Biome設定
```

### アーキテクチャ
- **モノレポ**: タスクオーケストレーションとキャッシュにTurborepoを使用
- **パッケージマネージャー**: ワークスペース対応のpnpm
- **コード品質**: lintとフォーマットにBiomeを使用（ESLint/Prettierの代替）
- **型安全性**: 共有設定でTypeScriptを全体に適用

### 重要なファイル
- `turbo.json`: Turborepoタスク設定
- `biome.json`: Biome lintとフォーマット設定
- `pnpm-workspace.yaml`: pnpmワークスペース設定
- `package.json`: turboに委譲するスクリプトを含むルートパッケージ

### 依存関係
- React 19.0.0（pnpm overridesで強制）
- Node.js >= 24（enginesで定義）
- pnpm 10.12.4（packageManagerで定義）

## 開発ワークフロー

1. **新しいコンポーネント**: `packages/ui/src/`に追加し、パッケージからexport
2. **アプリ固有のコード**: 各アプリディレクトリに配置
3. **共有設定**: TypeScript設定は`packages/typescript-config/`に配置
4. **コードスタイル**: Biomeが2スペースインデント、100文字行幅でフォーマット

## Nativeアプリの詳細

NativeアプリはExpo Routerを使用し、以下が含まれます：
- `components/ui/`のプラットフォーム固有コンポーネント
- `ThemedText`と`ThemedView`を使用したテーマ対応コンポーネント
- ハプティックフィードバック対応
- プラットフォーム固有のアイコンハンドリング

## 追加スクリプト

### Nativeアプリ
```bash
# プラットフォーム固有の開発
expo start --android
expo start --ios
expo start --web

# プロジェクトリセット（サンプルコードを削除）
npm run reset-project
```

このコードベースで作業する際は、確立されたパターンを常に使用し、変更をコミットする前に適切な品質チェックを実行してください。