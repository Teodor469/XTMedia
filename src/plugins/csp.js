// Vite plugin for Content Security Policy
export function cspPlugin() {
  return {
    name: 'csp-plugin',
    transformIndexHtml(html) {
      // Get environment variables
      const isDev = process.env.NODE_ENV === 'development'
      const _gaId = process.env.VITE_GA_MEASUREMENT_ID
      const sentryDsn = process.env.VITE_SENTRY_DSN
      
      // Build CSP directives
      const cspDirectives = {
        'default-src': ["'self'"],
        'script-src': [
          "'self'",
          "'unsafe-inline'", // Required for inline scripts in development
          ...(isDev ? ["'unsafe-eval'"] : []), // Required for HMR in development
          'https://www.googletagmanager.com',
          'https://www.google-analytics.com',
          'https://cdn.shopify.com',
          ...(sentryDsn ? ['https://browser.sentry-cdn.com'] : [])
        ],
        'style-src': [
          "'self'",
          "'unsafe-inline'", // Required for CSS-in-JS and styled components
          'https://fonts.googleapis.com'
        ],
        'font-src': [
          "'self'",
          'https://fonts.gstatic.com'
        ],
        'img-src': [
          "'self'",
          'data:',
          'https:',
          'blob:'
        ],
        'media-src': [
          "'self'",
          'data:',
          'https:'
        ],
        'object-src': ["'none'"],
        'frame-src': [
          "'self'",
          'https://www.googletagmanager.com'
        ],
        'connect-src': [
          "'self'",
          ...(isDev ? ['ws:', 'wss:'] : []), // WebSocket for HMR
          'https://www.google-analytics.com',
          'https://analytics.google.com',
          'https://region1.google-analytics.com',
          'https://*.myshopify.com',
          ...(sentryDsn ? ['https://api.sentry.io', 'https://o4505286343680000.ingest.sentry.io'] : [])
        ],
        'worker-src': [
          "'self'",
          'blob:'
        ],
        'manifest-src': ["'self'"],
        'base-uri': ["'self'"],
        'form-action': [
          "'self'",
          'https://formspree.io',
          'https://api.emailjs.com'
        ]
      }
      
      // Convert to CSP string
      const cspString = Object.entries(cspDirectives)
        .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
        .join('; ')
      
      // Add CSP meta tag
      const cspMeta = `<meta http-equiv="Content-Security-Policy" content="${cspString}">`
      
      // Add other security headers as meta tags (fallback for environments without proper header support)
      // Note: X-Frame-Options is removed as it should only be set via HTTP headers, not meta tags
      const securityMetas = [
        cspMeta,
        '<meta http-equiv="X-Content-Type-Options" content="nosniff">',
        '<meta http-equiv="X-XSS-Protection" content="1; mode=block">',
        '<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">'
      ]
      
      // Inject security meta tags into the head
      return html.replace(
        '<head>',
        `<head>\n    ${securityMetas.join('\n    ')}`
      )
    }
  }
}

// CSP nonce generator for inline scripts
export function generateNonce() {
  return btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16))))
}

// CSP violation reporting endpoint
export function setupCSPReporting() {
  // Listen for CSP violations
  document.addEventListener('securitypolicyviolation', (event) => {
    const violationData = {
      documentURI: event.documentURI,
      referrer: event.referrer,
      blockedURI: event.blockedURI,
      violatedDirective: event.violatedDirective,
      effectiveDirective: event.effectiveDirective,
      originalPolicy: event.originalPolicy,
      sourceFile: event.sourceFile,
      statusCode: event.statusCode,
      lineNumber: event.lineNumber,
      columnNumber: event.columnNumber,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    }
    
    // Log to console in development
    if (import.meta.env.DEV) {
      console.warn('CSP Violation:', violationData)
    }
    
    // Send to monitoring service
    if (import.meta.env.VITE_CSP_REPORT_URI) {
      fetch(import.meta.env.VITE_CSP_REPORT_URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'csp-report': violationData
        }),
        keepalive: true
      }).catch(error => {
        console.error('Failed to send CSP violation report:', error)
      })
    }
    
    // Send to Sentry if available
    if (window.Sentry) {
      window.Sentry.addBreadcrumb({
        category: 'security',
        message: 'CSP Violation',
        level: 'warning',
        data: violationData
      })
    }
  })
}