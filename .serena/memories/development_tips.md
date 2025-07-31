# 開発のヒントとベストプラクティス

## 環境変数管理
- **Web/Native**: 各アプリの`.env`ファイル
- **API**: `.dev.vars`ファイル（すべての環境変数を一元管理）
  - Cloudflare認証情報（ACCOUNT_ID、API_TOKEN）
  - D1データベースID

## エンジン要件
- **Node.js**: >= 24.4.1
- **pnpm**: 10.13.1（packageManagerで自動）

## パフォーマンス最適化
- Turborepoキャッシュを活用
- 並列ビルドの活用
- Tree shakingの活用

## トラブルシューティングのヒント
1. **依存関係の競合**: `pnpm install --force`
2. **キャッシュの問題**: 
   ```bash
   turbo daemon clean
   pnpm store prune
   ```
3. **Native開発の問題**: `expo doctor`で環境チェック

## デバッグ
- **Web**: Chrome DevTools
- **Native**: React Native Debugger推奨
- **VS Code**: 推奨拡張機能は`.vscode/extensions.json`参照

## MCPサーバー
- **Playwright**: ブラウザ自動化
- **Context 7**: 最新ドキュメント参照
- **Serena**: コードベース理解とシンボル操作