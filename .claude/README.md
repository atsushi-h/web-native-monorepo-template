# Claude Code Hooks Configuration

このディレクトリには、Claude Codeのhooks設定が含まれています。

## 設定ファイル

### `settings.json`
基本的なhooks設定とグローバルオプション

### `hooks.json`
詳細なhooks設定とコマンド定義

## Hooks の動作

### タスク完了後 (`afterTaskCompletion`)
Claude Codeがタスクを完了した後に自動的に実行されます：

1. **`pnpm fix`** - コードの自動修正とフォーマット
   - 最大2回まで再試行
   - 失敗してもタスクを継続

2. **`pnpm check-types`** - TypeScript型チェック
   - 最大1回まで再試行
   - 失敗時はタスクを停止

### コミット前 (`beforeCommit`)
gitコミット前に品質チェックを実行：

- **`pnpm check`** - 包括的な品質チェック

### エラーハンドリング (`onError`)
エラー発生時の自動修正機能：

- 自動再試行（最大3回）
- 修正コマンドの段階的実行

## コマンドの詳細

| コマンド | 説明 | タイムアウト | 再試行 |
|---------|------|----------|--------|
| `pnpm fix` | コードフォーマットとlint修正 | 30秒 | 2回 |
| `pnpm check-types` | TypeScript型チェック | 60秒 | 1回 |
| `pnpm check` | 総合品質チェック | 120秒 | 0回 |

## ログ

hooks の実行ログは `.claude/hooks.log` に記録されます。

## カスタマイズ

プロジェクトのニーズに応じて設定を調整できます：

1. タイムアウト値の変更
2. 再試行回数の調整
3. 新しいコマンドの追加
4. エラーハンドリングの修正

## 無効化

hooks を一時的に無効にする場合：

```json
{
  "hooks": {
    "enabled": false
  }
}
```

## トラブルシューティング

### よくある問題

1. **コマンドがタイムアウトする**
   - `timeout` 値を増やす
   - 依存関係のインストール状況を確認

2. **型エラーが解決されない**
   - `pnpm check-types` を手動実行して詳細を確認
   - TypeScript設定を見直し

3. **hooks が実行されない**
   - `enabled: true` になっているか確認
   - Claude Codeの設定を確認