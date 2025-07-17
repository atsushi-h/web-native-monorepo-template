// React 19 compatibility shim for react-native-web
// This polyfill is only applied in development or when explicitly needed

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  // Use a more specific namespace to avoid conflicts
  const POLYFILL_KEY = '__TAMAGUI_REACT_DOM_POLYFILL__'
  
  if (!window[POLYFILL_KEY]) {
    try {
      const ReactDOM = require('react-dom')
      
      // Only add polyfill if it doesn't exist and we're in a safe environment
      if (!ReactDOM.unmountComponentAtNode && typeof ReactDOM === 'object') {
        ReactDOM.unmountComponentAtNode = (container) => {
          try {
            if (container && container._reactRootContainer) {
              container._reactRootContainer.unmount()
              delete container._reactRootContainer
              return true
            }
            return false
          } catch (error) {
            console.warn('React DOM unmount polyfill error:', error)
            return false
          }
        }
        
        window[POLYFILL_KEY] = true
        console.log('React DOM unmount polyfill applied for Tamagui compatibility')
      }
    } catch (error) {
      console.warn('Failed to apply React DOM polyfill:', error)
    }
  }
}