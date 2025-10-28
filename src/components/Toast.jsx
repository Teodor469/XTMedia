import { useEffect, useState } from 'react'
import { useToast, TOAST_TYPES } from '../contexts/ToastContext'
import './Toast.css'

const Toast = ({ toast }) => {
  const { removeToast } = useToast()
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      removeToast(toast.id)
    }, 300) // Match exit animation duration
  }

  const getToastIcon = (type) => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return '✅'
      case TOAST_TYPES.ERROR:
        return '❌'
      case TOAST_TYPES.WARNING:
        return '⚠️'
      case TOAST_TYPES.INFO:
      default:
        return 'ℹ️'
    }
  }

  const getToastClass = (type) => {
    switch (type) {
      case TOAST_TYPES.SUCCESS:
        return 'toast-success'
      case TOAST_TYPES.ERROR:
        return 'toast-error'
      case TOAST_TYPES.WARNING:
        return 'toast-warning'
      case TOAST_TYPES.INFO:
      default:
        return 'toast-info'
    }
  }

  return (
    <div 
      className={`toast ${getToastClass(toast.type)} ${isVisible ? 'toast-visible' : ''} ${isExiting ? 'toast-exiting' : ''}`}
      onClick={handleClose}
    >
      <div className="toast-content">
        <span className="toast-icon">{getToastIcon(toast.type)}</span>
        <span className="toast-message">{toast.message}</span>
        <button 
          className="toast-close"
          onClick={(e) => {
            e.stopPropagation()
            handleClose()
          }}
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

const ToastContainer = () => {
  const { toasts } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  )
}

export default ToastContainer