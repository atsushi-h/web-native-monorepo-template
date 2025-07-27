import { QueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'

// デフォルトのQueryClient設定を作成する関数
export function createApiQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // サーバーサイドレンダリング対応のため、5分のstaleTimeを設定
        staleTime: 5 * 60 * 1000, // 5分
        // エラー時のリトライ設定
        retry: (failureCount, error: unknown) => {
          // ネットワークエラーは3回まで、4xx/5xxエラーはリトライしない
          const axiosError = error as AxiosError
          if (axiosError?.response?.status && axiosError.response.status >= 400) {
            return false
          }
          return failureCount < 3
        },
        // リフェッチ設定
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        // ガベージコレクション（キャッシュ保持時間）
        gcTime: 10 * 60 * 1000, // 10分
      },
      mutations: {
        // ミューテーション失敗時のリトライ設定
        retry: (failureCount, error: unknown) => {
          // 4xx/5xxエラーはリトライしない
          const axiosError = error as AxiosError
          if (axiosError?.response?.status && axiosError.response.status >= 400) {
            return false
          }
          return failureCount < 1
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
