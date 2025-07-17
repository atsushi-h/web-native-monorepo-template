'use client'

import { tamaguiConfig } from '@repo/ui'
import { TamaguiProvider } from 'tamagui'

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
}
