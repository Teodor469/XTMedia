// Google Analytics 4 Enhanced Ecommerce Service

class AnalyticsService {
  constructor() {
    this.isInitialized = false
    this.gtag = null
    this.measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
  }

  // Initialize Google Analytics
  init() {
    if (this.isInitialized || !this.measurementId) return

    // Create script tag for gtag
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function() {
      window.dataLayer.push(arguments)
    }

    this.gtag = window.gtag
    this.gtag('js', new Date())
    this.gtag('config', this.measurementId, {
      // Enhanced Ecommerce configuration
      send_page_view: true,
      allow_google_signals: true,
      allow_ad_personalization_signals: true,
      cookie_flags: 'SameSite=None;Secure'
    })

    this.isInitialized = true
    console.log('Google Analytics initialized:', this.measurementId)
  }

  // Track page views
  trackPageView(page_title, page_location) {
    if (!this.isInitialized) return

    this.gtag('config', this.measurementId, {
      page_title,
      page_location
    })
  }

  // Enhanced Ecommerce Events

  // Track when user views product list
  trackViewItemList(items, listName = 'Product Search Results') {
    if (!this.isInitialized) return

    this.gtag('event', 'view_item_list', {
      item_list_name: listName,
      items: items.map(this.formatProductItem)
    })
  }

  // Track when user views a product
  trackViewItem(product) {
    if (!this.isInitialized) return

    this.gtag('event', 'view_item', {
      currency: 'USD',
      value: parseFloat(product.price) || 0,
      items: [this.formatProductItem(product)]
    })
  }

  // Track when user adds item to cart
  trackAddToCart(product, quantity = 1) {
    if (!this.isInitialized) return

    const value = (parseFloat(product.price) || 0) * quantity

    this.gtag('event', 'add_to_cart', {
      currency: 'USD',
      value: value,
      items: [this.formatProductItem(product, quantity)]
    })
  }

  // Track when user removes item from cart
  trackRemoveFromCart(product, quantity = 1) {
    if (!this.isInitialized) return

    const value = (parseFloat(product.price) || 0) * quantity

    this.gtag('event', 'remove_from_cart', {
      currency: 'USD',
      value: value,
      items: [this.formatProductItem(product, quantity)]
    })
  }

  // Track when user begins checkout
  trackBeginCheckout(cartItems, totalValue) {
    if (!this.isInitialized) return

    this.gtag('event', 'begin_checkout', {
      currency: 'USD',
      value: totalValue,
      items: cartItems.map(item => this.formatProductItem(item.variant || item, item.quantity))
    })
  }

  // Track purchase completion
  trackPurchase(transactionId, cartItems, totalValue, tax = 0, shipping = 0) {
    if (!this.isInitialized) return

    this.gtag('event', 'purchase', {
      transaction_id: transactionId,
      currency: 'USD',
      value: totalValue,
      tax: tax,
      shipping: shipping,
      items: cartItems.map(item => this.formatProductItem(item.variant || item, item.quantity))
    })
  }

  // Track search
  trackSearch(searchTerm, resultsCount = 0) {
    if (!this.isInitialized) return

    this.gtag('event', 'search', {
      search_term: searchTerm,
      results_count: resultsCount
    })
  }

  // Track quote requests
  trackGenerateLead(method = 'quote_form') {
    if (!this.isInitialized) return

    this.gtag('event', 'generate_lead', {
      method: method,
      event_category: 'engagement'
    })
  }

  // Track contact form submissions
  trackContact(method = 'contact_form') {
    if (!this.isInitialized) return

    this.gtag('event', 'contact', {
      method: method,
      event_category: 'engagement'
    })
  }

  // Track user engagement
  trackEngagement(action, category = 'user_engagement') {
    if (!this.isInitialized) return

    this.gtag('event', action, {
      event_category: category
    })
  }

  // Track custom events
  trackEvent(eventName, parameters = {}) {
    if (!this.isInitialized) return

    this.gtag('event', eventName, parameters)
  }

  // Helper method to format product items for GA4
  formatProductItem(product, quantity = 1) {
    return {
      item_id: product.id || product.handle,
      item_name: product.title,
      item_category: product.productType || 'Custom Products',
      item_variant: product.variants?.[0]?.title || 'Default',
      price: parseFloat(product.price) || 0,
      quantity: quantity,
      item_brand: product.vendor || 'XT Media'
    }
  }

  // Set user properties
  setUserProperties(properties) {
    if (!this.isInitialized) return

    this.gtag('config', this.measurementId, {
      custom_map: properties
    })
  }

  // Set user ID for cross-device tracking
  setUserId(userId) {
    if (!this.isInitialized) return

    this.gtag('config', this.measurementId, {
      user_id: userId
    })
  }
}

// Create singleton instance
const analytics = new AnalyticsService()

export default analytics