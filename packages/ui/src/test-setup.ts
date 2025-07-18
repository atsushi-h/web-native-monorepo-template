import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.matchMedia for Tamagui
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock Tamagui's getTokens function for tests
vi.mock('@tamagui/core', async () => {
  const actual = await vi.importActual('@tamagui/core')
  return {
    ...actual,
    getTokens: () => ({
      size: {
        small: 32,
        medium: 40,
        large: 48,
      },
      space: {
        1: 4,
        2: 8,
        3: 12,
        4: 16,
      },
      color: {
        primary: '#007AFF',
        secondary: '#8E8E93',
      },
    }),
  }
})

// Mock animations for testing
vi.mock('@tamagui/animations-react-native', () => ({
  createAnimations: () => ({}),
}))
