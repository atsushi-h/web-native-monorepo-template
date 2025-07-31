// クロスプラットフォーム対応のストレージ抽象化
export interface Storage {
  getItem(key: string): string | null | Promise<string | null>
  setItem(key: string, value: string): void | Promise<void>
  removeItem(key: string): void | Promise<void>
}

// ブラウザ環境のストレージ
export const browserStorage: Storage = {
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

// デフォルトのストレージ実装
let storage: Storage = browserStorage

// ストレージ実装を設定
export const setStorage = (customStorage: Storage) => {
  storage = customStorage
}

// ストレージAPIを取得
export const getStorage = (): Storage => storage
