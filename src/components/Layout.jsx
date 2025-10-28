import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import ToastContainer from './Toast'
import { LanguageProvider } from '../contexts/LanguageContext'

function Layout() {
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