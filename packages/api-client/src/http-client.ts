import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'

// 環境変数またはデフォルト値
const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8787'

// Axiosインスタンスを作成
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// リクエストインターセプター（認証トークンなどを追加）
axiosInstance.interceptors.request.use(
  (config) => {
    // TODO: 認証トークンがある場合は追加
    // const token = getAuthToken()
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// レスポンスインターセプター（エラーハンドリング）
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // TODO: グローバルエラーハンドリング
    // if (error.response?.status === 401) {
    //   // 認証エラーの処理
    // }
    return Promise.reject(error)
  },
)

// Orval用のカスタムインスタンス関数
export const customAxiosInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = axios.CancelToken.source()
  const promise = axiosInstance({
    ...config,
    cancelToken: source.token,
  }).then(({ data }) => data)

  // React Queryのキャンセル対応
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled')
  }

  return promise
}

// エラー型定義
export type ErrorType<Error> = AxiosError<Error>

// リクエストボディ型定義
export type BodyType<BodyData> = BodyData
