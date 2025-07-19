---
description: "包括的なPR作成ワークフロー - ブランチ作成、コミット、プッシュ、PR作成を自動化"
allowed-tools: ["Bash", "Edit", "Read", "Glob", "Grep"]
argument-hint: "[PR説明] - PR作成時の追加説明（オプション）"
---

# PR作成ワークフロー

現在の変更から包括的なPR作成ワークフローを実行します：

1. **ブランチ管理**: mainブランチにいる場合は適切なブランチを作成
2. **品質チェック**: pnpm fix、pnpm check-types、pnpm checkを実行
3. **コミット処理**: 品質チェック通過後、変更内容を分析して意味のある単位でコミットを分割
4. **プッシュ**: ブランチをリモートにプッシュ
5. **PR作成**: プロジェクトのテンプレートに従ってPRを作成

## 使用方法

```bash
# 基本使用
/create-pr

# 説明付き
/create-pr "ユーザー認証機能の実装"

# Issue参照付き
/create-pr "ダークモード追加 (#123)"
```

## 実行される処理

### 1. 現在の状態確認
```bash
git status
git branch --show-current
```

### 2. ブランチ処理
mainブランチにいる場合、変更内容を分析して適切なブランチを作成：
- 新機能: `feat/description`
- バグ修正: `fix/description` 
- ドキュメント: `docs/description`
- リファクタリング: `refactor/description`
- テスト: `test/description`
- その他: `chore/description`

### 3. 品質チェック
```bash
pnpm fix           # コード自動修正
pnpm check-types   # TypeScript型チェック
pnpm check         # 包括的チェック
```

**重要**: いずれかの品質チェックが失敗した場合は、コミットを行わずにPR作成を中止してください。
- `pnpm fix`が失敗した場合 → 修正が必要なエラーを報告し、処理を停止
- `pnpm check-types`が失敗した場合 → TypeScript型エラーを報告し、処理を停止  
- `pnpm check`が失敗した場合 → lintエラーを報告し、処理を停止

エラーが発生した場合は、ユーザーにエラー内容を説明し、手動で修正するよう促してください。

### 4. 変更の分析とコミット
品質チェック通過後、変更されたファイルを分析し、論理的な単位でコミットを分割：
```bash
git add <related-files>
git commit -m "feat: 機能A実装"
git add <other-files>
git commit -m "style: コードフォーマット調整"
```

### 5. プッシュとPR作成
```bash
git push -u origin <branch-name>  # 新規ブランチの場合
gh pr create --title "<title>" --body "<body>" --base main
```

## PRテンプレート連携

`.github/pull_request_template.md`のテンプレートを使用し、以下を自動入力：

- **概要**: コミットメッセージから生成
- **変更内容**: 変更ファイルリストから生成
- **影響範囲**: ファイルパスに基づいて自動チェック
  - `apps/web` → Web アプリ
  - `apps/native` → Native アプリ  
  - `packages/ui` → 共有UIコンポーネント
  - `packages/typescript-config` → TypeScript設定
- **変更の種類**: ブランチ名から自動判定
- **技術的チェックリスト**: 品質チェック通過後に自動チェック

## 引数の使用

`$ARGUMENTS`が提供された場合、PR説明に追加情報として含めます。

---

**注意**: このコマンドは変更をコミット・プッシュするため、実行前に変更内容を確認してください。