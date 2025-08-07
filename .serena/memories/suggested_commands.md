# 推奨コマンド一覧

## 必須コマンド（コミット前）
- `pnpm fix` - コードの自動修正とフォーマット
- `pnpm check` - 包括的チェック（lint + format + 型チェック）
- `pnpm check-types` - TypeScript型チェックのみ

## 開発コマンド
- `pnpm dev` - すべてのアプリを開発モードで起動
- `pnpm web dev` - Webアプリのみ起動（http://localhost:3000）
- `pnpm native dev` - Nativeアプリのみ起動
- `pnpm api dev` - APIアプリのみ起動（http://localhost:8787）

## ビルドコマンド
- `pnpm build` - すべてのアプリをビルド
- `pnpm web build` - Webアプリのみビルド
- `pnpm native build` - Nativeアプリのみビルド
- `pnpm api build` - APIアプリのみビルド

## 品質チェックコマンド
- `pnpm web check` - Webアプリのみチェック
- `pnpm native check` - Nativeアプリのみチェック
- `pnpm api check` - APIアプリのみチェック

## テストコマンド
- `pnpm test` - 全プロジェクトのテスト実行
- `pnpm web test` - Webアプリのテストのみ
- `pnpm native test` - Nativeアプリのテストのみ
- `pnpm api test` - APIアプリのテストのみ
- `pnpm web test:watch` - Webアプリのテストをウォッチモード

## 依存関係管理
- `pnpm add <package> --filter=@repo/web` - 特定アプリへパッケージ追加
- `pnpm add -w <package>` - ワークスペースのルートにパッケージ追加
- `pnpm install` - すべての依存関係をインストール

## システムコマンド（Darwin）
- `ls` - ファイル一覧表示
- `cd` - ディレクトリ移動
- `git` - バージョン管理
- `gh` - GitHub CLI（PR作成など）