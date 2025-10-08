import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

function Navigation() {
  const location = useLocation()
  const { t } = useTranslation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="nav">
      <div className="nav-content">
        <Link to="/" className="logo">XT Media</Link>
        <div className="nav-links">
          <Link 
            to="/services" 
            className={isActive('/services') ? 'active' : ''}
          >
            {t('navigation.services')}
          </Link>
          <Link 
            to="/about" 
            className={isActive('/about') ? 'active' : ''}
          >
            {t('navigation.about')}
          </Link>
          <Link 
            to="/contact" 
            className={isActive('/contact') ? 'active' : ''}
          >
            {t('navigation.contact')}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  )
}

export default Navigation