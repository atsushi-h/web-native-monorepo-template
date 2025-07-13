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

## Claude Code Hooks

このプロジェクトでは、Claude Code Hooksを使用して自動品質チェックを実行します。

### 自動実行される処理

Claude Codeが指示を完了する際に、以下のコマンドが自動実行されます：

1. **`pnpm fix`** - Biomeによる自動コード修正とフォーマット
2. **`pnpm check-types`** - TypeScript型チェック

### Hooks設定ファイル

- `.claude/settings.json` - 基本的なHooks設定
- `.claude/hooks.json` - 詳細なHooks設定とエラーハンドリング
- `.claude/README.md` - Hooks設定のドキュメント

### エラーハンドリング

エラーが発生した場合：
1. 自動的に設定回数まで再試行
2. `pnpm fix`でフォーマットとlintの問題を自動修正
3. `pnpm check-types`で型エラーを検出・報告
4. エラーが解決されない場合、詳細なログを出力

### 手動でのHooks実行

Hooksの動作をテストしたい場合：

```bash
# 個別実行
pnpm fix
pnpm check-types

# 包括的なチェック
pnpm check
```

## MCP (Model Context Protocol) サーバー

このプロジェクトではPlaywright MCPサーバーを使用してブラウザ自動化が可能です。

### 使用方法
```bash
# プロジェクトで初めて使用する場合、承認が必要です
# Claude Codeで以下のコマンドを実行：
/mcp

# ブラウザ操作の例：
# "Use playwright mcp to open https://example.com and take a screenshot"
```

### 利用可能な機能
- Webページのナビゲーション
- 要素のクリック、テキスト入力
- スクリーンショットの撮影
- フォームの操作
- JavaScriptの実行
- タブの管理

詳細な設定については、`.claude/README.md`を参照してください。

## GitHub Actions と PR作成

### ブランチルール

#### ブランチ命名規則
ブランチ名は以下の形式に従ってください：
```
<type>/<issue-number>-<short-description>
```

#### ブランチタイプ
- `feat/` - 新機能の追加
  - 例: `feat/123-add-dark-mode`
  - 例: `feat/456-user-authentication`
  
- `fix/` - バグ修正
  - 例: `fix/789-navbar-responsive-issue`
  - 例: `fix/101-memory-leak`
  
- `docs/` - ドキュメントの更新
  - 例: `docs/102-api-documentation`
  - 例: `docs/103-setup-guide`
  
- `refactor/` - コードのリファクタリング（機能変更なし）
  - 例: `refactor/104-optimize-api-calls`
  - 例: `refactor/105-component-structure`
  
- `test/` - テストの追加・修正
  - 例: `test/106-unit-tests-for-auth`
  - 例: `test/107-e2e-checkout-flow`
  
- `chore/` - ビルド設定、依存関係の更新など
  - 例: `chore/108-update-dependencies`
  - 例: `chore/109-ci-optimization`
  
- `perf/` - パフォーマンス改善
  - 例: `perf/110-optimize-image-loading`
  - 例: `perf/111-reduce-bundle-size`

#### ブランチ保護ルール
- `main`ブランチへの直接プッシュは禁止
- すべての変更はPR経由で行う
- PRマージ前に以下が必須：
  - CI/CDのすべてのチェックがパス
  - 最低1人のレビュー承認（可能な場合）
  - ブランチが最新の`main`と同期されている

### PR作成手順

#### 1. ブランチの作成
```bash
# Issue番号がある場合（推奨）
git checkout -b feat/123-add-user-profile
git checkout -b fix/456-login-error
git checkout -b docs/789-update-readme

# Issue番号がない場合
git checkout -b feat/add-user-profile
git checkout -b fix/login-error
git checkout -b docs/update-readme
```

#### 2. 作業とコミット
```bash
# 変更を加える
# ...

# 変更内容を確認
git status
git diff

# ステージング
git add .

# Conventional Commitsに従ってコミット
git commit -m "feat: ユーザープロフィール機能を追加"
git commit -m "fix: ログイン時のエラーを修正"
git commit -m "docs: READMEにインストール手順を追加"

# 複数のコミットがある場合の例
git commit -m "feat: プロフィール画面のUIを実装"
git commit -m "feat: プロフィール編集機能を追加"
git commit -m "test: プロフィール機能のテストを追加"
```

