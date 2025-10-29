// Web Vitals Performance Monitoring Service
import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals'
import analytics from './analytics'

class WebVitalsService {
  constructor() {
    this.isInitialized = false
    this.vitalsData = {}
  }

  // Initialize Web Vitals monitoring
  init() {
    if (this.isInitialized) return

    // Largest Contentful Paint
    onLCP((metric) => {
      this.reportWebVital('LCP', metric)
    })

    // Interaction to Next Paint (replaces FID)
    onINP((metric) => {
      this.reportWebVital('INP', metric)
    })

    // Cumulative Layout Shift
    onCLS((metric) => {
      this.reportWebVital('CLS', metric)
    })

    // First Contentful Paint
    onFCP((metric) => {
      this.reportWebVital('FCP', metric)
    })

    // Time to First Byte
    onTTFB((metric) => {
      this.reportWebVital('TTFB', metric)
    })

    this.isInitialized = true
    console.log('Web Vitals monitoring initialized')
  }

  // Report individual Web Vital metrics
  reportWebVital(name, metric) {
    // Store the metric
    this.vitalsData[name] = metric

    // Log to console in development
    if (import.meta.env.DEV) {
      console.log(`Web Vital - ${name}:`, metric)
    }

    // Send to Google Analytics
    if (analytics.isInitialized) {
      analytics.trackEvent('web_vitals', {
        event_category: 'Performance',
        event_label: name,
        value: Math.round(metric.value),
        custom_parameters: {
          metric_id: metric.id,
          metric_delta: metric.delta,
          metric_rating: this.getRating(name, metric.value)
        }
      })
    }

    // Send to external monitoring service (you can integrate with services like LogRocket, Sentry, etc.)
    this.sendToMonitoringService(name, metric)
  }

  // Get performance rating based on Web Vitals thresholds
  getRating(name, value) {
    const thresholds = {
      LCP: { good: 2500, poor: 4000 },
      INP: { good: 200, poor: 500 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 }
    }

    const threshold = thresholds[name]
    if (!threshold) return 'unknown'

    if (value <= threshold.good) return 'good'
    if (value <= threshold.poor) return 'needs-improvement'
    return 'poor'
  }

  // Send metrics to external monitoring service
  sendToMonitoringService(name, metric) {
    // Integration with external services
    const data = {
      metric: name,
      value: metric.value,
      id: metric.id,
      delta: metric.delta,
      rating: this.getRating(name, metric.value),
      url: window.location.href,
      timestamp: Date.now(),
      user_agent: navigator.userAgent,
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      } : null
    }

    // Send to your monitoring endpoint
    if (import.meta.env.VITE_MONITORING_ENDPOINT) {
      fetch(import.meta.env.VITE_MONITORING_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        keepalive: true
      }).catch(error => {
        console.warn('Failed to send Web Vital to monitoring service:', error)
      })
    }

    // Can also integrate with Sentry
    if (window.Sentry) {
      window.Sentry.addBreadcrumb({
        category: 'performance',
        message: `Web Vital: ${name}`,
        level: 'info',
        data: data
      })
    }
  }

  // Get current Web Vitals summary
  getVitalsSummary() {
    return Object.entries(this.vitalsData).map(([name, metric]) => ({
      name,
      value: metric.value,
      rating: this.getRating(name, metric.value),
      id: metric.id
    }))
  }

  // Performance observer for custom metrics
  observePerformance() {
    if (!('PerformanceObserver' in window)) return

    // Observe navigation timing
    const navObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          this.reportCustomMetric('page_load_time', entry.loadEventEnd - entry.fetchStart)
          this.reportCustomMetric('dom_content_loaded', entry.domContentLoadedEventEnd - entry.fetchStart)
        }
      }
    })

    navObserver.observe({ entryTypes: ['navigation'] })

    // Observe resource timing
    const resourceObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          // Track slow resources
          if (entry.duration > 1000) {
            this.reportCustomMetric('slow_resource', entry.duration, {
              resource_name: entry.name,
              resource_type: entry.initiatorType
            })
          }
        }
      }
    })

    resourceObserver.observe({ entryTypes: ['resource'] })

    // Observe long tasks
    if ('PerformanceObserver' in window && 'PerformanceLongTaskTiming' in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.reportCustomMetric('long_task', entry.duration, {
            start_time: entry.startTime
          })
        }
      })

      longTaskObserver.observe({ entryTypes: ['longtask'] })
    }
  }

  // Report custom performance metrics
  reportCustomMetric(name, value, additionalData = {}) {
    const data = {
      metric: name,
      value: value,
      url: window.location.href,
      timestamp: Date.now(),
      ...additionalData
    }

    // Log in development
    if (import.meta.env.DEV) {
      console.log(`Custom Metric - ${name}:`, data)
    }

    // Send to Google Analytics
    if (analytics.isInitialized) {
      analytics.trackEvent('custom_performance', {
        event_category: 'Performance',
        event_label: name,
        value: Math.round(value),
        custom_parameters: additionalData
      })
    }
  }

  // Monitor page visibility changes
  observePageVisibility() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Page became hidden
        this.reportCustomMetric('page_hidden', Date.now())
      } else {
        // Page became visible
        this.reportCustomMetric('page_visible', Date.now())
      }
    })
  }

  // Memory usage monitoring
  observeMemoryUsage() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory
        this.reportCustomMetric('memory_used', memory.usedJSHeapSize, {
          total_heap: memory.totalJSHeapSize,
          heap_limit: memory.jsHeapSizeLimit
        })
      }, 30000) // Every 30 seconds
    }
  }
}

// Create singleton instance
const webVitals = new WebVitalsService()

export default webVitals