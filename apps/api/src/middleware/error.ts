import type { ErrorHandler } from 'hono'
import type { Env } from '../app'

export const errorHandler: ErrorHandler<{ Bindings: Env }> = (err, c) => {
  console.error('Error:', err)

  // 開発環境かどうかを判定
  const isDev =
    c.env?.NODE_ENV === 'development' || c.env?.NODE_ENV === 'dev' || c.env?.NODE_ENV === 'test'

  // 本番環境では詳細なエラー情報を隠す
  return c.json(
    {
      error: 'Internal Server Error',
      message: isDev ? err.message : 'Something went wrong',
      ...(isDev && { stack: err.stack }), // 開発環境のみスタックトレースを含める
    },
    500,
  )
}
