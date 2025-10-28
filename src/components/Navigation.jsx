import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import CartIcon from './CartIcon'
import ShoppingCart from './ShoppingCart'

function Navigation() {
  const location = useLocation()
  const { t } = useTranslation()
  const [isCartOpen, setIsCartOpen] = useState(false)

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
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