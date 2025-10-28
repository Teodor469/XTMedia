import { shopifyClient, formatPrice } from '../config/shopify'

// Shopify search and filter utilities
const SORT_KEY_MAP = {
  'relevance': 'RELEVANCE',
  'price_asc': 'PRICE',
  'price_desc': 'PRICE',
  'created_desc': 'CREATED_AT',
  'title_asc': 'TITLE',
  'updated_desc': 'UPDATED_AT'
}

const buildSearchFilters = (filters = {}) => {
  const searchFilters = []
  
  // Price range filter
  if (filters.priceMin !== undefined && filters.priceMin > 0) {
    searchFilters.push(`variants.price:>=${filters.priceMin}`)
  }
  if (filters.priceMax !== undefined && filters.priceMax < 99999) {
    searchFilters.push(`variants.price:<=${filters.priceMax}`)
  }
  
  // Vendor filter
  if (filters.vendors && filters.vendors.length > 0) {
    const vendorQuery = filters.vendors.map(vendor => `vendor:${vendor}`).join(' OR ')
    searchFilters.push(`(${vendorQuery})`)
  }
  
  // Product type filter
  if (filters.productTypes && filters.productTypes.length > 0) {
    const typeQuery = filters.productTypes.map(type => `product_type:${type}`).join(' OR ')
    searchFilters.push(`(${typeQuery})`)
  }
  
  // Tags filter
  if (filters.tags && filters.tags.length > 0) {
    filters.tags.forEach(tag => {
      searchFilters.push(`tag:${tag}`)
    })
  }
  
  // Availability filter
  if (filters.availability === 'in_stock') {
    searchFilters.push('available:true')
  } else if (filters.availability === 'out_of_stock') {
    searchFilters.push('available:false')
  }
  
  return searchFilters.join(' AND ')
}

class ShopifyProductService {
  
  // Fetch all products
  async fetchProducts(limit = 20) {
    try {
      const products = await shopifyClient.product.fetchAll(limit)
      return products.map(this.transformProduct)
    } catch (error) {
      console.error('Error fetching products:', error)
      throw new Error('Failed to fetch products')
    }
  }

  // Fetch product by handle
  async fetchProductByHandle(handle) {
    try {
      const product = await shopifyClient.product.fetchByHandle(handle)
      return this.transformProduct(product)
    } catch (error) {
      console.error('Error fetching product:', error)
      throw new Error('Failed to fetch product')
    }
  }

  // Fetch products by collection
  async fetchProductsByCollection(collectionId, limit = 20) {
    try {
      const collection = await shopifyClient.collection.fetchWithProducts(collectionId, { productsFirst: limit })
      return collection.products.map(this.transformProduct)
    } catch (error) {
      console.error('Error fetching collection products:', error)
      throw new Error('Failed to fetch collection products')
    }
  }

  // Search products with filters
  async searchProducts(query = '', filters = {}, limit = 20) {
    try {
      const searchFilters = buildSearchFilters(filters)
      const fullQuery = [query, searchFilters].filter(Boolean).join(' AND ')
      
      const sortKey = SORT_KEY_MAP[filters.sortBy] || 'RELEVANCE'
      const reverse = filters.sortBy === 'price_desc'
      
      const searchOptions = {
        query: fullQuery || '*',
        sortKey,
        reverse,
        first: limit
      }
      
      const products = await shopifyClient.product.search(searchOptions)
      return products.map(this.transformProduct)
    } catch (error) {
      console.error('Error searching products:', error)
      throw new Error('Failed to search products')
    }
  }

  // Get product suggestions for autocomplete
  async getProductSuggestions(query, limit = 5) {
    try {
      if (!query || query.length < 2) return []
      
      const products = await shopifyClient.product.search({
        query: `title:*${query}*`,
        first: limit
      })
      
      return products.map(product => ({
        id: product.id,
        handle: product.handle,
        title: product.title,
        price: product.variants[0]?.price,
        formattedPrice: formatPrice(product.variants[0]?.price || '0'),
        productType: product.productType,
        image: product.images[0]?.src
      }))
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      return []
    }
  }

  // Fetch collections for filter options
  async fetchCollections(limit = 50) {
    try {
      const collections = await shopifyClient.collection.fetchAll(limit)
      return collections.map(collection => ({
        id: collection.id,
        handle: collection.handle,
        title: collection.title,
        description: collection.description,
        productCount: collection.products ? collection.products.length : 0,
        image: collection.image ? {
          url: collection.image.src,
          altText: collection.image.altText
        } : null
      }))
    } catch (error) {
      console.error('Error fetching collections:', error)
      return []
    }
  }

