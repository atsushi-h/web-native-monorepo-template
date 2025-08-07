# ADR-0001: プラットフォーム個別実行のためのpackage.jsonスクリプト体系変更

**ステータス:** 採用  
**日付:** 2025-08-07  
**決定者:** 開発チーム  
**技術的背景:** モノレポでのプラットフォーム個別開発効率向上

## 背景と問題設定

現在のモノレポテンプレートでは、Web、Native、APIの各プラットフォームを個別に実行するコマンドが`pnpm dev:web`、`pnpm dev:native`、`pnpm dev:api`の形式となっている。しかし、この形式では`pnpm web build`や`pnpm web check`のような柔軟なコマンド実行ができず、開発体験が制限されている。より直感的で柔軟なコマンド体系への変更が必要である。

## 決定要因

- **開発体験の向上**: プラットフォーム名をベースとした直感的なコマンド体系
- **コマンドの柔軟性**: `pnpm [platform] [action]`形式でのタスク実行
- **一貫性**: プラットフォーム横断での統一されたコマンド体系
- **Turborepoとの親和性**: `turbo run --filter`の効果的活用
- **既存ワークフローとの互換性**: 段階的移行の可能性

## 検討した選択肢

- 選択肢1: 現状維持（`dev:platform`形式）
- 選択肢2: 新形式への完全移行（`platform`形式）
- 選択肢3: 新旧併用による段階的移行

## 決定結果

**採用した選択肢:** "選択肢2: 新形式への完全移行"、理由: 開発体験の大幅な向上と、コマンド体系の統一によるメンテナンス性向上が期待できるため。

### 肯定的な結果

- プラットフォーム個別の柔軟なタスク実行が可能
- `pnpm web dev/build/check`形式での直感的な操作
- コマンド体系の統一による学習コスト削減
- Turborepoフィルタリング機能の効果的活用

### 否定的な結果

- 既存ドキュメントの更新作業が必要
- 開発者への変更通知とトレーニングが必要
- CI/CDパイプラインでの既存コマンド参照の確認が必要

## 選択肢の長所と短所

### 選択肢1: 現状維持（`dev:platform`形式）

現在の`pnpm dev:web`、`pnpm dev:native`、`pnpm dev:api`形式を維持

**長所:**
- 変更作業が不要
- 既存ドキュメントとの整合性維持
- 学習コストゼロ

**短所:**
- コマンドの柔軟性が低い
- `pnpm web build`のような直感的実行が不可能
- プラットフォーム毎の個別タスクが実行しにくい

### 選択肢2: 新形式への完全移行（`platform`形式）

`pnpm web`、`pnpm native`、`pnpm api`形式への変更

**長所:**
- 高い柔軟性（`pnpm web dev/build/check`）
- 直感的でシンプルなコマンド体系
- Turborepoフィルタリングの効果的活用
- プラットフォーム名ベースの統一感

**短所:**
- 既存ドキュメントの更新が必要
- 開発者への通知・教育が必要
- 一時的な混乱の可能性

### 選択肢3: 新旧併用による段階的移行

新形式を追加し、旧形式も併存させる段階的アプローチ

**長所:**
- 移行期間中の後方互換性確保
- 段階的な学習・適応が可能
- リスクの最小化

**短所:**
- package.jsonの複雑化
- コマンド体系の二重管理
- 長期的なメンテナンス負担

## 実装

### アクションアイテム

- [x] 新形式スクリプトの設計確定
- [ ] package.jsonスクリプトの更新
- [ ] 関連ドキュメント（8ファイル）の更新
- [ ] serenaメモリファイルの更新
- [ ] 新コマンドの動作確認
- [ ] チームへの変更通知

### 成功指標

- 新コマンドでの全プラットフォーム正常起動
- 開発者のコマンド使用頻度向上
- ドキュメントの整合性確保
- 既存ワークフローへの影響ゼロ

## 技術詳細

### 変更内容

**変更前:**
```json
{
  "dev:web": "turbo dev --filter=@repo/web",
  "dev:native": "turbo dev --filter=@repo/native",
  "dev:api": "turbo dev --filter=@repo/api"
}
```

**変更後:**
```json
{
  "web": "turbo run --filter=@repo/web",
  "native": "turbo run --filter=@repo/native",
  "api": "turbo run --filter=@repo/api"
}
```

### 使用例

```bash
# 開発サーバー起動
pnpm web dev      # Webアプリ開発サーバー
pnpm native dev   # Nativeアプリ開発サーバー
pnpm api dev      # APIサーバー

# ビルド
pnpm web build    # Webアプリビルド
pnpm native build # Nativeアプリビルド
pnpm api build    # APIビルド

# 品質チェック
pnpm web check    # Webアプリ品質チェック
pnpm native check # Nativeアプリ品質チェック
pnpm api check    # API品質チェック
```

## リンク

- [PLAN: PLAN-refactor-package-scripts](../plans/PLAN-refactor-package-scripts/PLAN-refactor-package-scripts.md)
- [Task Overview: package-scripts-refactor](../plans/PLAN-refactor-package-scripts/tasks/_overview-package-scripts-refactor.md)
- [Turborepo Filtering Documentation](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [プロジェクトコンテキスト](../rules/project-context.md)

---

*このADRは、MADR（Markdown Any Decision Record）とMichael NygardのADRテンプレートに基づいた形式に従います。*