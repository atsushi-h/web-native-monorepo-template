// APIクライアントのメインエクスポート

// 定数
export {
  API_CONFIG,
  CACHE_CONFIG,
  ERROR_STATUS,
} from './constants'
// 生成されたスキーマ型
export * from './generated/schemas'

// 生成されたAPIフック
export * from './generated/todos/todos'
// HTTP クライアント
export {
  axiosInstance,
  customAxiosInstance,
  setAuthErrorHandler,
  setServerErrorHandler,
} from './http-client'
// Query Client設定
export { createApiQueryClient, queryKeys } from './query-client'
// ストレージ抽象化
export { type Storage, setStorage } from './storage'
// 型定義
export type {
  AuthErrorHandler,
  BodyType,
  CancellablePromise,
  ErrorType,
  ServerErrorHandler,
} from './types'
