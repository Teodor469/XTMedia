import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
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
      </div>
    </LanguageProvider>
  )
}

export default Layout