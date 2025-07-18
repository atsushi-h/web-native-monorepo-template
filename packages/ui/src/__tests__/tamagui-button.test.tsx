import { fireEvent, render, screen } from '@testing-library/react'
import { TamaguiProvider } from 'tamagui'
import { describe, expect, it, vi } from 'vitest'
import tamaguiConfig from '../tamagui.config'
import { TamaguiButton } from '../tamagui-button'

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
)

describe('TamaguiButton', () => {
  it('renders with default props', () => {
    render(
      <TestWrapper>
        <TamaguiButton>Default Button</TamaguiButton>
      </TestWrapper>,
    )

    expect(screen.getByText('Default Button')).toBeInTheDocument()
  })

  it('renders with primary variant', () => {
    render(
      <TestWrapper>
        <TamaguiButton variant='primary'>Primary Button</TamaguiButton>
      </TestWrapper>,
    )

    expect(screen.getByText('Primary Button')).toBeInTheDocument()
  })

  it('renders with secondary variant', () => {
    render(
      <TestWrapper>
        <TamaguiButton variant='secondary'>Secondary Button</TamaguiButton>
      </TestWrapper>,
    )

    expect(screen.getByText('Secondary Button')).toBeInTheDocument()
  })

  it('renders with ghost variant', () => {
    render(
      <TestWrapper>
        <TamaguiButton variant='ghost'>Ghost Button</TamaguiButton>
      </TestWrapper>,
    )

    expect(screen.getByText('Ghost Button')).toBeInTheDocument()
  })

  it('handles custom size prop', () => {
    render(
      <TestWrapper>
        <TamaguiButton customSize='large'>Large Button</TamaguiButton>
      </TestWrapper>,
    )

    expect(screen.getByText('Large Button')).toBeInTheDocument()
  })

  it('calls onPress when clicked', () => {
    const onPressMock = vi.fn()

    render(
      <TestWrapper>
        <TamaguiButton onPress={onPressMock}>Clickable Button</TamaguiButton>
      </TestWrapper>,
    )

    fireEvent.click(screen.getByText('Clickable Button'))
    expect(onPressMock).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    const onPressMock = vi.fn()

    render(
      <TestWrapper>
        <TamaguiButton onPress={onPressMock} disabled>
          Disabled Button
        </TamaguiButton>
      </TestWrapper>,
    )

    const button = screen.getByText('Disabled Button')
    fireEvent.click(button)
    expect(onPressMock).not.toHaveBeenCalled()
  })
})
