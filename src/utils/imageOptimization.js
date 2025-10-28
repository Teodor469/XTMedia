/**
 * Shopify Image Transformation Utilities
 * Shopify CDN supports various transformations via URL parameters
 * Documentation: https://shopify.dev/api/liquid/filters/url-filters#image-filters
 */

// Common image sizes for different use cases
export const IMAGE_SIZES = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 300 },
  medium: { width: 600, height: 600 },
  large: { width: 1200, height: 1200 },
  hero: { width: 1920, height: 1080 },
  // Product specific sizes
  productCard: { width: 400, height: 400 },
  productDetail: { width: 800, height: 800 },
  productZoom: { width: 1600, height: 1600 },
  // Gallery sizes
  galleryThumb: { width: 200, height: 200 },
  galleryMedium: { width: 500, height: 500 },
  galleryLarge: { width: 1000, height: 1000 }
}

// Image quality levels
export const IMAGE_QUALITY = {
  low: 30,
  medium: 60,
  high: 80,
  max: 95
}

/**
 * Transforms a Shopify image URL with optimization parameters
 * @param {string} imageUrl - Original Shopify image URL
 * @param {Object} options - Transformation options
 * @returns {string} Optimized image URL
 */
export const optimizeShopifyImage = (imageUrl, options = {}) => {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return null
  }

  // Skip if not a Shopify CDN URL
  if (!imageUrl.includes('cdn.shopify.com') && !imageUrl.includes('shopify.com')) {
    return imageUrl
  }

  const {
    width,
    height,
    quality = IMAGE_QUALITY.high,
    format = 'webp', // webp, jpg, png
    crop = 'center', // center, top, bottom, left, right
    scale = 1 // 1, 2, 3 for retina displays
  } = options

  let optimizedUrl = imageUrl

  // Remove existing parameters to avoid conflicts
  const urlParts = optimizedUrl.split('?')
  optimizedUrl = urlParts[0]

  const params = new URLSearchParams()

  // Add width parameter
  if (width) {
    params.set('width', Math.round(width * scale))
  }

  // Add height parameter
  if (height) {
    params.set('height', Math.round(height * scale))
  }

  // Add quality parameter (only for jpg/webp)
  if (format !== 'png' && quality) {
    params.set('quality', quality)
  }

  // Add format parameter
  if (format) {
    params.set('format', format)
  }

  // Add crop parameter
  if (crop && (width || height)) {
    params.set('crop', crop)
  }

  const paramString = params.toString()
  return paramString ? `${optimizedUrl}?${paramString}` : optimizedUrl
}

/**
 * Creates a srcSet string for responsive images
 * @param {string} imageUrl - Original image URL
 * @param {Array} sizes - Array of size objects
 * @returns {string} srcSet string
 */
export const createSrcSet = (imageUrl, sizes = []) => {
  if (!imageUrl || !sizes.length) return ''

  return sizes
    .map(({ width, scale = 1 }) => {
      const optimizedUrl = optimizeShopifyImage(imageUrl, { width, scale })
      return `${optimizedUrl} ${width * scale}w`
    })
    .join(', ')
}

/**
 * Creates sizes attribute for responsive images
 * @param {Object} breakpoints - Breakpoint configuration
 * @returns {string} sizes attribute string
 */
export const createSizes = (breakpoints = {}) => {
  const defaultBreakpoints = {
    mobile: { maxWidth: 768, imageWidth: '100vw' },
    tablet: { maxWidth: 1024, imageWidth: '50vw' },
    desktop: { imageWidth: '33vw' }
  }

  const config = { ...defaultBreakpoints, ...breakpoints }
  
  const sizeRules = []

  // Add mobile and tablet rules
  Object.entries(config).forEach(([, { maxWidth, imageWidth }]) => {
    if (maxWidth) {
      sizeRules.push(`(max-width: ${maxWidth}px) ${imageWidth}`)
    }
  })

  // Add default desktop rule
  if (config.desktop?.imageWidth) {
    sizeRules.push(config.desktop.imageWidth)
  }

  return sizeRules.join(', ')
}

/**
 * Get optimized image props for different use cases
 */
export const getImageProps = {
  productCard: (imageUrl) => ({
    src: optimizeShopifyImage(imageUrl, IMAGE_SIZES.productCard),
    srcSet: createSrcSet(imageUrl, [
      { width: 200, scale: 1 },
      { width: 400, scale: 1 },
      { width: 400, scale: 2 }
    ]),
    sizes: createSizes({
      mobile: { maxWidth: 768, imageWidth: '50vw' },
      desktop: { imageWidth: '400px' }
    })
  }),

  productDetail: (imageUrl) => ({
    src: optimizeShopifyImage(imageUrl, IMAGE_SIZES.productDetail),
    srcSet: createSrcSet(imageUrl, [
      { width: 400, scale: 1 },
      { width: 800, scale: 1 },
      { width: 800, scale: 2 }
    ]),
    sizes: createSizes({
      mobile: { maxWidth: 768, imageWidth: '100vw' },
      desktop: { imageWidth: '800px' }
    })
  }),

  galleryThumbnail: (imageUrl) => ({
    src: optimizeShopifyImage(imageUrl, IMAGE_SIZES.galleryThumb),
    srcSet: createSrcSet(imageUrl, [
      { width: 100, scale: 1 },
      { width: 200, scale: 1 },
      { width: 200, scale: 2 }
    ]),
    sizes: '200px'
  }),

  hero: (imageUrl) => ({
    src: optimizeShopifyImage(imageUrl, IMAGE_SIZES.hero),
    srcSet: createSrcSet(imageUrl, [
      { width: 768, scale: 1 },
      { width: 1024, scale: 1 },
      { width: 1920, scale: 1 }
    ]),
    sizes: '100vw'
  })
}

/**
 * Lazy loading intersection observer utility
 */
export const createLazyLoadObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  }

  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers without IntersectionObserver
    callback()
    return null
  }

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target)
      }
    })
  }, { ...defaultOptions, ...options })
}

/**
 * Check if WebP is supported
 */
export const isWebPSupported = (() => {
  let supported
  return () => {
    if (supported !== undefined) return supported
    
    if (typeof window === 'undefined') return false
    
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    supported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0
    return supported
  }
})()