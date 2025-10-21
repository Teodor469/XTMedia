import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import App from './App.jsx'
import { ShopifyProvider } from './contexts/ShopifyContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopifyProvider>
      <App />
    </ShopifyProvider>
  </StrictMode>,
)
