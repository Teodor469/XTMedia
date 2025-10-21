import { Link } from 'react-router-dom'
import './ProductCard.css'

function ProductCard({
  product,
  onAddToCart,
  cartLoading = false,
  variant = 'default', // 'default', 'compact', 'selectable'
  isSelected = false,
  onSelect,
  showActions = true,
  className = ''
}) {
  const handleCardClick = () => {
    if (variant === 'selectable' && onSelect) {
      onSelect(product)
    }
  }

  const cardClasses = `
    product-card-component
    ${variant === 'selectable' ? 'selectable' : ''}
    ${isSelected ? 'selected' : ''}
    ${className}
  `.trim()

  return (
    <div
      className={cardClasses}
      onClick={variant === 'selectable' ? handleCardClick : undefined}
    >
      <div className="product-card-image">
        {product.featuredImage?.url || product.image ? (
          <img
            src={product.featuredImage?.url || product.image}
            alt={product.featuredImage?.altText || product.title || product.name}
            loading="lazy"
          />
        ) : (
          <div className="product-card-placeholder">
            {product.featuredImage?.altText || product.placeholder || product.icon || '🛍️'}
          </div>
        )}
      </div>

      <div className="product-card-info">
        <h3>{product.title || product.name}</h3>
        <p className="product-card-description">{product.description}</p>

        {product.features && (
          <div className="product-card-features">
            {product.features.slice(0, 3).map((feature, index) => (
              <span key={index} className="feature-tag">{feature}</span>
            ))}
          </div>
        )}

        {product.sizes && (
          <div className="product-card-sizes">
            <p>Sizes:</p>
            <div className="sizes-list">
              {product.sizes.slice(0, 4).map((size, index) => (
                <span key={index} className="size-tag">{size}</span>
              ))}
            </div>
          </div>
        )}

        <div className="product-card-price">
          {product.formattedPrice || product.price}
        </div>

        {showActions && (
          <div className="product-card-actions">
            {product.handle && (
              <Link
                to={`/products/${product.handle}`}
                className="btn-secondary product-view-btn"
                onClick={(e) => e.stopPropagation()}
              >
                View Details
              </Link>
            )}

            {onAddToCart && (
              <button
                className="btn-primary add-to-cart-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToCart(product)
                }}
                disabled={cartLoading}
              >
                {cartLoading ? '🔄' : '🛒'} Add to Cart
              </button>
            )}

            {variant === 'selectable' && (
              <button
                className="btn-select"
                onClick={handleCardClick}
              >
                {isSelected ? '✓ Selected' : 'Select'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