#### 3. コード品質チェック
```bash
# PR作成前に必ず実行
pnpm fix          # コードの自動修正とフォーマット
pnpm check-types  # TypeScriptの型チェック
pnpm check        # 包括的な品質チェック
```

#### 4. ブランチのプッシュ
```bash
# 初回プッシュ
git push -u origin feat/123-add-user-profile

# 追加のコミット後
git push
```

#### 5. PR作成
```bash
# GitHub CLIを使用してPR作成
gh pr create \
  --title "feat: ユーザープロフィール機能を追加 (#123)" \
  --body "## 概要
Issue #123 に対応し、ユーザープロフィール機能を実装しました。

## 変更内容
- プロフィール表示画面の実装
- プロフィール編集機能の追加
- プロフィール画像のアップロード機能
- 関連するAPIエンドポイントの追加

## テスト
- [x] ユニットテストを追加
- [x] 統合テストを実行
- [x] 手動での動作確認完了
- [x] \`pnpm check\`がパス

## スクリーンショット
（該当する場合は追加）

## 関連Issue
Closes #123

## チェックリスト
- [x] コードがプロジェクトのスタイルガイドに従っている
- [x] 自己レビューを実施した
- [x] 分かりにくい部分にコメントを追加した
- [x] ドキュメントを更新した（必要な場合）
- [x] 破壊的変更がない
- [x] 依存関係の変更がない" \
  --base main
```

### コミットメッセージ規則（Conventional Commits）

#### フォーマット
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### タイプ
- `feat:` 新機能
- `fix:` バグ修正
- `docs:` ドキュメントのみの変更
- `style:` コードの意味に影響しない変更（空白、フォーマット等）
- `refactor:` バグ修正や機能追加を含まないコード変更
- `perf:` パフォーマンスを向上させるコード変更
- `test:` テストの追加や既存テストの修正
- `chore:` ビルドプロセスやツールの変更

#### スコープ（オプション）
- `web:` webアプリケーション
- `native:` nativeアプリケーション
- `ui:` UIパッケージ
- `config:` 設定関連

#### 例
```bash
# 基本的な例
git commit -m "feat: ダークモードの切り替え機能を追加"
git commit -m "fix: ナビゲーションバーのレスポンシブ表示を修正"

# スコープ付きの例
git commit -m "feat(web): ユーザー認証機能を実装"
git commit -m "fix(native): iOSでのクラッシュを修正"
git commit -m "docs(ui): コンポーネントのAPIドキュメントを更新"

# 破壊的変更がある場合
git commit -m "feat!: APIレスポンスの形式を変更

BREAKING CHANGE: APIレスポンスのuser_idフィールドをuserIdに変更"

# Issue参照付き
git commit -m "fix: ログイン失敗時のエラーメッセージを修正

Fixes #456"
```

### PR作成時の注意事項

1. **Issue連携**
   - 関連するIssueがある場合は必ず参照する
   - `Closes #123`, `Fixes #456`, `Resolves #789` などのキーワードを使用

2. **レビュー依頼**
   - 適切なレビュアーをアサイン
   - 必要に応じてラベルを追加

3. **ドラフトPR**
   - 作業中の場合は `--draft` フラグを使用
   ```bash
   gh pr create --draft --title "WIP: 機能実装中"
   ```

4. **マージ戦略**
   - 基本的に「Squash and merge」を使用
   - コミット履歴を保持したい場合のみ「Merge commit」を使用

### ブランチのクリーンアップ

PRがマージされた後：
```bash
# ローカルのmainブランチを更新
git checkout main
git pull origin main

# マージ済みのブランチを削除
git branch -d feat/123-add-user-profile

# リモートブランチも削除（GitHubが自動削除しない場合）
git push origin --delete feat/123-add-user-profile
```