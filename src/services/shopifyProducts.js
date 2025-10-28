import { shopifyClient, formatPrice } from '../config/shopify'

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