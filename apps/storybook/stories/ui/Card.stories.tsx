import type { Meta, StoryObj } from '@storybook/react'
import { Card } from '@repo/ui/card'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
    },
    href: {
      control: 'text',
      description: 'Link URL',
    },
    children: {
      control: 'text',
      description: 'Card content',
    },
    className: {
      control: 'text',
      description: 'CSS classes to apply',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Documentation',
    href: 'https://nextjs.org/docs',
    children: 'Find in-depth information about Next.js features and API.',
  },
}

export const Documentation: Story = {
  args: {
    title: 'Learn',
    href: 'https://nextjs.org/learn',
    children: 'Learn about Next.js in an interactive course with quizzes!',
    className: 'border border-gray-200 p-4 rounded-lg hover:bg-gray-50 transition-colors',
  },
}

export const Tutorial: Story = {
  args: {
    title: 'Templates',
    href: 'https://vercel.com/templates',
    children: 'Explore the Next.js 13 playground.',
    className: 'border border-blue-200 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors',
  },
}

export const API: Story = {
  args: {
    title: 'Deploy',
    href: 'https://vercel.com/new',
    children: 'Instantly deploy your Next.js site to a shareable URL with Vercel.',
    className: 'border border-green-200 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors',
  },
}