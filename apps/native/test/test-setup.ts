import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Global test environment setup
global.__DEV__ = true

// Mock window.matchMedia for React Native Web
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock ResizeObserver for modern web APIs
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}))

// Mock Tamagui core functionality
vi.mock('@tamagui/core', () => ({
  getTokens: () => ({
    size: { small: 32, medium: 40, large: 48 },
    space: { 1: 4, 2: 8, 3: 12, 4: 16 },
    color: { primary: '#007AFF', secondary: '#8E8E93' },
  }),
  styled: () => () => ({ displayName: 'MockedStyledComponent' }),
  Stack: 'View',
  Text: 'Text',
  YStack: 'View',
  XStack: 'View',
  Button: 'Pressable',
  Input: 'TextInput',
}))

vi.mock('@tamagui/animations-react-native', () => ({
  createAnimations: () => ({}),
}))

// Mock Expo modules with proper defaults
vi.mock('expo-constants', () => ({
  default: {
    name: 'TestApp',
    slug: 'test-app',
    version: '1.0.0',
    executionEnvironment: 'standalone',
    platform: {
      ios: { platform: 'ios' },
      android: { platform: 'android' },
      web: { platform: 'web' },
    },
  },
}))

vi.mock('expo-font', () => ({
  isLoaded: () => true,
  loadAsync: () => Promise.resolve(),
  isLoadingAsync: () => Promise.resolve(false),
  unloadAsync: () => Promise.resolve(),
}))

vi.mock('expo-haptics', () => ({
  impactAsync: () => Promise.resolve(),
  notificationAsync: () => Promise.resolve(),
  selectionAsync: () => Promise.resolve(),
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
}))

vi.mock('expo-status-bar', () => ({
  StatusBar: ({ children }: { children?: React.ReactNode }) => children,
  setStatusBarStyle: vi.fn(),
  setStatusBarBackgroundColor: vi.fn(),
}))

// Mock React Navigation with proper types
vi.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: vi.fn(),
    goBack: vi.fn(),
    dispatch: vi.fn(),
    reset: vi.fn(),
    canGoBack: () => false,
    isFocused: () => true,
  }),
  useRoute: () => ({
    params: {},
    name: 'Test',
    key: 'test-key',
  }),
  useFocusEffect: vi.fn(),
  NavigationContainer: ({ children }) => children,
}))

// Enhanced react-native-reanimated mock
vi.mock('react-native-reanimated', async () => {
  const _React = await import('react')
  const { View, Text, ScrollView } = await import('react-native')

  return {
    default: {
      View,
      Text,
      ScrollView,
      createAnimatedComponent: (component) => component,
      interpolate: () => 0,
      Extrapolate: { CLAMP: 'clamp', EXTEND: 'extend', IDENTITY: 'identity' },
    },
    useSharedValue: (initial) => ({ value: initial }),
    useAnimatedStyle: (cb) => cb(),
    withTiming: (value) => value,
    withSpring: (value) => value,
    withRepeat: (value) => value,
    withSequence: (value) => value,
    withDelay: (_delay, value) => value,
    runOnJS: (fn) => fn,
    runOnUI: (fn) => fn,
    useAnimatedRef: () => ({ current: null }),
    useFrameCallback: vi.fn(),
    useDerivedValue: (cb) => ({ value: cb() }),
    interpolateColor: () => '#000000',
  }
})

// Mock react-native-gesture-handler
vi.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: ({ children }) => children,
  PanGestureHandler: ({ children }) => children,
  TapGestureHandler: ({ children }) => children,
  State: {
    UNDETERMINED: 0,
    FAILED: 1,
    BEGAN: 2,
    CANCELLED: 3,
    ACTIVE: 4,
    END: 5,
  },
  Directions: {
    RIGHT: 1,
    LEFT: 2,
    UP: 4,
    DOWN: 8,
  },
}))

// Mock Dimensions API
vi.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: vi.fn(() => ({ width: 375, height: 667, scale: 2, fontScale: 1 })),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
}))

// Mock PixelRatio
vi.mock('react-native/Libraries/Utilities/PixelRatio', () => ({
  get: () => 2,
  getFontScale: () => 1,
  getPixelSizeForLayoutSize: (layoutSize) => layoutSize * 2,
  roundToNearestPixel: (layoutSize) => Math.round(layoutSize),
}))

// Mock app-specific hooks
vi.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: () => '#000000',
}))

vi.mock('@/hooks/useColorScheme', () => ({
  useColorScheme: () => 'light',
}))
