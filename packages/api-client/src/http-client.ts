import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { API_CONFIG, ERROR_STATUS, getDefaultApiUrl } from './constants'
import type { AuthErrorHandler, CancellablePromise, ServerErrorHandler } from './types'

// セキュアなAPI URL設定（本番環境でHTTP禁止）
const API_BASE_URL = process.env.VITE_API_BASE_URL || getDefaultApiUrl()

// URL検証（本番環境でHTTPを禁止）
if (process.env.NODE_ENV === 'production' && API_BASE_URL.startsWith('http://')) {
  throw new Error('本番環境ではHTTPSが必須です。HTTPSのURLを設定してください。')
}

// エラーハンドラーの設定（外部から設定可能）
let authErrorHandler: AuthErrorHandler | null = null
let serverErrorHandler: ServerErrorHandler | null = null

export const setAuthErrorHandler = (handler: AuthErrorHandler) => {
  authErrorHandler = handler
}

export const setServerErrorHandler = (handler: ServerErrorHandler) => {
  serverErrorHandler = handler
}

// Axiosインスタンスを作成
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// リクエストインターセプター（認証トークンなどを追加）
axiosInstance.interceptors.request.use(
  (config) => {
    // 認証トークンがある場合は追加
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// レスポンスインターセプター（強化されたエラーハンドリング）
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status

    if (status === ERROR_STATUS.UNAUTHORIZED) {
      // 認証エラー: トークンクリアとリダイレクト
      clearAuthToken()
      authErrorHandler?.()
    } else if (status && status >= ERROR_STATUS.SERVER_ERROR) {
      // サーバーエラー: ログ送信
      logServerError(error)
      serverErrorHandler?.(error)
    }

    return Promise.reject(error)
  },
)

// Orval用のカスタムインスタンス関数（型安全なキャンセル対応）
export const customAxiosInstance = <T>(config: AxiosRequestConfig): CancellablePromise<T> => {
  const source = axios.CancelToken.source()
  const promise = axiosInstance({
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data) as CancellablePromise<T>

  // React Queryのキャンセル対応（型安全）
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}

// 認証トークン管理（実装例）
function getAuthToken(): string | null {
  // TODO: 実際の認証トークン取得ロジックを実装
  // localStorage、sessionStorage、またはクッキーから取得
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

function clearAuthToken(): void {
  // TODO: 認証トークンのクリア処理を実装
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
  }
}

function logServerError(error: unknown): void {
  // TODO: サーバーエラーのログ送信を実装
  console.error('Server Error:', error)
  // 本番環境では適切なログサービスに送信
  // if (process.env.NODE_ENV === 'production') {
  //   sendErrorToLoggingService(error)
  // }
}

// 後方互換性のため、生成されたコード用に型を再エクスポート
export type { BodyType, ErrorType } from './types'
