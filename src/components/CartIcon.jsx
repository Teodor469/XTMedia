import { useState, useEffect } from 'react'
import { useShopify } from '../contexts/ShopifyContext'
import './CartIcon.css'

const CartIcon = ({ onCartClick }) => {
  const { cartItemCount, totalPrice } = useShopify()
  const [isAnimating, setIsAnimating] = useState(false)

  // Trigger animation when cart count changes
  useEffect(() => {
    if (cartItemCount > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 300)
      return () => clearTimeout(timer)
    }
  }, [cartItemCount])

  return (
    <button 
      className={`cart-icon ${isAnimating ? 'animate' : ''}`}
      onClick={onCartClick}
      aria-label={`Shopping cart with ${cartItemCount} items`}
    >
      <div className="cart-icon-wrapper">
        <span className="cart-symbol">🛒</span>
        {cartItemCount > 0 && (
          <span className="cart-badge">{cartItemCount}</span>
        )}
      </div>
      {cartItemCount > 0 && (
        <span className="cart-total">${totalPrice}</span>
      )}
    </button>
  )
}

export default CartIcon