import { useState, useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useShopify } from '../contexts/ShopifyContext'
import {
  useProductSearchWithFallback,
  useProductsWithFallback,
  useProductSuggestions,
  useCollections,
  useFilterOptions
} from '../hooks/useShopifyProducts'
import SearchBar from '../components/SearchBar'
import ProductFilters from '../components/ProductFilters'
import ProductCard from '../components/ProductCard'
import { ProductGridSkeleton } from '../components/LoadingSkeleton'
import { ShopifyErrorBoundary } from '../components/ErrorBoundary'
import './ProductSearch.css'

function ProductSearch() {
  const { t } = useTranslation()
  const { addToCart, isLoading: cartLoading } = useShopify()
  const [searchParams, setSearchParams] = useSearchParams()
  
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [filters, setFilters] = useState({
    collections: searchParams.getAll('collection'),
    tags: searchParams.getAll('tag'),
    vendors: searchParams.getAll('vendor'),
    priceMin: parseInt(searchParams.get('min_price')) || 0,
    priceMax: parseInt(searchParams.get('max_price')) || 500,
    availability: searchParams.get('availability') || 'all',
    sortBy: searchParams.get('sort') || 'relevance'
  })
  
  const [suggestionsQuery, setSuggestionsQuery] = useState('')

  // Fallback products for demo mode
  const getFallbackProducts = useCallback(() => {
    const baseProducts = [
      {
        id: 'search-demo-1',
        title: 'Custom T-Shirt with Your Logo',
        description: 'High-quality cotton t-shirt with custom logo printing',
        formattedPrice: '$24.99',
        price: 24.99,
        featuredImage: { url: null, altText: '👕' },
        handle: 'custom-tshirt-logo',
        vendor: 'XT Media',
        productType: 'Apparel',
        tags: ['cotton', 'custom', 'logo', 't-shirt'],
        variants: [{ id: 'variant-1', availableForSale: true }]
      },
      {
        id: 'search-demo-2',
        title: 'Laser Engraved Wood Sign',
        description: 'Professional wooden signage with laser engraving',
        formattedPrice: '$49.99',
        price: 49.99,
        featuredImage: { url: null, altText: '🪵' },
        handle: 'laser-wood-sign',
        vendor: 'XT Media',
        productType: 'Signage',
        tags: ['wood', 'laser', 'engraving', 'sign'],
        variants: [{ id: 'variant-2', availableForSale: true }]
      },
      {
        id: 'search-demo-3',
        title: 'Sublimation Photo Print',
        description: 'High-resolution photo printing on various materials',
        formattedPrice: '$19.99',
        price: 19.99,
        featuredImage: { url: null, altText: '📸' },
        handle: 'sublimation-photo',
        vendor: 'XT Media',
        productType: 'Photo Printing',
        tags: ['photo', 'sublimation', 'printing', 'custom'],
        variants: [{ id: 'variant-3', availableForSale: true }]
      }
    ]

    // Filter demo products based on current filters
    return baseProducts.filter(product => {
      // Search query filter
      if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      
      // Price filter
      if (product.price < filters.priceMin || product.price > filters.priceMax) {
        return false
      }
      
      // Tags filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => 
          product.tags.some(productTag => 
            productTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
        if (!hasMatchingTag) return false
      }
      
      // Vendor filter
      if (filters.vendors.length > 0 && !filters.vendors.includes(product.vendor)) {
        return false
      }

      return true
    })
  }, [searchQuery, filters])

  // Check if we should show all products (no query and no filters)
  const hasActiveFilters = Object.values(filters).some(value => {
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'string') return value !== 'all' && value !== 'relevance'
    if (typeof value === 'number') return value !== 0 && value !== 500
    return false
  })
  
  const shouldShowAllProducts = !searchQuery && !hasActiveFilters

  // Fetch data with React Query
  const searchResult = useProductSearchWithFallback(searchQuery, filters, getFallbackProducts, {
    enabled: !shouldShowAllProducts
  })
  
  const fallbackResult = useProductsWithFallback(getFallbackProducts, 50, {
    enabled: shouldShowAllProducts
  })
  
  // Use the appropriate result based on whether we're searching or showing all
  const { 
    data: products = [], 
    isLoading: productsLoading, 
    error: productsError 
  } = shouldShowAllProducts ? fallbackResult : searchResult

  const { data: suggestions = [] } = useProductSuggestions(suggestionsQuery)
  const { data: collections = [] } = useCollections()
  const { data: filterOptions } = useFilterOptions(products)

  // Update URL when search/filters change
  useEffect(() => {
    const params = new URLSearchParams()
    
    if (searchQuery) params.set('q', searchQuery)
    if (filters.sortBy !== 'relevance') params.set('sort', filters.sortBy)
    if (filters.availability !== 'all') params.set('availability', filters.availability)
    if (filters.priceMin > 0) params.set('min_price', filters.priceMin)
    if (filters.priceMax < 500) params.set('max_price', filters.priceMax)
    
    filters.collections.forEach(collection => params.append('collection', collection))
    filters.tags.forEach(tag => params.append('tag', tag))
    filters.vendors.forEach(vendor => params.append('vendor', vendor))
    
    setSearchParams(params)
  }, [searchQuery, filters, setSearchParams])

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query)
    setSuggestionsQuery('') // Clear suggestions
    
    // If query is empty, also reset filters to make it more intuitive
    if (!query.trim()) {
      setFilters(prev => ({
        ...prev,
        sortBy: 'relevance'
      }))
    }
  }

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion.title)
    setSuggestionsQuery('')
  }

  // Handle filters change
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
  }

  // Handle add to cart
  const handleAddToCart = async (product) => {
    try {
      const variantId = product.variants[0]?.id
      if (!variantId) {
        alert(t('errors.noVariant'))
        return
      }
      
      await addToCart(variantId, 1)
      alert(t('cart.addedToCart', { product: product.title }))
    } catch (error) {
      alert(t('errors.addToCart', { error: error.message }))
    }
  }

  // Get available filter data
  const availableCollections = collections.map(collection => ({
    id: collection.id,
    title: collection.title,
    productCount: collection.productCount
  }))

  const availableTags = filterOptions?.tags || ['cotton', 'wood', 'metal', 'photo', 'custom', 'laser', 'sublimation']
  const availableVendors = filterOptions?.vendors || ['XT Media']
  const priceRange = filterOptions?.priceRange || { min: 0, max: 500 }

  return (
    <div className="product-search-page">
      {/* Page Header */}
      <div className="search-header">
        <div className="search-header-content">
          <h1 className="page-title">{t('productSearch.title')}</h1>
          
          <SearchBar
            onSearch={handleSearch}
            onSuggestionSelect={handleSuggestionSelect}
            suggestions={suggestions}
            placeholder={t('productSearch.searchPlaceholder')}
            className="main-search-bar"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="search-content">
        <aside className="search-sidebar">
          <ProductFilters
            onFiltersChange={handleFiltersChange}
            availableCollections={availableCollections}
            availableTags={availableTags}
            availableVendors={availableVendors}
            priceRange={priceRange}
            initialFilters={filters}
          />
        </aside>

        <main className="search-results">
          <ShopifyErrorBoundary fallbackMessage={t('productSearch.errorLoading')}>
            
            {/* Results Header */}
            <div className="results-header">
              <div className="results-info">
                {searchQuery && (
                  <h2 className="results-title">
                    {t('productSearch.resultsFor', { query: searchQuery })}
                  </h2>
                )}
                <p className="results-count">
                  {productsLoading 
                    ? t('productSearch.searching')
                    : t('productSearch.resultCount', { count: products.length })
                  }
                </p>
              </div>
              
              {productsError && (
                <div className="error-message">
                  <p>⚠️ {t('productSearch.usingDemo')}</p>
                </div>
              )}
            </div>

            {/* Results Grid */}
            {productsLoading ? (
              <ProductGridSkeleton count={12} />
            ) : products.length > 0 ? (
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
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>{t('productSearch.noResults.title')}</h3>
                <p>{t('productSearch.noResults.message')}</p>
                <button 
                  onClick={() => {
                    setSearchQuery('')
                    setFilters({
                      collections: [],
                      tags: [],
                      vendors: [],
                      priceMin: 0,
                      priceMax: 500,
                      availability: 'all',
                      sortBy: 'relevance'
                    })
                  }}
                  className="btn-primary"
                >
                  {t('productSearch.noResults.clearFilters')}
                </button>
              </div>
            )}
            
          </ShopifyErrorBoundary>
        </main>
      </div>
    </div>
  )
}

export default ProductSearch