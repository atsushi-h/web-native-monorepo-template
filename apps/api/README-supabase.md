# Supabase + Drizzle ORM セットアップガイド

## 概要
このAPIサーバーは、Supabase PostgreSQLデータベースとDrizzle ORMを使用してTodoリストのCRUD操作を提供します。

## セットアップ手順

### 1. Supabaseプロジェクトの作成
1. [Supabase](https://supabase.com/)でアカウントを作成
2. 新しいプロジェクトを作成
3. データベースパスワードを安全に保管

### 2. データベース接続情報の取得
1. Supabaseダッシュボード → Settings → Database
2. Connection string → Connection poolerタブを選択
3. "Transaction" modeを選択
4. Connection stringをコピー

### 3. 環境変数の設定

#### ローカル開発用（Wrangler）
```bash
# .dev.varsファイルを作成（Cloudflare Workers用）
echo 'DATABASE_URL="postgres://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@[REGION].pooler.supabase.com:5432/postgres"' > .dev.vars
```

#### マイグレーション用（Drizzle Kit）
```bash
# .envファイルを作成（Drizzle Kit用）
cp .env.example .env

# DATABASE_URLを設定
# postgres://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@[REGION].pooler.supabase.com:5432/postgres
```

### 4. マイグレーションの実行
```bash
# マイグレーションファイルを生成
pnpm db:generate

# マイグレーションを実行
pnpm db:migrate

# Drizzle Studioでデータベースを確認（オプション）
pnpm db:studio
```

### 5. 安全なマイグレーション方針
- **このプロジェクトでは`pnpm db:migrate`のみを使用**
- `db:push`は安全性の観点から禁止
- 全てのスキーマ変更はマイグレーションファイル経由で管理
- 開発・ステージング・本番環境で同一の方法を使用

### 6. マイグレーションファイルの管理
- **生成されたマイグレーションファイル**（`drizzle/`フォルダ内）は**Gitで管理します**
- チーム開発では、スキーマ変更時に必ずマイグレーションファイルをコミット
- 本番環境では`pnpm db:migrate`でマイグレーションを適用

### 7. Drizzle Studioの使用
```bash
# データベース管理UIを起動
pnpm db:studio
# ブラウザで https://local.drizzle.studio にアクセス
```

**Drizzle Studioでできること：**
- テーブル構造とデータの確認
- レコードの追加・編集・削除
- SQLクエリの実行
- リレーションの可視化

## API エンドポイント

### Todo CRUD操作
- `GET /api/todos` - 全てのTodoを取得
- `GET /api/todos/:id` - 特定のTodoを取得
- `POST /api/todos` - 新しいTodoを作成
- `PUT /api/todos/:id` - Todoを更新
- `DELETE /api/todos/:id` - Todoを削除

### リクエスト例

#### Todo作成
```bash
curl -X POST http://localhost:8787/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "買い物に行く", "completed": false}'
```

#### Todo一覧取得
```bash
curl http://localhost:8787/api/todos
```

#### Todo更新
```bash
curl -X PUT http://localhost:8787/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

## スキーマ定義

```typescript
// src/db/schema.ts
export const todosTable = pgTable('todos', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  completed: boolean('completed').default(false).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().$onUpdate(() => new Date()),
})
```

## 注意事項

1. **Connection Pooler**: Supabaseの接続プーラーを使用する場合、`prepare: false`オプションが必要です
2. **環境変数**: `DATABASE_URL`は必ずバックエンドのみで管理し、フロントエンドに露出させないでください
3. **CORS設定**: `CORS_ORIGINS`環境変数で許可するオリジンを設定してください

## トラブルシューティング

### データベース接続エラー
- DATABASE_URLが正しく設定されているか確認
- Supabaseプロジェクトがアクティブか確認
- Connection poolerの設定を確認

### マイグレーションエラー
- Connection Poolerで問題が発生する場合は、Direct Connection URLを使用
  ```bash
  # 直接接続の場合（通常は不要）
  DATABASE_URL="postgres://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" pnpm db:migrate
  ```

## npmスクリプト一覧

| コマンド | 説明 |
| --- | --- |
| `pnpm db:generate` | マイグレーションファイルを生成 |
| `pnpm db:migrate` | マイグレーションを実行 |
| `pnpm db:studio` | Drizzle Studioを起動（データベース管理UI - https://local.drizzle.studio） |

## Hono RPC使用方法

このAPIはHono RPCに対応しており、フロントエンドで型安全なAPIコールが可能です。

### フロントエンド側でのセットアップ

```typescript
// api-client.ts
import { hc } from 'hono/client'
import type { AppType } from '@repo/api/src/app'

const client = hc<AppType>('http://localhost:8787')

// 型安全なAPIコール
export const api = {
  todos: {
    // GET /api/todos
    getAll: () => client.api.todos.$get(),
    
    // GET /api/todos/:id
    getById: (id: number) => client.api.todos[':id'].$get({ param: { id: id.toString() } }),
    
    // POST /api/todos
    create: (data: { title: string; completed?: boolean }) => 
      client.api.todos.$post({ json: data }),
    
    // PUT /api/todos/:id
    update: (id: number, data: { title?: string; completed?: boolean }) =>
      client.api.todos[':id'].$put({ param: { id: id.toString() }, json: data }),
    
    // DELETE /api/todos/:id
    delete: (id: number) => 
      client.api.todos[':id'].$delete({ param: { id: id.toString() } }),
  },
}
```

### 使用例

```typescript
// コンポーネント内で使用
const handleCreateTodo = async () => {
  const response = await api.todos.create({
    title: '新しいタスク',
    completed: false
  })
  
  if (response.ok) {
    const todo = await response.json()
    console.log('作成されたTodo:', todo)
  }
}

const handleUpdateTodo = async (id: number) => {
  const response = await api.todos.update(id, {
    completed: true
  })
  
  if (response.ok) {
    const updatedTodo = await response.json()
    console.log('更新されたTodo:', updatedTodo)
  }
}
```