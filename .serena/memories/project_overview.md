# プロジェクト概要

**React Router v7 + Expo + Hono モノレポテンプレート**

## 目的
- モダンなフルスタック開発のためのTurborepoベースのモノレポテンプレート
- Web（React Router v7 SPA）、Native（Expo）、API（Hono）の同時開発が可能

## 技術スタック
- **Web App**: React Router v7 (SPA Mode)、Tamagui、React Native Web、Vite、Vitest
- **Native App**: Expo SDK 53、Expo Router、Tamagui
- **API**: Hono、Cloudflare Workers、Drizzle ORM、Cloudflare D1
- **共通**: TypeScript、Turborepo、pnpm、Biome

## パッケージ構成
- `@repo/ui` - Tamagui共有UIコンポーネント
- `@repo/features` - ビジネスロジックとカスタムフック
- `@repo/api-client` - TanStack QueryベースのAPIクライアント
- `@repo/typescript-config` - 共有TypeScript設定