import { Component } from 'react'
import { useTranslation } from 'react-i18next'
import './ErrorBoundary.css'

class ErrorBoundaryClass extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    })

    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }

    // In production, you could send this to an error reporting service
    // Example: errorReportingService.report(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback 
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onRetry={() => this.setState({ hasError: false, error: null, errorInfo: null })}
          {...this.props}
        />
      )
    }

    return this.props.children
  }
}

// Error fallback component
const ErrorFallback = ({ error, errorInfo, onRetry, fallbackMessage, showDetails = false }) => {
  const { t } = useTranslation()

  const isShopifyError = error?.message?.includes('shopify') || 
                        error?.message?.includes('Storefront') ||
                        error?.message?.includes('fetch')

  return (
    <div className="error-boundary">
      <div className="error-boundary-content">
        <div className="error-icon">⚠️</div>
        <h2 className="error-title">
          {fallbackMessage || (isShopifyError ? t('errors.shopify.title') : t('errors.generic.title'))}
        </h2>
        <p className="error-message">
          {isShopifyError ? t('errors.shopify.message') : t('errors.generic.message')}
        </p>
        
        {showDetails && error && (
          <details className="error-details">
            <summary>Technical Details</summary>
            <pre className="error-stack">
              {error.toString()}
              {errorInfo?.componentStack}
            </pre>
          </details>
        )}
        
        <div className="error-actions">
          <button 
            onClick={onRetry}
            className="btn-primary error-retry"
          >
            {t('errors.actions.retry')}
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="btn-secondary error-reload"
          >
            {t('errors.actions.reload')}
          </button>
        </div>
      </div>
    </div>
  )
}

// Shopify-specific error boundary
export const ShopifyErrorBoundary = ({ children, fallbackMessage }) => (
  <ErrorBoundaryClass fallbackMessage={fallbackMessage} showDetails={import.meta.env.DEV}>
    {children}
  </ErrorBoundaryClass>
)

// General error boundary
export const ErrorBoundary = ({ children, fallbackMessage, showDetails }) => (
  <ErrorBoundaryClass fallbackMessage={fallbackMessage} showDetails={showDetails}>
    {children}
  </ErrorBoundaryClass>
)

export default ErrorBoundary