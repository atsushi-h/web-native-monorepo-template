'use client'

import { tamaguiConfig } from '@repo/ui'
import type { ReactNode } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { TamaguiProvider } from 'tamagui'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div role='alert' style={{ padding: '20px', textAlign: 'center' }}>
      <h2>UIコンポーネントでエラーが発生しました</h2>
      <pre style={{ color: 'red', fontSize: '12px' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary} style={{ marginTop: '10px' }}>
        再試行
      </button>
    </div>
  )
}

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        console.error('Tamagui Provider Error:', error)
      }}
    >
      <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
    </ErrorBoundary>
  )
}
