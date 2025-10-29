import { useWishlist } from '../contexts/WishlistContext'
import { useShopify } from '../contexts/ShopifyContext'
import { useToast } from '../contexts/ToastContext'
import ProductCard from '../components/ProductCard'
import './Wishlist.css'

function Wishlist() {
  const { wishlist, clearWishlist, removeFromWishlist } = useWishlist()
  const { addToCart, isLoading: cartLoading } = useShopify()
  const { success, error: showError } = useToast()

  const handleAddToCart = async (product) => {
    try {
      const variantId = product.variants[0]?.id
      if (!variantId) {
        showError('Product variant not available')
        return
      }

      await addToCart(variantId, 1)
      success(`${product.title} added to cart!`)
    } catch (err) {
      showError(`Error adding to cart: ${err.message}`)
    }
  }

  const handleAddAllToCart = async () => {
    if (wishlist.length === 0) return

    let successCount = 0
    let failCount = 0

    for (const product of wishlist) {
      try {
        const variantId = product.variants[0]?.id
        if (variantId) {
          await addToCart(variantId, 1)
          successCount++
        } else {
          failCount++
        }
      } catch (_err) {
        failCount++
      }
    }

    if (successCount > 0) {
      success(`${successCount} item${successCount !== 1 ? 's' : ''} added to cart!`)
    }
    if (failCount > 0) {
      showError(`${failCount} item${failCount !== 1 ? 's' : ''} could not be added`)
    }
  }

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist()
    }
  }

  return (
    <div className="wishlist-page">
      {/* Hero Section */}
      <section className="wishlist-hero">
        <div className="wishlist-hero-content">
          <h1 className="wishlist-title">
            <span className="heart-emoji">❤️</span> My Wishlist
          </h1>
          <p className="wishlist-subtitle">
            {wishlist.length > 0
              ? `You have ${wishlist.length} item${wishlist.length !== 1 ? 's' : ''} saved`
              : 'Save your favorite products here'}
          </p>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="wishlist-content">
        <div className="wishlist-container">
          {wishlist.length > 0 ? (
            <>
              {/* Actions Bar */}
              <div className="wishlist-actions-bar">
                <div className="wishlist-info">
                  <p className="wishlist-count">
                    {wishlist.length} {wishlist.length === 1 ? 'Product' : 'Products'}
                  </p>
                </div>
                <div className="wishlist-actions">
                  <button
                    onClick={handleAddAllToCart}
                    className="btn-primary-sm"
                    disabled={cartLoading}
                  >
                    {cartLoading ? '⏳' : '🛒'} Add All to Cart
                  </button>
                  <button
                    onClick={handleClearWishlist}
                    className="btn-secondary-sm clear-btn"
                  >
                    🗑️ Clear All
                  </button>
                </div>
              </div>

              {/* Products Grid */}
              <div className="wishlist-grid">
                {wishlist.map((product) => (
                  <div key={product.id} className="wishlist-item">
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      cartLoading={cartLoading}
                      showActions={true}
                      showWishlist={true}
                    />
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="remove-from-wishlist-btn"
                      title="Remove from wishlist"
                    >
                      ✕ Remove
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="wishlist-empty">
              <div className="empty-icon">🤍</div>
              <h2>Your Wishlist is Empty</h2>
              <p>
                Start adding products to your wishlist by clicking the heart icon on any product.
              </p>
              <a href="/products" className="btn-primary">
                Browse Products
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      {wishlist.length > 0 && (
        <section className="wishlist-info-section">
          <div className="wishlist-info-container">
            <div className="info-card">
              <div className="info-icon">💝</div>
              <h3>Save for Later</h3>
              <p>Keep track of products you love and buy them when you're ready.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🔔</div>
              <h3>Never Lose Track</h3>
              <p>Your wishlist is saved and syncs across all your devices.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🎁</div>
              <h3>Share with Friends</h3>
              <p>Create the perfect gift list and share it with loved ones.</p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default Wishlist
