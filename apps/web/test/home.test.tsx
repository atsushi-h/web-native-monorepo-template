import { tamaguiConfig } from '@repo/ui'
import { render, screen } from '@testing-library/react'
import { TamaguiProvider } from 'tamagui'
import { describe, expect, it } from 'vitest'
import Home from '../app/routes/home'

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
}

describe('Home Page', () => {
  it('renders hello world text', () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>,
    )

    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('has main element', () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>,
    )

    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })

  it('has link to tamagui example', () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>,
    )

    const link = screen.getByText('View Tamagui Example')
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/tamagui-example')
  })
})
