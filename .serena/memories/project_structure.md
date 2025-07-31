# プロジェクト構造

```
web-native-monorepo-template/
├── apps/
│   ├── web/                    # React Router v7 Webアプリ (SPA)
│   ├── native/                 # Expo React Nativeアプリ
│   └── api/                    # Hono APIアプリ (Cloudflare Workers)
├── packages/
│   ├── ui/                     # Tamagui共有UIコンポーネント
│   ├── features/               # ビジネスロジックとカスタムフック
│   ├── api-client/             # TanStack QueryベースのAPIクライアント
│   └── typescript-config/      # 共有TypeScript設定
├── docs/                       # プロジェクトドキュメント
├── .claude/                    # Claude Code設定
├── .vscode/                    # VS Code設定
├── .github/                    # GitHub Actions設定
├── .serena/                    # Serena MCP設定
├── CLAUDE.md                   # Claude Code用ガイド
├── README.md                   # プロジェクトREADME
├── package.json                # ルートパッケージ
├── pnpm-workspace.yaml         # pnpmワークスペース設定
├── turbo.json                  # Turborepo設定
└── biome.json                  # Biome設定
```

## 重要なファイルパス
- **Web App**: `apps/web/app/routes/` - ルート定義
- **Native App**: `apps/native/app/` - Expo Routerスクリーン
- **API**: `apps/api/src/routes/` - APIエンドポイント
- **共有UI**: `packages/ui/src/components/` - UIコンポーネント
- **機能**: `packages/features/src/` - ビジネスロジック