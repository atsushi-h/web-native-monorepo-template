import NetInfo from '@react-native-community/netinfo'
import { focusManager, onlineManager } from '@tanstack/react-query'
import { useEffect } from 'react'
import type { AppStateStatus } from 'react-native'
import { AppState, Platform } from 'react-native'

/**
 * React Nativeでのネットワーク状態管理を設定
 */
export function setupOnlineManager() {
  // NetInfoを使用してオンライン状態を管理
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected)
    })
  })
}

/**
 * React Nativeでのアプリフォーカス管理を設定
 */
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

export function setupFocusManager() {
  const subscription = AppState.addEventListener('change', onAppStateChange)
  return () => subscription.remove()
}

/**
 * React Native用QueryClient設定フック
 */
export function useQueryClientSetup() {
  useEffect(() => {
    // オンライン管理をセットアップ
    setupOnlineManager()

    // フォーカス管理をセットアップ
    const cleanup = setupFocusManager()

    return cleanup
  }, [])
}
