// Sentry Error Logging and Performance Monitoring Service
import * as Sentry from '@sentry/react'
import React from 'react'

class SentryService {
  static init() {
    const dsn = import.meta.env.VITE_SENTRY_DSN
    const environment = import.meta.env.MODE
    
    if (!dsn) {
      console.warn('Sentry DSN not configured. Error logging will not be available.')
      return
    }

    Sentry.init({
      dsn: dsn,
      environment: environment,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration({
          // Session replay for debugging
          maskAllText: true,
          blockAllMedia: true,
        })
      ],
      
      // Performance monitoring
      tracesSampleRate: environment === 'production' ? 0.1 : 1.0,
      
      // Session replay
      replaysSessionSampleRate: environment === 'production' ? 0.01 : 0.1,
      replaysOnErrorSampleRate: 1.0,
      
      // Release tracking
      release: import.meta.env.VITE_APP_VERSION || '1.0.0',
      
      // Error filtering
      beforeSend(event, _hint) {
        // Filter out non-critical errors in production
        if (environment === 'production') {
          // Filter out network errors that aren't actionable
          if (event.exception?.values?.[0]?.type === 'NetworkError') {
            return null
          }
          
          // Filter out quota exceeded errors
          if (event.message?.includes('QuotaExceededError')) {
            return null
          }
        }
        
        return event
      },
      
      // Additional configuration
      autoSessionTracking: true,
      sendDefaultPii: false, // Don't send personally identifiable information
      
      // Configure which URLs to trace
      tracePropagationTargets: [
        'localhost',
        /^https:\/\/api\.yourstore\.com\/api/,
        /^https:\/\/.*\.myshopify\.com/
      ],
    })

    // Set up user context
    Sentry.setContext('app', {
      name: 'XT Media',
      version: import.meta.env.VITE_APP_VERSION || '1.0.0',
      build: import.meta.env.VITE_BUILD_NUMBER || 'unknown'
    })

    console.log('Sentry initialized for error logging and performance monitoring')
  }

  // Set user information
  static setUser(user) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.username,
      // Don't include sensitive information
    })
  }

  // Set custom context
  static setContext(key, context) {
    Sentry.setContext(key, context)
  }

  // Add breadcrumb for debugging
  static addBreadcrumb(message, category = 'custom', level = 'info', data = {}) {
    Sentry.addBreadcrumb({
      message,
      category,
      level,
      data,
      timestamp: Date.now() / 1000
    })
  }

  // Capture custom error
  static captureError(error, context = {}) {
    Sentry.withScope((scope) => {
      // Add custom context
      Object.entries(context).forEach(([key, value]) => {
        scope.setContext(key, value)
      })
      
      Sentry.captureException(error)
    })
  }

  // Capture custom message
  static captureMessage(message, level = 'info', context = {}) {
    Sentry.withScope((scope) => {
      scope.setLevel(level)
      
      // Add custom context
      Object.entries(context).forEach(([key, value]) => {
        scope.setContext(key, value)
      })
      
      Sentry.captureMessage(message)
    })
  }

  // Performance monitoring
  static startTransaction(name, op = 'navigation') {
    return Sentry.startSpan({
      name,
      op
    }, (span) => span)
  }

  // Track Shopify API errors
  static captureShopifyError(error, operation, variables = {}) {
    this.captureError(error, {
      shopify: {
        operation,
        variables,
        timestamp: new Date().toISOString()
      }
    })
  }

  // Track form submission errors
  static captureFormError(error, formName, formData = {}) {
    this.captureError(error, {
      form: {
        name: formName,
        data: formData,
        timestamp: new Date().toISOString()
      }
    })
  }

  // Track analytics errors
  static captureAnalyticsError(error, event, data = {}) {
    this.captureError(error, {
      analytics: {
        event,
        data,
        timestamp: new Date().toISOString()
      }
    })
  }

  // Performance mark
  static performanceMark(name) {
    if ('performance' in window && 'mark' in performance) {
      performance.mark(name)
    }
  }

  // Performance measure
  static performanceMeasure(name, startMark, endMark) {
    if ('performance' in window && 'measure' in performance) {
      try {
        performance.measure(name, startMark, endMark)
        const measure = performance.getEntriesByName(name, 'measure')[0]
        
        // Send to Sentry
        this.addBreadcrumb(
          `Performance: ${name}`,
          'performance',
          'info',
          { duration: measure.duration }
        )
        
        return measure.duration
      } catch (error) {
        console.warn('Performance measurement failed:', error)
      }
    }
  }

  // Create higher-order component for error boundaries
  static createErrorBoundary(fallback) {
    return Sentry.withErrorBoundary(fallback, {
      fallback: ({ error: _error, resetError }) => React.createElement('div', 
        { className: 'error-boundary' },
        React.createElement('h2', null, 'Something went wrong'),
        React.createElement('p', null, "We've been notified about this error and will fix it soon."),
        React.createElement('button', { onClick: resetError }, 'Try again')
      ),
      beforeCapture: (scope, error, info) => {
        scope.setTag('errorBoundary', true)
        scope.setContext('errorInfo', info)
      }
    })
  }

  // Profiler for React components
  static createProfiler(name) {
    return Sentry.withProfiler((props) => {
      return React.createElement(props.children)
    }, { name })
  }
}

export default SentryService