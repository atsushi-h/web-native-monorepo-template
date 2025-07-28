import { QueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { API_CONFIG, CACHE_CONFIG, ERROR_STATUS } from './constants'

// デフォルトのQueryClient設定を作成する関数
export function createApiQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // サーバーサイドレンダリング対応のため、定数で設定
        staleTime: CACHE_CONFIG.STALE_TIME,
        // エラー時のリトライ設定
        retry: (failureCount, error: unknown) => {
          // ネットワークエラーは設定回数まで、4xx/5xxエラーはリトライしない
          const axiosError = error as AxiosError
          if (
            axiosError?.response?.status &&
            axiosError.response.status >= ERROR_STATUS.NOT_FOUND
          ) {
            return false
          }
          return failureCount < API_CONFIG.MAX_RETRIES
        },
        // リフェッチ設定
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        // ガベージコレクション（キャッシュ保持時間）
        gcTime: CACHE_CONFIG.GC_TIME,
      },
      mutations: {
        // ミューテーション失敗時のリトライ設定
        retry: (failureCount, error: unknown) => {
          // 4xx/5xxエラーはリトライしない
          const axiosError = error as AxiosError
          if (
            axiosError?.response?.status &&
            axiosError.response.status >= ERROR_STATUS.NOT_FOUND
          ) {
            return false
          }
          return failureCount < API_CONFIG.MUTATION_RETRIES
        },
      },
    },
  })
}

// 共通のクエリキー生成ヘルパー
export const queryKeys = {
  todos: {
    all: ['todos'] as const,
    lists: () => [...queryKeys.todos.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.todos.lists(), filters] as const,
    details: () => [...queryKeys.todos.all, 'detail'] as const,
    detail: (id: string | number) => [...queryKeys.todos.details(), id] as const,
  },
} as const
