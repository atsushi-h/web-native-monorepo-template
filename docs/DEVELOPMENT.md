# 開発ガイド

このドキュメントでは、プロジェクトの詳細なアーキテクチャと開発に関する情報を提供します。

## プロジェクト構造

### ディレクトリ構造

```
web-native-monorepo-template/
├── .claude/                    # Claude Code設定
├── .vscode/                    # VS Code設定
├── apps/
│   ├── api/                    # Hono APIアプリ
│   ├── native/                 # React Native (Expo)アプリ
│   └── web/                    # React Router v7 Webアプリ (SPA)
├── packages/
│   ├── ui/                     # Tamagui共有UIコンポーネント
│   └── typescript-config/      # TypeScript設定
├── docs/                       # プロジェクトドキュメント
├── CLAUDE.md                   # Claude Code用ガイド
├── README.md                   # プロジェクトREADME
├── package.json                # ルートパッケージ
├── pnpm-workspace.yaml         # pnpmワークスペース設定
├── turbo.json                  # Turborepo設定
└── biome.json                  # Biome設定
```

### アーキテクチャ

- **モノレポ管理**: Turborepoによるタスクオーケストレーションとキャッシュ
- **パッケージマネージャー**: pnpm（ワークスペース対応）
- **コード品質**: Biome（ESLint/Prettierの代替）
- **型安全性**: TypeScript（共有設定）

### 重要な設定ファイル

#### turbo.json
Turborepoのタスク設定とパイプライン定義

#### biome.json
コードフォーマットとlintルール
- インデント: 2スペース
- 行幅: 100文字
- セミコロン: あり
- クォート: ダブルクォート

#### pnpm-workspace.yaml
ワークスペースのパッケージ定義

## 各アプリケーションの詳細

### Web App (`apps/web`)

React Router v7を使用したSPAアプリケーション

**主な機能:**
- React Router v7（SPA Mode）
- Tamagui UI コンポーネント
- React Native Web対応
- Vite + TypeScript
- Vitest テスト環境

**主要ファイル:**
- `app/root.tsx` - アプリケーションのルートレイアウト
- `app/routes.ts` - ルート定義
- `app/routes/home.tsx` - ホームページ
- `app/routes/tamagui-example.tsx` - Tamagui コンポーネントデモ
- `react-router.config.ts` - React Router設定（SSR無効）
- `vite.config.ts` - Vite設定（React Native Web対応）

**開発サーバー:**
```bash
pnpm dev:web  # http://localhost:3000
```

**テスト:**
```bash
pnpm test     # テスト実行
pnpm test:watch  # ウォッチモード
```

### Native App (`apps/native`)

Expo SDK 53を使用したReact Nativeアプリ

**主な機能:**
- Expo Router（ファイルベースルーティング）
- NativeWind（Tailwind for React Native）
- プラットフォーム固有の最適化
- ハプティックフィードバック

**特殊なコンポーネント:**
- `ThemedText` - テーマ対応テキスト
- `ThemedView` - テーマ対応ビュー
- `TabBarIcon` - プラットフォーム固有アイコン

**開発コマンド:**
```bash
# 開発サーバー起動
pnpm dev:native

# プラットフォーム別起動
expo start --android
expo start --ios
expo start --web

# プロジェクトリセット（サンプルコード削除）
npm run reset-project
```

## パッケージ

### UI Package (`packages/ui`)

Tamagui共有UIコンポーネントライブラリ

**特徴:**
- React 19対応
- TypeScript
- Web/Native両対応コンポーネント
- Tamagui設定とコンポーネント
- クロスプラットフォーム対応

**主要コンポーネント:**
- `TamaguiButton` - ボタンコンポーネント（variant対応）
- `TamaguiCard` - カードコンポーネント（title, description, footer対応）

**使用方法:**
```typescript
import { TamaguiButton, TamaguiCard } from '@repo/ui/button';
import { tamaguiConfig } from '@repo/ui';
```

**設定:**
- `config.ts` - Tamagui設定
- `index.ts` - エクスポート定義

### TypeScript Config (`packages/typescript-config`)

共有TypeScript設定

**提供される設定:**
- `base.json` - 基本設定
- `react-library.json` - Reactライブラリ用設定

**使用例:**
```json
// apps/web/tsconfig.json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": {
    "module": "ES2022",
    "moduleResolution": "bundler",
    "jsx": "react-jsx"
  }
}
```

## 依存関係管理

### バージョン固定

ルートの`package.json`でpnpm overridesを使用：

```json
{
  "pnpm": {
    "overrides": {
      "react": "19.0.0",
      "react-dom": "19.0.0",
      "@types/react": "19.0.10"
    }
  }
}
```

### エンジン要件

- Node.js: >= 24
- pnpm: 10.12.4（packageManagerで定義）

## 開発ワークフロー

### 新機能の追加

1. **新しいコンポーネント**
   - `packages/ui/src/`に作成
   - `packages/ui/src/index.ts`からexport
   - 必要に応じてプラットフォーム別実装

2. **アプリ固有のコード**
   - 各アプリの`src/`ディレクトリに配置
   - 共有可能な部分は`packages/ui`へ

3. **設定の追加**
   - TypeScript設定: `packages/typescript-config/`
   - 環境変数: 各アプリの`.env`ファイル

### コードスタイル

Biomeによる自動フォーマット：
- インデント: 2スペース
- 行幅: 100文字
- セミコロン: あり
- 末尾カンマ: あり
- クォート: ダブルクォート

### テスト戦略

#### Web App（React Router v7）
- **テストフレームワーク**: Vitest + React Testing Library
- **テストファイルの配置**: `src/__tests__/`または各コンポーネントと同じディレクトリ
- **テスト実行**:
  ```bash
  pnpm --filter web test        # 単発実行
  pnpm --filter web test:watch  # ウォッチモード
  ```

#### Native App（Expo）
- **テストフレームワーク**: Jest + React Native Testing Library
- **テスト実行**:
  ```bash
  pnpm --filter native test
  ```

#### API（Hono）
- **テストフレームワーク**: Vitest
- **統合テスト**: Hono Testing Helper使用
- **テスト実行**:
  ```bash
  pnpm --filter api test
  ```

#### 共通のテスト方針
1. **ユニットテスト**: 全ての重要なロジックをカバー
2. **統合テスト**: APIエンドポイントとデータベース操作
3. **E2Eテスト**: Playwright MCPを使用した重要なユーザーフロー
4. **カバレッジ目標**: 80%以上（重要な機能は100%）

## トラブルシューティング

### よくある問題

1. **依存関係の競合**
   ```bash
   pnpm install --force
   ```

2. **キャッシュの問題**
   ```bash
   turbo daemon clean
   pnpm store prune
   ```

3. **型エラー**
   ```bash
   pnpm check-types
   ```

4. **Native開発の問題**
   - iOS: Xcodeが最新であることを確認
   - Android: Android Studioの設定を確認
   - `expo doctor`を実行して環境をチェック

## パフォーマンス最適化

### Turborepoキャッシュ

- ローカルキャッシュは自動
- リモートキャッシュの設定（オプション）
- `--force`フラグでキャッシュを無視

### ビルド最適化

- 並列ビルドの活用
- 依存関係の最小化
- Tree shakingの活用

## デバッグ

### Chrome DevTools

- Web: 通常のDevTools
- Native: React Native Debugger使用推奨

### VS Code拡張機能

推奨拡張機能は`.vscode/extensions.json`で定義されています。