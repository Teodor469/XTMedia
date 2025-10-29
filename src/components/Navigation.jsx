import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import LanguageSwitcher from './LanguageSwitcher'
import WishlistIcon from './WishlistIcon'
import CartIcon from './CartIcon'
import ShoppingCart from './ShoppingCart'

function Navigation() {
  const location = useLocation()
  const { t } = useTranslation()
  const { isAuthenticated, customer, logout } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    setIsMobileMenuOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setShowUserMenu(false)
  }

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.nav-content')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <nav className="nav">
        <div className="nav-content">
          <Link to="/" className="logo">XT Media</Link>
          
          {/* Hamburger Menu Button */}
          <button 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link
              to="/services"
              className={isActive('/services') ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              {t('navigation.services')}
            </Link>
            <Link
              to="/products"
              className={isActive('/products') ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              {t('navigation.products')}
            </Link>
            <Link
              to="/reviews"
              className={isActive('/reviews') ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              {t('navigation.reviews')}
            </Link>
            <Link
              to="/about"
              className={isActive('/about') ? 'active' : ''}
              onClick={closeMobileMenu}
            >
              {t('navigation.about')}
            </Link>
            <Link
              to="/contact"
              className={isActive('/contact') ? 'active' : ''}
              onClick={closeMobileMenu}
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
                    <Link
                      to="/account"
                      className="user-dropdown-item"
                      onClick={() => {
                        setShowUserMenu(false)
                        closeMobileMenu()
                      }}
                    >
                      <span>⚙️</span> Account Settings
                    </Link>
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
                <Link to="/login" className="auth-link login" onClick={closeMobileMenu}>
                  Login
                </Link>
                <Link to="/register" className="auth-link register" onClick={closeMobileMenu}>
                  Sign Up
                </Link>
              </div>
            )}

            <WishlistIcon />
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