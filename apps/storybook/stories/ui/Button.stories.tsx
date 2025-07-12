import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@repo/ui/button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Button content',
    },
    appName: {
      control: 'text',
      description: 'App name for the alert message',
    },
    className: {
      control: 'text',
      description: 'CSS classes to apply',
    },
  },
  args: {
    appName: 'Storybook',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    className: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600',
  },
}

export const Large: Story = {
  args: {
    children: 'Large Button',
    className: 'bg-green-500 text-white px-6 py-3 text-lg rounded hover:bg-green-600',
  },
}