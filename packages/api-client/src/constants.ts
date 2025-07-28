// APIクライアントの定数定義

// キャッシュ設定
export const CACHE_CONFIG = {
  STALE_TIME: 5 * 60 * 1000, // 5分
  GC_TIME: 10 * 60 * 1000, // 10分
} as const

// API設定
export const API_CONFIG = {
  TIMEOUT: 10000, // 10秒
  MAX_RETRIES: 3,
  MUTATION_RETRIES: 1,
} as const

// 環境別のデフォルトURL設定
export const getDefaultApiUrl = (): string => {
  if (process.env.NODE_ENV === 'production') {
    // 本番環境では必ずHTTPSを要求
    return 'https://api.yourdomain.com'
  }
  return 'http://localhost:8787'
}

// エラーステータスコード
export const ERROR_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const
