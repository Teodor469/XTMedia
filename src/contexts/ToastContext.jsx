import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

// Toast types
// eslint-disable-next-line react-refresh/only-export-components
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error', 
  WARNING: 'warning',
  INFO: 'info'
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  // Remove a specific toast
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  // Add a new toast
  const addToast = useCallback((message, type = TOAST_TYPES.INFO, duration = 5000) => {
    const id = Date.now() + Math.random()
    const toast = {
      id,
      message,
      type,
      duration,
      timestamp: Date.now()
    }

    setToasts(prev => [...prev, toast])

    // Auto remove toast after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }, [removeToast])

  // Remove all toasts
  const clearToasts = useCallback(() => {
    setToasts([])
  }, [])

  // Convenience methods
  const success = useCallback((message, duration) => {
    return addToast(message, TOAST_TYPES.SUCCESS, duration)
  }, [addToast])

  const error = useCallback((message, duration = 7000) => {
    return addToast(message, TOAST_TYPES.ERROR, duration)
  }, [addToast])

  const warning = useCallback((message, duration = 6000) => {
    return addToast(message, TOAST_TYPES.WARNING, duration)
  }, [addToast])

  const info = useCallback((message, duration) => {
    return addToast(message, TOAST_TYPES.INFO, duration)
  }, [addToast])

  const value = {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  )
}

// Hook to use toast notifications
// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export default ToastContext