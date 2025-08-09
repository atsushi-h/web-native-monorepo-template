<!--
Based on ai-coding-project-boilerplate by Shinsuke Kagawa
https://github.com/shinpr/ai-coding-project-boilerplate
-->

# Sub-agents FAQ - よくある質問別ガイド

## 🔍 シーン別ナビゲーション

### 「新機能を実装したい」
**最適なルート**: `sub-agents.md` → `sub-agents-workflow.md` → `sub-agents-reference.md`

```
📍 START: sub-agents.md
├─ 🎯 基本的な立ち位置 → オーケストレーター役割理解
└─ 💡 判断パターン1 → 新機能実装の依頼パターン

📍 FLOW: sub-agents-workflow.md  
├─ 📄 作業計画時の基本フロー → 統一フロー確認
└─ 🤖 TASK単位実行モード → 実行戦略理解

📍 API: sub-agents-reference.md
├─ requirement-analyzer → 要件分析開始
├─ work-planner → 作業計画書作成  
└─ task-decomposer → TASK分解
```

### 「品質チェックしたい」
**最適なルート**: `sub-agents.md` → `sub-agents-reference.md`

```
📍 START: sub-agents.md
├─ 🎭 オーケストレーション原則 → quality-fixerへの責務分離
└─ 💡 判断パターン4 → 品質チェックフェーズ

📍 API: sub-agents-reference.md
├─ quality-fixer → 全体品質チェック仕様
├─ 🔄 エラーハンドリング → 実用的な修正例
└─ 📊 構造化レスポンス → approved判定の確認
```

### 「エラーが発生した」  
**最適なルート**: `sub-agents-reference.md` → `sub-agents-workflow.md`

```
📍 API: sub-agents-reference.md
├─ 🔄 エラーハンドリング → 実用例から対処法特定
└─ quality-fixer → 品質エラー自動修正

📍 FLOW: sub-agents-workflow.md
├─ ⚡ 人間との対話ポイント → エスカレーション基準
└─ 🔄 要件変更対応 → 要件起因のエラー対処
```

### 「要件が変更された」
**最適なルート**: `sub-agents-workflow.md` → `sub-agents-reference.md`

```
📍 FLOW: sub-agents-workflow.md
├─ 📋 ユーザーレスポンス処理 → 要件変更検知チェックリスト
├─ 🔄 要件変更対応 → 統合方法とパターン
└─ ⚡ 人間との対話ポイント → 停止条件の確認

📍 API: sub-agents-reference.md  
└─ requirement-analyzer → 統合要件での再分析
```

### 「TASKを実行したい」
**最適なルート**: `sub-agents-workflow.md` → `sub-agents-reference.md`

```
📍 FLOW: sub-agents-workflow.md
├─ 🤖 TASK単位実行モード → 実行サイクル理解
├─ 🆚 従来モードとの違い → 承認タイミング確認
└─ ⚡ 停止ポイント → ユーザー承認待ちタイミング

📍 API: sub-agents-reference.md
├─ task-executor → TASK実装仕様
├─ quality-fixer → 品質チェック連携
└─ 📊 構造化レスポンス → 完了判定方法
```

## 🎯 目的別クイックリファレンス

### オーケストレーション基礎
- **原則理解**: [sub-agents.md#オーケストレーション原則](./sub-agents.md#-私のオーケストレーション原則)
- **責務分離**: [sub-agents.md#責務分離](./sub-agents.md#責務分離を意識した振り分け)
- **判断フロー**: [sub-agents-workflow.md#判断フロー](./sub-agents-workflow.md#-タスク受領時の判断フロー)

### 実装・実行系
- **新機能フロー**: [sub-agents-workflow.md#基本フロー](./sub-agents-workflow.md#-作業計画時の基本フロー)
- **TASK実行**: [sub-agents-workflow.md#TASK単位実行](./sub-agents-workflow.md#-task単位実行モード段階1-create-pr統合)
- **品質保証**: [sub-agents-reference.md#quality-fixer](./sub-agents-reference.md#quality-fixer)

### 問題解決系
- **エラー対処**: [sub-agents-reference.md#エラーハンドリング](./sub-agents-reference.md#-エラーハンドリングと要件変更時の例)
- **要件変更**: [sub-agents-workflow.md#要件変更対応](./sub-agents-workflow.md#-要件変更への対応パターン)
- **停止・再開**: [sub-agents-workflow.md#停止条件](./sub-agents-workflow.md#task単位実行の停止条件)

## 📖 学習パス

### 初心者向け（初回理解）
1. [sub-agents.md](./sub-agents.md) - 全体像の理解
2. [sub-agents.md#Quick Jump Links](./sub-agents.md#-quick-jump-links) - 使用頻度の高いパターン確認
3. [sub-agents-workflow.md#基本フロー](./sub-agents-workflow.md#-作業計画時の基本フロー) - 標準的な作業の流れ

### 実践者向け（日常使用）
1. [sub-agents-reference.md#各エージェント詳細](./sub-agents-reference.md#-各サブエージェントの詳細) - API仕様の確認
2. [sub-agents-workflow.md#TASK単位実行](./sub-agents-workflow.md#-task単位実行モード段階1-create-pr統合) - 効率的な実行方法
3. [sub-agents-reference.md#エラーハンドリング](./sub-agents-reference.md#-エラーハンドリングと要件変更時の例) - トラブル対応

### 上級者向け（最適化）
1. [sub-agents-workflow.md#要件変更対応](./sub-agents-workflow.md#-要件変更への対応パターン) - 複雑なケースの対応
2. [sub-agents-reference.md#構造化レスポンス](./sub-agents-reference.md#-構造化レスポンス仕様) - 自動化・連携の理解
3. [sub-agents-workflow.md#人間との対話](./sub-agents-workflow.md#-人間との必須対話ポイント) - 効率的なコラボレーション