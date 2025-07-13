# Claude Code Hooks設定

このディレクトリには、Claude Code用のHooks設定が含まれています。

## ファイル構成

- `settings.json` - 基本的なHooks設定
- `hooks.json` - 詳細なHooks設定とエラーハンドリング
- `README.md` - このドキュメント

## Hooks機能

### タスク完了時の自動実行

Claude Codeが指示を完了する際に、以下のコマンドが自動実行されます：

1. **`pnpm fix`** - Biomeによる自動コード修正とフォーマット
   - タイムアウト: 30秒
   - 最大再試行: 2回
   - エラー時: 処理停止

2. **`pnpm check-types`** - TypeScript型チェック
   - タイムアウト: 60秒
   - 最大再試行: 1回
   - エラー時: 処理停止

### コミット前チェック

コミット前に以下のコマンドが実行されます：

- **`pnpm check`** - 包括的な品質チェック（lint + format + types）
  - タイムアウト: 120秒
  - 最大再試行: 1回

## エラーハンドリング

### 自動修正の流れ

1. エラーが発生した場合、設定された回数まで自動的に再試行
2. `pnpm fix`でフォーマットとlintの自動修正を試行
3. `pnpm check-types`で型エラーを検出・報告
4. エラーが解決されない場合、詳細なログを出力

### 設定オプション

- `retryAttempts`: 再試行回数
- `timeout`: コマンドのタイムアウト時間（ミリ秒）
- `continueOnError`: エラー時に次のコマンドを実行するか
- `logLevel`: ログレベル（info, debug, error）

## トラブルシューティング

### Hooksが実行されない場合

1. Claude Codeのバージョンを確認
   ```bash
   claude --version
   ```

2. Hooks設定を確認
   ```bash
   cat .claude/settings.json
   ```

3. デバッグモードを有効化
   ```json
   {
     "debug": true,
     "logLevel": "debug"
   }
   ```

### コマンドが失敗する場合

1. 手動でコマンドを実行して問題を特定
   ```bash
   pnpm fix
   pnpm check-types
   ```

2. プロジェクトの依存関係を確認
   ```bash
   pnpm install
   ```

3. Turborepo設定を確認
   ```bash
   cat turbo.json
   ```

## 設定のカスタマイズ

### タイムアウトの調整

大きなプロジェクトの場合、タイムアウト値を増やすことができます：

```json
{
  "timeout": 120000,
  "retryAttempts": 3
}
```

### 特定のファイルタイプのみを対象にする

```json
{
  "conditions": {
    "fileTypes": ["ts", "tsx"],
    "skipIfNoChanges": true
  }
}
```

### エラー処理戦略の変更

```json
{
  "errorHandling": {
    "strategy": "continue-on-error",
    "maxRetries": 5,
    "logErrors": true
  }
}
```

## 参考資料

- [Claude Code Hooks Documentation](https://docs.anthropic.com/en/docs/claude-code/hooks)
- [プロジェクトのCLAUDE.md](../CLAUDE.md)
- [Biome設定](../biome.json)
- [Turborepo設定](../turbo.json)