  // Get available filter options from products
  async getFilterOptions(products = []) {
    const vendors = new Set()
    const tags = new Set()
    const productTypes = new Set()
    let minPrice = Infinity
    let maxPrice = 0
    
    products.forEach(product => {
      if (product.vendor) vendors.add(product.vendor)
      if (product.productType) productTypes.add(product.productType)
      if (product.tags) {
        product.tags.forEach(tag => tags.add(tag))
      }
      
      const price = parseFloat(product.price || 0)
      if (price > 0) {
        minPrice = Math.min(minPrice, price)
        maxPrice = Math.max(maxPrice, price)
      }
    })
    
    return {
      vendors: Array.from(vendors).sort(),
      tags: Array.from(tags).sort(),
      productTypes: Array.from(productTypes).sort(),
      priceRange: {
        min: minPrice === Infinity ? 0 : Math.floor(minPrice),
        max: maxPrice === 0 ? 500 : Math.ceil(maxPrice)
      }
    }
  }

  // Transform Shopify product to our format
  transformProduct(shopifyProduct) {
    if (!shopifyProduct) return null

    return {
      id: shopifyProduct.id,
      handle: shopifyProduct.handle,
      title: shopifyProduct.title,
      description: shopifyProduct.description,
      descriptionHtml: shopifyProduct.descriptionHtml,
      vendor: shopifyProduct.vendor,
      productType: shopifyProduct.productType,
      tags: shopifyProduct.tags,
      
      // Price information
      price: parseFloat(shopifyProduct.variants[0]?.price || '0'),
      compareAtPrice: parseFloat(shopifyProduct.variants[0]?.compareAtPrice || '0'),
      formattedPrice: formatPrice(shopifyProduct.variants[0]?.price || '0'),
      priceRange: {
        min: Math.min(...shopifyProduct.variants.map(v => parseFloat(v.price))),
        max: Math.max(...shopifyProduct.variants.map(v => parseFloat(v.price)))
      },
      
      // Images
      images: shopifyProduct.images.map(image => ({
        id: image.id,
        url: image.src,
        altText: image.altText,
        width: image.width,
        height: image.height
      })),
      featuredImage: shopifyProduct.images[0] ? {
        id: shopifyProduct.images[0].id,
        url: shopifyProduct.images[0].src,
        altText: shopifyProduct.images[0].altText
      } : null,
      
      // Variants
      variants: shopifyProduct.variants.map(variant => ({
        id: variant.id,
        title: variant.title,
        price: parseFloat(variant.price),
        formattedPrice: formatPrice(variant.price),
        compareAtPrice: parseFloat(variant.compareAtPrice || '0'),
        availableForSale: variant.available,
        sku: variant.sku,
        weight: variant.weight,
        selectedOptions: variant.selectedOptions.map(option => ({
          name: option.name,
          value: option.value
        })),
        image: variant.image ? {
          id: variant.image.id,
          url: variant.image.src,
          altText: variant.image.altText
        } : null
      })),
      
      // Availability
      availableForSale: shopifyProduct.availableForSale,
      
      // Options (like Size, Color, etc.)
      options: shopifyProduct.options.map(option => ({
        id: option.id,
        name: option.name,
        values: option.values.map(value => ({
          value: value.value,
          name: value.name
        }))
      })),
      
      // SEO
      seo: {
        title: shopifyProduct.title,
        description: shopifyProduct.description
      },
      
      // Timestamps
      createdAt: shopifyProduct.createdAt,
      updatedAt: shopifyProduct.updatedAt
    }
  }

  // Get default variant for a product
  getDefaultVariant(product) {
    return product.variants?.[0] || null
  }

  // Check if product is in stock
  isInStock(product) {
    return product.availableForSale && product.variants.some(variant => variant.availableForSale)
  }

  // Get variant by selected options
  getVariantBySelectedOptions(product, selectedOptions) {
    return product.variants.find(variant => {
      return variant.selectedOptions.every(option => 
        selectedOptions[option.name] === option.value
      )
    })
  }

  // Get product URL
  getProductUrl(product) {
    return `/products/${product.handle}`
  }
}

// Create and export service instance
export const shopifyProductService = new ShopifyProductService()

// Helper functions for components
export const createProductPreview = (products, limit = 8) => {
  return products.slice(0, limit).map(product => ({
    id: product.id,
    title: product.title,
    price: product.formattedPrice,
    image: product.featuredImage?.url,
    handle: product.handle,
    description: product.description.substring(0, 100) + '...'
  }))
}