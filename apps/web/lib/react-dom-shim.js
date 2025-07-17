// React 19 compatibility shim for react-native-web
import { createRoot } from 'react-dom/client'

// Create unmountComponentAtNode polyfill for React 19
if (typeof window !== 'undefined' && !window.__REACT_DOM_UNMOUNT_POLYFILL__) {
  const originalReactDOM = require('react-dom')
  
  if (!originalReactDOM.unmountComponentAtNode) {
    originalReactDOM.unmountComponentAtNode = (container) => {
      if (container._reactRootContainer) {
        container._reactRootContainer.unmount()
        delete container._reactRootContainer
        return true
      }
      return false
    }
  }
  
  window.__REACT_DOM_UNMOUNT_POLYFILL__ = true
}