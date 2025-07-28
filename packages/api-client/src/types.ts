import type { AxiosError } from 'axios'

// キャンセル可能なPromise型定義
export interface CancellablePromise<T> extends Promise<T> {
  cancel?: () => void
}

// エラー型定義
export type ErrorType<Error> = AxiosError<Error>

// リクエストボディ型定義
export type BodyType<BodyData> = BodyData

// エラーハンドラー型定義
export type ErrorHandler = (error: AxiosError) => void

// 認証エラーハンドラー型定義
export type AuthErrorHandler = () => void

// サーバーエラーハンドラー型定義
export type ServerErrorHandler = (error: AxiosError) => void
