import { createApiQueryClient } from '@repo/api-client'
import { QueryClientProvider } from '@repo/features'
import { tamaguiConfig } from '@repo/ui'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import { TamaguiProvider } from 'tamagui'

import type { Route } from './+types/root'
import './app.css'

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
]

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

function ClientProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => createApiQueryClient())

  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        console.error('Provider Error:', error)
      }}
    >
      <QueryClientProvider client={queryClient}>
        <TamaguiProvider config={tamaguiConfig}>
          {children}
          {import.meta.env.DEV && <ReactQueryDevtools />}
        </TamaguiProvider>
      </QueryClientProvider>
    </ReactErrorBoundary>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}
