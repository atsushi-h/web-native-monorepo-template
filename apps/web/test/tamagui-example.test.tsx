import { tamaguiConfig } from '@repo/ui'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TamaguiProvider } from 'tamagui'
import { describe, expect, it } from 'vitest'
import TamaguiExample from '../app/routes/tamagui-example'

function TestWrapper({ children }: { children: React.ReactNode }) {
  return <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
}

describe('Tamagui Example Page', () => {
  it('renders page title', () => {
    render(
      <TestWrapper>
        <TamaguiExample />
      </TestWrapper>,
    )

    expect(screen.getByText('Tamagui Example')).toBeInTheDocument()
  })

  it('renders welcome card with title and description', () => {
    render(
      <TestWrapper>
        <TamaguiExample />
      </TestWrapper>,
    )

    expect(screen.getByText('Welcome to Tamagui')).toBeInTheDocument()
    expect(
      screen.getByText('This is a cross-platform UI component that works on both web and native!'),
    ).toBeInTheDocument()
  })

  it('renders all button variants', () => {
    render(
      <TestWrapper>
        <TamaguiExample />
      </TestWrapper>,
    )

    expect(screen.getByText('Primary Button')).toBeInTheDocument()
    expect(screen.getByText('Secondary Button')).toBeInTheDocument()
    expect(screen.getByText('Small Ghost Button')).toBeInTheDocument()
    expect(screen.getByText('Large Button')).toBeInTheDocument()
  })

  it('displays message when button is clicked', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <TamaguiExample />
      </TestWrapper>,
    )

    const primaryButton = screen.getByText('Primary Button')
    await user.click(primaryButton)

    expect(screen.getByText('Primary button was pressed!')).toBeInTheDocument()
  })

  it('updates message when different buttons are clicked', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <TamaguiExample />
      </TestWrapper>,
    )

    // Click secondary button
    const secondaryButton = screen.getByText('Secondary Button')
    await user.click(secondaryButton)
    expect(screen.getByText('Secondary button was pressed!')).toBeInTheDocument()

    // Click large button
    const largeButton = screen.getByText('Large Button')
    await user.click(largeButton)
    expect(screen.getByText('Large button was pressed!')).toBeInTheDocument()

    // Click small ghost button
    const smallGhostButton = screen.getByText('Small Ghost Button')
    await user.click(smallGhostButton)
    expect(screen.getByText('Small ghost button was pressed!')).toBeInTheDocument()
  })

  it('shows message container when there is a message', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <TamaguiExample />
      </TestWrapper>,
    )

    // Initially no message container should be visible
    expect(screen.queryByText(/button was pressed!/)).not.toBeInTheDocument()

    // Click a button to show message
    const primaryButton = screen.getByText('Primary Button')
    await user.click(primaryButton)

    // Message container should now be visible
    const messageContainer = screen.getByText('Primary button was pressed!').parentElement
    expect(messageContainer).toBeInTheDocument()
    expect(messageContainer).toHaveStyle({
      padding: '16px', // Tamagui applies 16px padding instead of 12px
    })
  })
})
