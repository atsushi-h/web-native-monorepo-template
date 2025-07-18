import { render, screen } from '@testing-library/react'
import { TamaguiProvider } from 'tamagui'
import { describe, expect, it } from 'vitest'
import tamaguiConfig from '../tamagui.config'
import { TamaguiCard } from '../tamagui-card'

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
)

describe('TamaguiCard', () => {
  it('renders with title and description', () => {
    render(
      <TestWrapper>
        <TamaguiCard title='Test Title' description='Test Description' />
      </TestWrapper>,
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('renders children content', () => {
    render(
      <TestWrapper>
        <TamaguiCard>
          <div>Child Content</div>
        </TamaguiCard>
      </TestWrapper>,
    )

    expect(screen.getByText('Child Content')).toBeInTheDocument()
  })

  it('renders footer when provided', () => {
    render(
      <TestWrapper>
        <TamaguiCard footer={<div>Footer Content</div>} />
      </TestWrapper>,
    )

    expect(screen.getByText('Footer Content')).toBeInTheDocument()
  })

  it('renders without title and description', () => {
    const { container } = render(
      <TestWrapper>
        <TamaguiCard>
          <div>Only Child Content</div>
        </TamaguiCard>
      </TestWrapper>,
    )

    expect(screen.getByText('Only Child Content')).toBeInTheDocument()
    expect(container.querySelector('h2')).not.toBeInTheDocument()
  })

  it('renders complex card with all props', () => {
    render(
      <TestWrapper>
        <TamaguiCard
          title='Complete Card'
          description='This card has everything'
          footer={<button type='button'>Action</button>}
        >
          <p>Main content area</p>
        </TamaguiCard>
      </TestWrapper>,
    )

    expect(screen.getByText('Complete Card')).toBeInTheDocument()
    expect(screen.getByText('This card has everything')).toBeInTheDocument()
    expect(screen.getByText('Main content area')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('passes through additional props', () => {
    render(
      <TestWrapper>
        <TamaguiCard data-testid='custom-card'>
          <div>Content</div>
        </TamaguiCard>
      </TestWrapper>,
    )

    expect(screen.getByTestId('custom-card')).toBeInTheDocument()
  })
})
