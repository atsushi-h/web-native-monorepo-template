<!--
Based on ai-coding-project-boilerplate by Shinsuke Kagawa
https://github.com/shinpr/ai-coding-project-boilerplate
-->

# 技術設計ルール

このルールファイルは、プロジェクトの技術的なアーキテクチャ設計、データフロー設計、環境設定に関するルールとガイドラインを定義します。

## 環境変数管理とセキュリティ

### 環境変数管理
- 環境変数は一元管理し、型安全性を確保する仕組みを構築すること
- `process.env` の直接参照は避け、設定管理層を通じて取得すること
- デフォルト値の設定や必須チェックを適切に実装すること

### セキュリティ
- `.env`ファイルはGitに含めない
- APIキーやシークレットは必ず環境変数として管理
- 機密情報のログ出力は禁止
- エラーメッセージに機密情報を含めない

## 設計ドキュメントとプロセス

**重要**: ドキュメントレビューなしの実装開始は絶対禁止

### ADR（Architecture Decision Record）について
- **保存場所**: `docs/adr/`（永続的に保存）
- **命名規則**: `ADR-YYYYMMDD-{decision-title}.md`
  - YYYYMMDD: 日付
  - decision-title: 決定事項を表すkebab-case
- **ADRテンプレート**: `docs/adr/ADR-YYYYMMDD-template.md`（gitで管理）
- **作成タイミング**: 
  - アーキテクチャ上の重要な決定時
  - 技術スタックの選定時
  - 破壊的変更の実施時
- **運用フロー**:
  1. ユーザーが作成要否を判断
  2. テンプレートから新規作成
  3. 実装と並行して更新
  4. プロジェクトの記録として永続保存

### Design Docについて
- **保存場所**: `docs/design/`（永続的に保存）
- **命名規則**: `DESIGN-YYYYMMDD-{feature-name}.md`
  - YYYYMMDD: 日付
  - feature-name: 機能名をkebab-caseで表記
- **Design Docテンプレート**: `docs/design/DESIGN-YYYYMMDD-template.md`（gitで管理）
- **作成タイミング**:
  - 複雑な機能の実装前
  - パフォーマンス要件がある機能
  - セキュリティ要件がある機能
  - 外部システムとの連携時
- **運用フロー**:
  1. ユーザーが作成要否を判断
  2. テンプレートから新規作成
  3. 実装前に詳細設計を記述
  4. 実装中も更新・改訂
  5. プロジェクトの設計資料として永続保存

### 作業計画書（PLAN）について
- **保存場所**: `docs/plans/PLAN-{type}-{title}/`（一時的に作成、完了後削除）
- **命名規則**: `PLAN-{type}-{title}/`
- **ディレクトリ構造**: 
  ```
  docs/plans/PLAN-{type}-{title}/
  ├── PLAN-{type}-{title}.md
  └── tasks/
      ├── TASK-NN-{task-name}.md
      └── ...
  ```
- **PLANテンプレート**: `docs/plans/plan-template.md`（gitで管理）
- **TASKテンプレート**: `docs/plans/task-template.md`（gitで管理）
- **運用フロー**: 
  1. 作業開始時に作成
  2. 各フェーズ完了時に進捗更新（チェックボックス）
  3. 全タスク完了後、ユーザー承認を得て削除

### ドキュメント体系のまとめ
| ドキュメント種別 | 保存場所 | 永続性 | 目的 |
|---------------|---------|--------|------|
| ADR | `docs/adr/` | 永続保存 | アーキテクチャ決定の記録 |
| Design Doc | `docs/design/` | 永続保存 | 詳細な技術設計の記録 |
| 作業計画書（PLAN） | `docs/plans/` | 一時的（完了後削除） | 実装タスクの管理 |

### サブエージェント連携
上記のプロセスはサブエージェントと連携して実行されます。詳細なワークフローは`docs/rules/sub-agents-workflow.md`を参照してください。

### データフロー統一原則

#### 基本原則
1. **単一データソース**: 同じ情報は1箇所にのみ保存する
2. **構造化データ優先**: JSON文字列ではなくパース済みオブジェクトを使用
3. **明確な責務分離**: 各層の責務を明確に定義

#### データフローのベストプラクティス
- **入力時点での検証**: データは入力層で検証し、型安全な形で内部に渡す
- **変換の一元化**: データ変換ロジックは専用のユーティリティに集約
- **ログの構造化**: データフローの各段階で構造化ログを出力

## ビルドとテスト

プロジェクトごとにビルドコマンドとテスト実行方法を定義。

## 参照した手法・原則
- **ADR（Architecture Decision Record）**: Michael Nygard「Documenting Architecture Decisions」
- **単一データソース原則**: Single Source of Truth（データ管理のベストプラクティス）
- **依存性注入（DI）**: Martin Fowler「Inversion of Control Containers and the Dependency Injection pattern」
品質チェックは実装完了時に必須。