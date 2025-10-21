import { useShopify } from '../contexts/ShopifyContext'
import { formatPrice } from '../config/shopify'
import './ShoppingCart.css'

const ShoppingCart = ({ isOpen, onClose }) => {
  const { 
    lineItems, 
    totalPrice, 
    subtotal,
    totalTax,
    checkout,
    removeFromCart, 
    updateCartItemQuantity, 
    clearCart,
    isLoading,
    error 
  } = useShopify()

  const handleQuantityChange = async (lineItemId, newQuantity) => {
    if (newQuantity === 0) {
      await removeFromCart(lineItemId)
    } else {
      await updateCartItemQuantity(lineItemId, newQuantity)
    }
  }

  const handleCheckout = () => {
    if (checkout?.webUrl) {
      window.open(checkout.webUrl, '_blank')
    } else {
      alert('Checkout is not available at the moment. Please try again.')
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className="shopping-cart">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="cart-close" onClick={onClose}>✕</button>
        </div>

        <div className="cart-content">
          {error && (
            <div className="cart-error">
              <p>⚠️ {error}</p>
            </div>
          )}

          {lineItems.length === 0 ? (
            <div className="cart-empty">
              <div className="empty-cart-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some products to get started!</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {lineItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      {item.variant?.image?.src ? (
                        <img 
                          src={item.variant.image.src} 
                          alt={item.variant.image.altText || item.title}
                        />
                      ) : (
                        <div className="item-placeholder">🛍️</div>
                      )}
                    </div>
                    
                    <div className="item-details">
                      <h4>{item.title}</h4>
                      {item.variant?.title !== 'Default Title' && (
                        <p className="item-variant">{item.variant.title}</p>
                      )}
                      <p className="item-price">
                        {formatPrice(item.variant?.price || '0')} each
                      </p>
                    </div>
                    
                    <div className="item-controls">
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={isLoading}
                        >
                          −
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          disabled={isLoading}
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="item-total">
                        {formatPrice((parseFloat(item.variant?.price || '0') * item.quantity).toString())}
                      </div>
                      
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        disabled={isLoading}
                        title="Remove from cart"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                {parseFloat(totalTax) > 0 && (
                  <div className="summary-row">
                    <span>Tax:</span>
                    <span>{formatPrice(totalTax)}</span>
                  </div>
                )}
                
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div className="cart-actions">
                <button 
                  className="btn-secondary clear-cart-btn"
                  onClick={clearCart}
                  disabled={isLoading}
                >
                  Clear Cart
                </button>
                
                <button 
                  className="btn-primary checkout-btn"
                  onClick={handleCheckout}
                  disabled={isLoading || lineItems.length === 0}
                >
                  {isLoading ? '🔄 Processing...' : '🔒 Checkout'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ShoppingCart