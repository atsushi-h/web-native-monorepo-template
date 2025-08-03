<!--
Based on ai-coding-project-boilerplate by Shinsuke Kagawa
https://github.com/shinpr/ai-coding-project-boilerplate
-->

# アーキテクチャ決定プロセス

## 目的

このドキュメントは、本プロジェクトにおけるアーキテクチャ決定のプロセスを定義し、一貫性のある技術的意思決定を行うためのガイドラインを提供します。

## ADR作成が必要なケース

### 必須
- **型システム変更**: 共有型定義の追加・変更
- **データフロー変更**: API通信、状態管理の変更
- **アーキテクチャ変更**: パッケージ構造、依存関係の変更
- **5ファイル以上の変更**: 大規模な機能追加・リファクタリング
- **外部依存追加**: 新しいnpmパッケージの導入

### モノレポ固有のケース
- **ワークスペース間の依存関係変更**: packages間の参照追加・変更
- **ビルド設定の変更**: Turbo、Vite、Expoの設定変更
- **プラットフォーム固有実装**: Web/Native専用機能の追加
- **共有UIコンポーネントの追加**: Tamaguiコンポーネントの作成

### 推奨
- パフォーマンス最適化（バンドルサイズ、ビルド時間）
- セキュリティ強化（認証、CORS設定）
- 拡張性向上（プラグインシステム、抽象化）

## ADR作成プロセス

1. **問題分析**: 課題と影響範囲の特定
2. **選択肢検討**: 複数案の比較とトレードオフ分析
3. **ADR作成**: `ADR-[4桁番号]-[タイトル].md`形式で文書化
4. **レビューと承認**: AIがドラフト作成 → ユーザー承認で"Accepted"
5. **実装**: ADRに従って実装開始

**実装時の注意事項**：
- ADRの実装ガイドラインに従う
- 大きな逸脱がある場合はADRを更新
- 実装中に発見した問題は記録

### 6. 振り返りと更新

**実施内容**：
- 実装後の結果を評価
- 想定外の影響があれば記録
- 必要に応じてADRを更新

## ADRステータス

**Proposed** → **Accepted** → **Deprecated/Superseded**

## ADRとDesign Docの使い分け

### ADR（Architecture Decision Record）
- **焦点**: なぜ（Why）- 決定理由とトレードオフ
- **例**: 「なぜTamaguiを選択したか」「なぜTurboを使うか」
- **保存場所**: `docs/adr/`

### Design Doc
- **焦点**: どのように（How）- 実装詳細とテスト戦略
- **例**: 「認証フローの実装設計」「APIエンドポイント設計」
- **保存場所**: `docs/design/`

## AI利用時のルール

### 基本ルール
- 5ファイル以上の変更時はADR作成を提案
- 既存ADRを必ず確認してから実装
- 緊急時（本番障害、セキュリティ脆弱性）は事後ADR作成可

### モノレポでの注意点
- パッケージ横断的な変更は必ずADR作成
- プラットフォーム固有実装でも共通インターフェースを検討
- ビルド時間への影響を考慮した決定

### ADRテンプレート例
```markdown
# ADR-0001: TamaguiによるクロスプラットフォームUI共有

## ステータス
Accepted

## コンテキスト
Web（React Router）とNative（Expo）で共通のUIコンポーネントを使用したい。

## 決定
Tamaguiを採用し、packages/uiで共通コンポーネントを管理する。

## 理由
- スタイリングの一貫性
- プラットフォーム最適化（isWebによる分岐）
- パフォーマンス（コンパイル時最適化）

## トレードオフ
- 学習コスト
- ビルド設定の複雑化
```

## 参照した手法・原則
- **ADR手法**: Michael Nygard「Documenting Architecture Decisions」（2011）
- **Design Doc文化**: Google Engineering Practices Documentation
- **トレードオフ分析**: Software Architecture in Practice（Bass, Clements, Kazman）
