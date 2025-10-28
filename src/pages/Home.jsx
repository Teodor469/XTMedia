import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import { useShopify } from '../contexts/ShopifyContext'
import { useToast } from '../contexts/ToastContext'
import { useProductsWithFallback } from '../hooks/useShopifyProducts'
import ProductCard from '../components/ProductCard'
import { ProductGridSkeleton } from '../components/LoadingSkeleton'
import { ShopifyErrorBoundary } from '../components/ErrorBoundary'
import './Home.css'

function Home() {
  const { t } = useTranslation()
  const { addToCart, isLoading: cartLoading } = useShopify()
  const { success, error: showError } = useToast()

  // Fallback products for development/demo
  const getFallbackProducts = useCallback(() => [
    {
      id: 'demo-1',
      title: 'Custom Phone Cases',
      description: 'Personalized protection for your device',
      formattedPrice: '$19.99',
      featuredImage: { url: null, altText: '📱' },
      handle: 'custom-phone-cases',
      variants: [{ id: 'demo-variant-1' }]
    },
    {
      id: 'demo-2',
      title: 'Custom T-Shirts',
      description: 'High-quality apparel with your design',
      formattedPrice: '$24.99',
      featuredImage: { url: null, altText: '👕' },
      handle: 'custom-t-shirts',
      variants: [{ id: 'demo-variant-2' }]
    },
    {
      id: 'demo-3',
      title: 'Engraved Mugs',
      description: 'Perfect for gifts and corporate branding',
      formattedPrice: '$14.99',
      featuredImage: { url: null, altText: '☕' },
      handle: 'engraved-mugs',
      variants: [{ id: 'demo-variant-3' }]
    },
    {
      id: 'demo-4',
      title: 'Photo Prints',
      description: 'Professional quality prints on various materials',
      formattedPrice: '$12.99',
      featuredImage: { url: null, altText: '🖼️' },
      handle: 'photo-prints',
      variants: [{ id: 'demo-variant-4' }]
    },
    {
      id: 'demo-5',
      title: 'Awards & Trophies',
      description: 'Custom recognition and achievement awards',
      formattedPrice: '$29.99',
      featuredImage: { url: null, altText: '🏆' },
      handle: 'awards-trophies',
      variants: [{ id: 'demo-variant-5' }]
    },
    {
      id: 'demo-6',
      title: 'Signage',
      description: 'Business signs and promotional displays',
      formattedPrice: '$39.99',
      featuredImage: { url: null, altText: '🎯' },
      handle: 'signage',
      variants: [{ id: 'demo-variant-6' }]
    },
    {
      id: 'demo-7',
      title: 'Corporate Gifts',
      description: 'Professional branded merchandise',
      formattedPrice: '$22.99',
      featuredImage: { url: null, altText: '💼' },
      handle: 'corporate-gifts',
      variants: [{ id: 'demo-variant-7' }]
    },
    {
      id: 'demo-8',
      title: 'Art Prints',
      description: 'Canvas and fine art reproductions',
      formattedPrice: '$34.99',
      featuredImage: { url: null, altText: '🎨' },
      handle: 'art-prints',
      variants: [{ id: 'demo-variant-8' }]
    }
  ], [])

  // Use React Query with fallback
  const { data: products = [], isLoading: productsLoading, error } = useProductsWithFallback(getFallbackProducts, 8)

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
      <nav className="services-nav">
        <div className="services-nav-content">
          <Link to="/services/laser-engraving" className="service-nav-item laser-engraving">
            <div className="service-nav-icon">⚡</div>
            <span>{t('home.services.laserEngraving.title')}</span>
          </Link>
          <Link to="/services/sublimation-printing" className="service-nav-item sublimation-printing">
            <div className="service-nav-icon">🎨</div>
            <span>{t('home.services.sublimationPrinting.title')}</span>
          </Link>
          <Link to="/services/dtg-printing" className="service-nav-item dtg-printing">
            <div className="service-nav-icon">👕</div>
            <span>{t('home.services.dtgPrinting.title')}</span>
          </Link>
          <Link to="/services/photo-printing" className="service-nav-item photo-printing">
            <div className="service-nav-icon">📸</div>
            <span>{t('home.services.photoPrinting.title')}</span>
          </Link>
          <Link to="/services/brand-products" className="service-nav-item brand-products">
            <div className="service-nav-icon">🏷️</div>
            <span>{t('home.services.brandProducts.title')}</span>
          </Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('home.hero.title')}
          </h1>
          <p className="hero-subtitle">
            {t('home.hero.subtitle')}
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn-primary">{t('home.hero.cta')}</Link>
            <Link to="/services" className="btn-secondary">{t('home.hero.secondary')}</Link>
          </div>
        </div>
      </section>

      <section className="products-preview">
        <div className="products-content">
          <h2 className="section-title">Featured Products</h2>
          
          <ShopifyErrorBoundary fallbackMessage="Unable to load featured products">
            {error && (
              <div className="error-message">
                <p>⚠️ Using demo products</p>
              </div>
            )}
            
            {productsLoading ? (
              <ProductGridSkeleton count={8} />
            ) : (
              <div className="products-carousel">
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
          </ShopifyErrorBoundary>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>{t('home.cta.title')}</h2>
          <p>{t('home.cta.subtitle')}</p>
          <Link to="/contact" className="btn-primary">{t('home.cta.button')}</Link>
        </div>
      </section>
    </>
  )
}

export default Home