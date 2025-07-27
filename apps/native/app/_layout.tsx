import AsyncStorage from '@react-native-async-storage/async-storage'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { createApiQueryClient } from '@repo/api-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import 'react-native-reanimated'

import { tamaguiConfig } from '@repo/ui'
import { TamaguiProvider } from 'tamagui'
import { useColorScheme } from '@/hooks/useColorScheme'
import { useQueryClientSetup } from '@/utils/setupQueryClient'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  // QueryClient設定
  const [queryClient] = useState(() => createApiQueryClient())
  const [asyncStoragePersister] = useState(() =>
    createAsyncStoragePersister({
      storage: AsyncStorage,
    }),
  )

  // React Native固有の設定
  useQueryClientSetup()

  if (!loaded) {
    // Async font loading only occurs in development.
    return null
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: asyncStoragePersister }}
    >
      <TamaguiProvider config={tamaguiConfig}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='+not-found' />
          </Stack>
          <StatusBar style='auto' />
        </ThemeProvider>
      </TamaguiProvider>
    </PersistQueryClientProvider>
  )
}
