import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.jsx'
import { ShopifyProvider } from './contexts/ShopifyContext'
import { ToastProvider } from './contexts/ToastContext'
import QueryProvider from './providers/QueryProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryProvider>
      <ToastProvider>
        <ShopifyProvider>
          <App />
        </ShopifyProvider>
      </ToastProvider>
    </QueryProvider>
  </StrictMode>,
)
