import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import LanguageSwitcher from './LanguageSwitcher'
import CartIcon from './CartIcon'
import ShoppingCart from './ShoppingCart'

function Navigation() {
  const location = useLocation()
  const { t } = useTranslation()
  const { isAuthenticated, customer, logout } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  return (
    <>
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
              to="/products"
              className={isActive('/products') ? 'active' : ''}
            >
              {t('navigation.products')}
            </Link>
            <Link
              to="/reviews"
              className={isActive('/reviews') ? 'active' : ''}
            >
              {t('navigation.reviews')}
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

            {/* Authentication Links */}
            {isAuthenticated ? (
              <div className="user-menu-container">
                <button
                  className="user-menu-trigger"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-expanded={showUserMenu}
                  aria-haspopup="true"
                >
                  <span className="user-icon">👤</span>
                  <span className="user-name">{customer?.firstName || 'Account'}</span>
                  <span className="dropdown-arrow">{showUserMenu ? '▲' : '▼'}</span>
                </button>

                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="user-dropdown-header">
                      <p className="user-dropdown-name">
                        {customer?.firstName} {customer?.lastName}
                      </p>
                      <p className="user-dropdown-email">{customer?.email}</p>
                    </div>
                    <div className="user-dropdown-divider"></div>
                    <button
                      onClick={handleLogout}
                      className="user-dropdown-item logout"
                    >
                      <span>🚪</span> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="auth-link login">
                  Login
                </Link>
                <Link to="/register" className="auth-link register">
                  Sign Up
                </Link>
              </div>
            )}

            <CartIcon onCartClick={() => setIsCartOpen(true)} />
          </div>
        </div>
      </nav>
      
      <ShoppingCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
    </>
  )
}

export default Navigation