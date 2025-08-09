<!--
Based on ai-coding-project-boilerplate by Shinsuke Kagawa
https://github.com/shinpr/ai-coding-project-boilerplate
-->

# Sub-agents リファレンス - 詳細仕様とAPI

このドキュメントでは、各サブエージェントの詳細仕様、呼び出し方法、規模判定基準などを説明します。

## 📏 規模判定の解釈基準

### 規模判定とドキュメント要件（requirement-analyzer結果の解釈用）

以下の規模判定基準に従って、必要なドキュメント作成を判断します：

| 規模 | ファイル数 | 作業計画書（PLAN） | タスク分解（TASK） |
|------|-----------|-----------------|------------------|
| 小規模 | 1-2 | **必須** | **必須** |
| 中規模 | 3-5 | **必須** | **必須** |
| 大規模 | 6以上 | **必須** | **必須** |

※ 作業計画書（PLAN）には、要件定義、技術設計、実装計画が統合されます

### 命名規則の詳細と例外ケース

**基本命名規則**:
```
PLANディレクトリ: PLAN-{type}-{title}/
PLAN本体:      PLAN-{type}-{title}.md
TASKファイル:    tasks/TASK-NN-{task-name}.md (NNは実行順2桁番号)
全体設計書:     tasks/_overview-{title}.md
```

**バージョン管理**:
- 既存ドキュメントの大幅更新: `{original-name}-v2.md`
- 例: `PLAN-feature-auth-system-v2.md`

**ディレクトリ構造**:
```
docs/plans/
├── PLAN-feature-auth-system/
│   ├── PLAN-feature-auth-system.md
│   └── tasks/
│       ├── _overview-auth-system.md
│       ├── TASK-01-implement-login.md
│       └── TASK-02-add-registration.md
├── plan-template.md
└── task-template.md
```

**派生ファイル**:
- 調査レポート: `tasks/TASK-NN-{task-name}-findings.md`
- 実装ログ: `tasks/TASK-NN-{task-name}-implementation.md`

## 🛠️ サブエージェント呼び出し方法

基本的な呼び出し形式：
```
Task(
  subagent_type="エージェント名", 
  description="短い説明", 
  prompt="詳細な指示内容"
)
```

## 📖 各サブエージェントの詳細

### requirement-analyzer
**目的**: 要件分析と作業規模判定
**出力**: 要件分析レポート、質問事項、推奨アプローチ

```
Task(
  subagent_type="requirement-analyzer",
  description="要件分析",
  prompt="ユーザー管理機能を作りたい。特に認証、権限管理、プロフィール編集が必要。\n\n要件を分析し、作業規模と推奨アプローチを提案してください。"
)
```

### work-planner
**目的**: 作業計画書作成（要件・設計・実装計画を統合）
**出力**: PLAN-{type}-{title}.md

```
Task(
  subagent_type="work-planner",
  description="作業計画書作成",
  prompt="requirement-analyzerの分析結果に基づき、ユーザー管理機能の作業計画書を作成してください。要件定義、技術設計、実装計画を統合し、docs/plans/に配置してください。"
)
```

### task-decomposer
**目的**: 作業計画書の適切なタスク分解
**出力**: TASK-NN-{task-name}.md

```
Task(
  subagent_type="task-decomposer",
  description="TASK分解",
  prompt="docs/plans/PLAN-feature-user-management/の作業計画書を読み込み、1コミット粒度の独立したタスクに分解してdocs/plans/PLAN-feature-user-management/tasks/に配置してください。"
)
```

### task-executor
**目的**: 個別タスクの実行
**出力**: 構造化レスポンス（JSON）

```
Task(
  subagent_type="task-executor",
  description="Task実行",
  prompt="""
タスクファイル: docs/plans/PLAN-feature-user-management/tasks/TASK-01-implement-login.md

実行指示:
- チェックリストに従って実装を完遂
- 各項目完了時に [ ] → [x] 更新
- 構造化レスポンス（JSON）で完了報告

前提: 実装の是非は判断済み、実行フェーズにある
"""
)
```

