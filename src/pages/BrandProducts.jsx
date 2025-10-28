import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useCallback } from 'react'
import { useShopify } from '../contexts/ShopifyContext'
import { useToast } from '../contexts/ToastContext'
import { useProductsWithFallback } from '../hooks/useShopifyProducts'
import ProductCard from '../components/ProductCard'
import QuoteModal from '../components/QuoteModal'
import { ProductGridSkeleton } from '../components/LoadingSkeleton'
import { ShopifyErrorBoundary } from '../components/ErrorBoundary'
import './BrandProducts.css'

function BrandProducts() {
  const { t } = useTranslation()
  const { addToCart, isLoading: cartLoading } = useShopify()
  const { success, error: showError } = useToast()
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  // Fallback products for development/demo
  const getFallbackProducts = useCallback(() => [
    {
      id: 'brand-tshirt',
      title: t('brandProducts.fallbackProducts.tshirt.title'),
      description: t('brandProducts.fallbackProducts.tshirt.description'),
      formattedPrice: '$24.99',
      price: 24.99,
      featuredImage: { url: null, altText: '👕' },
      handle: 'brand-tshirt',
      variants: [{ id: 'variant-1', title: 'Default', price: 24.99, formattedPrice: '$24.99', availableForSale: true }]
    },
    {
      id: 'brand-hoodie',
      title: t('brandProducts.fallbackProducts.hoodie.title'),
      description: t('brandProducts.fallbackProducts.hoodie.description'),
      formattedPrice: '$49.99',
      price: 49.99,
      featuredImage: { url: null, altText: '🧥' },
      handle: 'brand-hoodie',
      variants: [{ id: 'variant-2', title: 'Default', price: 49.99, formattedPrice: '$49.99', availableForSale: true }]
    },
    {
      id: '3d-puzzle-logo',
      title: t('brandProducts.fallbackProducts.puzzle.title'),
      description: t('brandProducts.fallbackProducts.puzzle.description'),
      formattedPrice: '$34.99',
      price: 34.99,
      featuredImage: { url: null, altText: '🧩' },
      handle: '3d-puzzle-logo',
      variants: [{ id: 'variant-3', title: 'Default', price: 34.99, formattedPrice: '$34.99', availableForSale: true }]
    },
    {
      id: 'decorative-shelf',
      title: t('brandProducts.fallbackProducts.shelf.title'),
      description: t('brandProducts.fallbackProducts.shelf.description'),
      formattedPrice: '$89.99',
      price: 89.99,
      featuredImage: { url: null, altText: '🪑' },
      handle: 'decorative-shelf',
      variants: [{ id: 'variant-4', title: 'Default', price: 89.99, formattedPrice: '$89.99', availableForSale: true }]
    },
    {
      id: 'brand-cap',
      title: t('brandProducts.fallbackProducts.cap.title'),
      description: t('brandProducts.fallbackProducts.cap.description'),
      formattedPrice: '$19.99',
      price: 19.99,
      featuredImage: { url: null, altText: '🧢' },
      handle: 'brand-cap',
      variants: [{ id: 'variant-5', title: 'Default', price: 19.99, formattedPrice: '$19.99', availableForSale: true }]
    },
    {
      id: 'wall-art',
      title: t('brandProducts.fallbackProducts.wallArt.title'),
      description: t('brandProducts.fallbackProducts.wallArt.description'),
      formattedPrice: '$64.99',
      price: 64.99,
      featuredImage: { url: null, altText: '🖼️' },
      handle: 'wall-art',
      variants: [{ id: 'variant-6', title: 'Default', price: 64.99, formattedPrice: '$64.99', availableForSale: true }]
    },
    {
      id: 'polo-shirt',
      title: t('brandProducts.fallbackProducts.polo.title'),
      description: t('brandProducts.fallbackProducts.polo.description'),
      formattedPrice: '$32.99',
      price: 32.99,
      featuredImage: { url: null, altText: '👔' },
      handle: 'polo-shirt',
      variants: [{ id: 'variant-7', title: 'Default', price: 32.99, formattedPrice: '$32.99', availableForSale: true }]
    },
    {
      id: 'puzzle-building',
      title: t('brandProducts.fallbackProducts.buildingPuzzle.title'),
      description: t('brandProducts.fallbackProducts.buildingPuzzle.description'),
      formattedPrice: '$44.99',
      price: 44.99,
      featuredImage: { url: null, altText: '🏛️' },
      handle: 'puzzle-building',
      variants: [{ id: 'variant-8', title: 'Default', price: 44.99, formattedPrice: '$44.99', availableForSale: true }]
    },
    {
      id: 'desk-organizer',
      title: t('brandProducts.fallbackProducts.deskOrganizer.title'),
      description: t('brandProducts.fallbackProducts.deskOrganizer.description'),
      formattedPrice: '$54.99',
      price: 54.99,
      featuredImage: { url: null, altText: '📐' },
      handle: 'desk-organizer',
      variants: [{ id: 'variant-9', title: 'Default', price: 54.99, formattedPrice: '$54.99', availableForSale: true }]
    },
    {
      id: 'jacket',
      title: t('brandProducts.fallbackProducts.jacket.title'),
      description: t('brandProducts.fallbackProducts.jacket.description'),
      formattedPrice: '$79.99',
      price: 79.99,
      featuredImage: { url: null, altText: '🧥' },
      handle: 'jacket',
      variants: [{ id: 'variant-10', title: 'Default', price: 79.99, formattedPrice: '$79.99', availableForSale: true }]
    },
    {
      id: 'animal-puzzle',
      title: t('brandProducts.fallbackProducts.animalPuzzle.title'),
      description: t('brandProducts.fallbackProducts.animalPuzzle.description'),
      formattedPrice: '$29.99',
      price: 29.99,
      featuredImage: { url: null, altText: '🦁' },
      handle: 'animal-puzzle',
      variants: [{ id: 'variant-11', title: 'Default', price: 29.99, formattedPrice: '$29.99', availableForSale: true }]
    },
    {
      id: 'bookshelf',
      title: t('brandProducts.fallbackProducts.bookshelf.title'),
      description: t('brandProducts.fallbackProducts.bookshelf.description'),
      formattedPrice: '$149.99',
      price: 149.99,
      featuredImage: { url: null, altText: '📚' },
      handle: 'bookshelf',
      variants: [{ id: 'variant-12', title: 'Default', price: 149.99, formattedPrice: '$149.99', availableForSale: true }]
    }
  ], [t])

  // Use React Query with fallback
  const { data: products = [], isLoading: productsLoading, error } = useProductsWithFallback(getFallbackProducts, 50)

  // Handle add to cart
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

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero brand-hero">
        <div className="page-hero-content">
          <h1 className="page-title">{t('brandProducts.hero.title')}</h1>
          <p className="page-subtitle">{t('brandProducts.hero.subtitle')}</p>
          <div className="hero-actions">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="btn-primary"
            >
              {t('brandProducts.hero.primaryButton')}
            </button>
            <a href="#products" className="btn-secondary">
              {t('brandProducts.hero.secondaryButton')}
            </a>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="brand-offer">
        <div className="brand-offer-container">
          <h2 className="section-title">{t('brandProducts.whatWeOffer.title')}</h2>
          <p className="section-subtitle">{t('brandProducts.whatWeOffer.subtitle')}</p>

          <div className="features-grid">
            {t('brandProducts.whatWeOffer.features', { returnObjects: true }).map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">✓</div>
                <p className="feature-text">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-showcase">
        <div className="categories-container">
          <h2 className="section-title">{t('brandProducts.categories.title')}</h2>

          <div className="categories-grid">
            {/* Clothing Category */}
            <div className="category-card">
              <div className="category-icon">👕</div>
              <h3 className="category-title">{t('brandProducts.categories.clothing.title')}</h3>
              <p className="category-description">{t('brandProducts.categories.clothing.description')}</p>
              <ul className="category-features">
                {t('brandProducts.categories.clothing.features', { returnObjects: true }).map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* 3D Puzzles Category */}
            <div className="category-card">
              <div className="category-icon">🧩</div>
              <h3 className="category-title">{t('brandProducts.categories.puzzles.title')}</h3>
              <p className="category-description">{t('brandProducts.categories.puzzles.description')}</p>
              <ul className="category-features">
                {t('brandProducts.categories.puzzles.features', { returnObjects: true }).map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>

            {/* Decorative Furniture Category */}
            <div className="category-card">
              <div className="category-icon">🪑</div>
              <h3 className="category-title">{t('brandProducts.categories.furniture.title')}</h3>
              <p className="category-description">{t('brandProducts.categories.furniture.description')}</p>
              <ul className="category-features">
                {t('brandProducts.categories.furniture.features', { returnObjects: true }).map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Products Gallery Section */}
      <section id="products" className="products-gallery">
        <div className="products-gallery-container">
          <h2 className="section-title">{t('brandProducts.gallery.title')}</h2>
          <p className="section-subtitle">{t('brandProducts.gallery.subtitle')}</p>

          {error && (
            <div className="error-message">
              <p>⚠️ {error}</p>
              <p><small>Showing demo products</small></p>
            </div>
          )}

          {productsLoading ? (
            <div className="loading-products">
              <div className="loading-spinner">🔄 Loading products...</div>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  cartLoading={cartLoading}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>{t('brandProducts.cta.title')}</h2>
          <p className="cta-subtitle">{t('brandProducts.cta.subtitle')}</p>
          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="btn-primary"
          >
            {t('brandProducts.cta.button')}
          </button>
        </div>
      </section>

      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </>
  )
}

export default BrandProducts
