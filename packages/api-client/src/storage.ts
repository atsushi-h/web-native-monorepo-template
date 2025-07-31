// クロスプラットフォーム対応のストレージ抽象化
export interface SyncStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export interface AsyncStorage {
  getItem(key: string): Promise<string | null>
  setItem(key: string, value: string): Promise<void>
  removeItem(key: string): Promise<void>
}

// ブラウザ環境の同期ストレージ
export const browserStorage: SyncStorage = {
  getItem: (key: string) => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      return localStorage.getItem(key)
    }
    return null
  },
  setItem: (key: string, value: string) => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value)
    }
  },
  removeItem: (key: string) => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem(key)
    }
  },
}

// デフォルトの同期ストレージ実装
let syncStorage: SyncStorage = browserStorage
let asyncStorage: AsyncStorage | null = null

// 同期ストレージ実装を設定
export const setSyncStorage = (customStorage: SyncStorage) => {
  syncStorage = customStorage
}

// 非同期ストレージ実装を設定
export const setAsyncStorage = (customStorage: AsyncStorage) => {
  asyncStorage = customStorage
}

// 同期ストレージAPIを取得
export const getSyncStorage = (): SyncStorage => syncStorage

// 非同期ストレージAPIを取得
export const getAsyncStorage = (): AsyncStorage | null => asyncStorage

// 非同期認証トークン管理用のヘルパー関数
export const getAuthTokenAsync = async (): Promise<string | null> => {
  const async = getAsyncStorage()
  if (async) {
    return await async.getItem('auth_token')
  }
  // フォールバックとして同期ストレージを使用
  return getSyncStorage().getItem('auth_token')
}

export const setAuthTokenAsync = async (token: string): Promise<void> => {
  const async = getAsyncStorage()
  if (async) {
    await async.setItem('auth_token', token)
  } else {
    getSyncStorage().setItem('auth_token', token)
  }
}

export const clearAuthTokenAsync = async (): Promise<void> => {
  const async = getAsyncStorage()
  if (async) {
    await async.removeItem('auth_token')
  } else {
    getSyncStorage().removeItem('auth_token')
  }
}
