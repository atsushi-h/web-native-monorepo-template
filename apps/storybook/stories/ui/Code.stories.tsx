import type { Meta, StoryObj } from '@storybook/react'
import { Code } from '@repo/ui/code'

const meta: Meta<typeof Code> = {
  title: 'UI/Code',
  component: Code,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Code content',
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
    children: 'console.log("Hello World")',
  },
}

export const JavaScript: Story = {
  args: {
    children: 'const message = "Hello from JavaScript"',
    className: 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-mono text-sm',
  },
}

export const TypeScript: Story = {
  args: {
    children: 'interface User { name: string; age: number }',
    className: 'bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono text-sm',
  },
}

export const Command: Story = {
  args: {
    children: 'npm install @storybook/react',
    className: 'bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono text-sm border',
  },
}

export const MultiLine: Story = {
  args: {
    children: `function greet(name: string) {
  return \`Hello, \${name}!\`;
}`,
    className: 'bg-green-100 text-green-800 px-3 py-2 rounded font-mono text-sm whitespace-pre-line',
  },
}

export const Inline: Story = {
  args: {
    children: 'useState',
    className: 'bg-purple-100 text-purple-800 px-1 rounded font-mono text-xs',
  },
}