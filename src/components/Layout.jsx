import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import ToastContainer from './Toast'
import { LanguageProvider } from '../contexts/LanguageContext'
import { useAnalytics } from '../hooks/useAnalytics'
import { useWebVitals } from '../hooks/useWebVitals'
import { useErrorLogging } from '../hooks/useErrorLogging'

function Layout() {
  // Initialize analytics tracking
  useAnalytics()
  
  // Initialize Web Vitals monitoring
  useWebVitals()
  
  // Initialize error logging
  useErrorLogging()
  
  return (
    <LanguageProvider>
      <div className="app">
        <Navigation />
        <main className="main">
          <Outlet />
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </LanguageProvider>
  )
}

export default Layout