### quality-fixer
**目的**: 全体品質チェックと修正完了まで自己完結処理
**出力**: 構造化レスポンス（JSON）

```
Task(
  subagent_type="quality-fixer",
  description="品質チェックと修正",
  prompt="プロジェクト全体の品質チェックを実行し、発見された全ての問題を修正してください。型エラー、lint警告、テスト失敗を含む全ての品質問題が解決するまで完全に処理してください。"
)
```

### document-reviewer
**目的**: ドキュメント整合性チェック
**出力**: レビュー結果と改善提案

```
Task(
  subagent_type="document-reviewer",
  description="ドキュメントレビュー",
  prompt="docs/plans/PLAN-feature-user-management/以下の全ドキュメントの整合性をチェックしてください。特に要件と実装計画の一致、タスク間の依存関係、命名規則の遵守を確認してください。"
)
```

### document-fixer
**目的**: 複数観点レビューの統合と自動修正実行
**出力**: 構造化レスポンス（JSON）

```
Task(
  subagent_type="document-fixer",
  description="ドキュメント修正",
  prompt="document-reviewerで発見された整合性の問題を修正してください。要件定義と技術設計の矛盾、タスク間の依存関係の不整合を解消し、統一された内容に更新してください。"
)
```

## 🔄 エラーハンドリングと要件変更時の例

### requirement-analyzerでの要件変更対応
```
Task(
  subagent_type="requirement-analyzer",
  description="統合要件分析",
  prompt="初回要件: ユーザー管理機能を作りたい\n追加要件: 権限管理も必要\n\n上記の統合要件で作業規模判定と推奨アプローチを分析してください。要件変更による影響範囲と実装順序も含めて検討してください。"
)
```

### quality-fixerでのエラー修正
```
Task(
  subagent_type="quality-fixer",
  description="型エラー修正",
  prompt="以下の型エラーを修正してください：\n- Property 'id' does not exist on type 'User'\n- Argument of type 'string' is not assignable to parameter of type 'number'\n\n全ての型エラーを修正し、テストが通るまで完全に処理してください。エラー原因の分析と修正方針も報告してください。"
)
```

### document-fixerでの整合性修正
```
Task(
  subagent_type="document-fixer",
  description="PLANとTASKの整合性修正",
  prompt="PLAN-feature-user-management.mdとTASKファイル群の間で矛盾が発見されました。以下の観点で整合性を確保してください：\n1. 認証方式の記述\n2. データベース設計\n3. API仕様\n\n矛盾点を特定し、統一された内容に修正してください。"
)
```

## 📊 構造化レスポンス仕様

各サブエージェントはJSON形式で応答します。主要フィールド：

### task-executor
```json
{
  "status": "completed|failed|partial",
  "filesModified": ["src/auth/login.ts", "src/auth/login.test.ts"],
  "testsAdded": 3,
  "testsPassing": true,
  "readyForQualityCheck": true,
  "changeSummary": "ログイン機能の実装とテストの追加",
  "nextSteps": ["品質チェックの実行"]
}
```

### quality-fixer
```json
{
  "status": "completed|failed",
  "checksPerformed": ["typecheck", "lint", "test", "build"],
  "issuesFound": 5,
  "fixesApplied": 5,
  "approved": true,
  "remainingIssues": [],
  "changeSummary": "型エラー3件、lint警告2件を修正"
}
```

### document-fixer
```json
{
  "status": "completed|failed",
  "reviewsPerformed": ["consistency", "completeness", "naming"],
  "issuesFound": 2,
  "fixesApplied": 2,
  "readyForApproval": true,
  "filesModified": ["PLAN-feature-user-management.md", "tasks/TASK-01-implement-login.md"]
}
```

## 🎯 使用上の注意

1. **エージェントの選択**: タスクの性質に最も適したエージェントを選択
2. **プロンプトの明確性**: 具体的で明確な指示を提供
3. **前提条件の確認**: 必要な前提ファイルやコンテキストを確認
4. **出力の検証**: 構造化レスポンスの内容を確認して次のアクションを決定
5. **エラー時の対応**: エラー時は詳細を確認し、適切なリトライまたはエスカレーション