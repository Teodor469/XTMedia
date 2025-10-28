import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './ProductFilters.css'

const ProductFilters = ({
  onFiltersChange,
  availableCollections = [],
  availableTags = [],
  availableVendors = [],
  priceRange = { min: 0, max: 500 },
  initialFilters = {},
  className = ''
}) => {
  const { t } = useTranslation()
  
  const [filters, setFilters] = useState({
    collections: [],
    tags: [],
    vendors: [],
    priceMin: priceRange.min,
    priceMax: priceRange.max,
    availability: 'all', // 'all', 'in_stock', 'out_of_stock'
    sortBy: 'relevance', // 'relevance', 'price_asc', 'price_desc', 'created_desc', 'title_asc'
    ...initialFilters
  })

  const [isExpanded, setIsExpanded] = useState(false)
  const [priceInputs, setPriceInputs] = useState({
    min: filters.priceMin,
    max: filters.priceMax
  })

  // Update parent when filters change
  useEffect(() => {
    onFiltersChange?.(filters)
  }, [filters, onFiltersChange])

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const toggleArrayFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }))
  }

  const handlePriceChange = (type, value) => {
    const numValue = parseFloat(value) || 0
    setPriceInputs(prev => ({
      ...prev,
      [type]: numValue
    }))
  }

  const applyPriceFilter = () => {
    setFilters(prev => ({
      ...prev,
      priceMin: Math.min(priceInputs.min, priceInputs.max),
      priceMax: Math.max(priceInputs.min, priceInputs.max)
    }))
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      collections: [],
      tags: [],
      vendors: [],
      priceMin: priceRange.min,
      priceMax: priceRange.max,
      availability: 'all',
      sortBy: 'relevance'
    }
    setFilters(clearedFilters)
    setPriceInputs({
      min: priceRange.min,
      max: priceRange.max
    })
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (filters.collections.length > 0) count++
    if (filters.tags.length > 0) count++
    if (filters.vendors.length > 0) count++
    if (filters.priceMin > priceRange.min || filters.priceMax < priceRange.max) count++
    if (filters.availability !== 'all') count++
    if (filters.sortBy !== 'relevance') count++
    return count
  }

  const activeCount = getActiveFilterCount()

  return (
    <div className={`product-filters ${className}`}>
      {/* Filter Header */}
      <div className="filters-header">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="filters-toggle"
          aria-expanded={isExpanded}
        >
          <span className="filters-title">
            {t('filters.title')} {activeCount > 0 && `(${activeCount})`}
          </span>
          <span className={`filters-arrow ${isExpanded ? 'expanded' : ''}`}>
            ▼
          </span>
        </button>
        
        {activeCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="clear-filters-btn"
          >
            {t('filters.clearAll')}
          </button>
        )}
      </div>

      {/* Filter Content */}
      <div className={`filters-content ${isExpanded ? 'expanded' : ''}`}>
        
        {/* Sort By */}
        <div className="filter-section">
          <h4 className="filter-title">{t('filters.sortBy.title')}</h4>
          <select
            value={filters.sortBy}
            onChange={(e) => updateFilter('sortBy', e.target.value)}
            className="filter-select"
          >
            <option value="relevance">{t('filters.sortBy.relevance')}</option>
            <option value="price_asc">{t('filters.sortBy.priceAsc')}</option>
            <option value="price_desc">{t('filters.sortBy.priceDesc')}</option>
            <option value="created_desc">{t('filters.sortBy.newest')}</option>
            <option value="title_asc">{t('filters.sortBy.titleAsc')}</option>
          </select>
        </div>

        {/* Collections Filter */}
        {availableCollections.length > 0 && (
          <div className="filter-section">
            <h4 className="filter-title">{t('filters.collections.title')}</h4>
            <div className="filter-options">
              {availableCollections.map((collection) => (
                <label key={collection.id} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.collections.includes(collection.id)}
                    onChange={() => toggleArrayFilter('collections', collection.id)}
                  />
                  <span className="checkbox-label">{collection.title}</span>
                  {collection.productCount && (
                    <span className="item-count">({collection.productCount})</span>
                  )}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Price Range Filter */}
        <div className="filter-section">
          <h4 className="filter-title">{t('filters.priceRange.title')}</h4>
          <div className="price-range-filter">
            <div className="price-inputs">
              <div className="price-input-group">
                <label htmlFor="price-min">{t('filters.priceRange.min')}</label>
                <input
                  id="price-min"
                  type="number"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={priceInputs.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                  onBlur={applyPriceFilter}
                  className="price-input"
                />
              </div>
              <span className="price-separator">-</span>
              <div className="price-input-group">
                <label htmlFor="price-max">{t('filters.priceRange.max')}</label>
                <input
                  id="price-max"
                  type="number"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={priceInputs.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                  onBlur={applyPriceFilter}
                  className="price-input"
                />
              </div>
            </div>
            <button
              onClick={applyPriceFilter}
              className="apply-price-btn"
            >
              {t('filters.priceRange.apply')}
            </button>
          </div>
        </div>

        {/* Tags Filter */}
        {availableTags.length > 0 && (
          <div className="filter-section">
            <h4 className="filter-title">{t('filters.tags.title')}</h4>
            <div className="filter-tags">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleArrayFilter('tags', tag)}
                  className={`filter-tag ${filters.tags.includes(tag) ? 'active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Vendors Filter */}
        {availableVendors.length > 0 && (
          <div className="filter-section">
            <h4 className="filter-title">{t('filters.vendors.title')}</h4>
            <div className="filter-options">
              {availableVendors.map((vendor) => (
                <label key={vendor} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.vendors.includes(vendor)}
                    onChange={() => toggleArrayFilter('vendors', vendor)}
                  />
                  <span className="checkbox-label">{vendor}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Availability Filter */}
        <div className="filter-section">
          <h4 className="filter-title">{t('filters.availability.title')}</h4>
          <div className="filter-options">
            <label className="filter-radio">
              <input
                type="radio"
                name="availability"
                value="all"
                checked={filters.availability === 'all'}
                onChange={(e) => updateFilter('availability', e.target.value)}
              />
              <span className="radio-label">{t('filters.availability.all')}</span>
            </label>
            <label className="filter-radio">
              <input
                type="radio"
                name="availability"
                value="in_stock"
                checked={filters.availability === 'in_stock'}
                onChange={(e) => updateFilter('availability', e.target.value)}
              />
              <span className="radio-label">{t('filters.availability.inStock')}</span>
            </label>
            <label className="filter-radio">
              <input
                type="radio"
                name="availability"
                value="out_of_stock"
                checked={filters.availability === 'out_of_stock'}
                onChange={(e) => updateFilter('availability', e.target.value)}
              />
              <span className="radio-label">{t('filters.availability.outOfStock')}</span>
            </label>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductFilters