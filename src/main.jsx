import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import './i18n'
import App from './App.jsx'
import { ShopifyProvider } from './contexts/ShopifyContext'
import { AuthProvider } from './contexts/AuthContext'
import { WishlistProvider } from './contexts/WishlistContext'
import { ToastProvider } from './contexts/ToastContext'
import QueryProvider from './providers/QueryProvider'
import { setupCSPReporting } from './plugins/csp.js'

// Initialize CSP violation reporting
setupCSPReporting()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <QueryProvider>
        <ToastProvider>
          <ShopifyProvider>
          <AuthProvider>
            <WishlistProvider>
                <App />
            </WishlistProvider>
          </AuthProvider>
          </ShopifyProvider>
        </ToastProvider>
      </QueryProvider>
    </HelmetProvider>
  </StrictMode>,
)
