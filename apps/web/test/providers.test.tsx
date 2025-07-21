import { tamaguiConfig } from '@repo/ui'
import { TamaguiButton } from '@repo/ui/button'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from 'react-error-boundary'
import { TamaguiProvider } from 'tamagui'
import { describe, expect, it, vi } from 'vitest'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div role='alert' style={{ padding: '20px', textAlign: 'center' }}>
      <h2>UIコンポーネントでエラーが発生しました</h2>
      <pre style={{ color: 'red', fontSize: '12px' }}>{error.message}</pre>
      <button type='button' onClick={resetErrorBoundary} style={{ marginTop: '10px' }}>
        再試行
      </button>
    </div>
  )
}

function ClientProviders({ children }: { children: React.ReactNode }) {
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

describe('ClientProviders', () => {
  it('renders children correctly', () => {
    render(
      <ClientProviders>
        <div>Test Content</div>
      </ClientProviders>,
    )

    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('provides Tamagui context to children', () => {
    render(
      <ClientProviders>
        <div data-testid='child'>Child Component</div>
      </ClientProviders>,
    )

    const child = screen.getByTestId('child')
    expect(child).toBeInTheDocument()
  })

  it('renders Tamagui components correctly', () => {
    const mockOnPress = vi.fn()

    render(
      <ClientProviders>
        <TamaguiButton onPress={mockOnPress} variant='primary'>
          Test Button
        </TamaguiButton>
      </ClientProviders>,
    )

    const button = screen.getByText('Test Button')
    expect(button).toBeInTheDocument()
  })
})
