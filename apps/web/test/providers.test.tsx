import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ClientProviders } from '../app/providers'

describe('ClientProviders', () => {
  it('renders children correctly', () => {
    render(
      <ClientProviders>
        <div>Test Content</div>
      </ClientProviders>
    )
    
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('provides Tamagui context to children', () => {
    render(
      <ClientProviders>
        <div data-testid="child">Child Component</div>
      </ClientProviders>
    )
    
    const child = screen.getByTestId('child')
    expect(child).toBeInTheDocument()
  })
})