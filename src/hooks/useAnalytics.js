import { useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import analytics from '../services/analytics'

export const useAnalytics = () => {
  const location = useLocation()

  // Initialize analytics on mount
  useEffect(() => {
    analytics.init()
  }, [])

  // Track page views when location changes
  useEffect(() => {
    if (analytics.isInitialized) {
      const pageTitle = document.title
      const pageLocation = window.location.href
      analytics.trackPageView(pageTitle, pageLocation)
    }
  }, [location])

  // Return analytics methods wrapped in useCallback for performance
  const trackAddToCart = useCallback((product, quantity) => {
    analytics.trackAddToCart(product, quantity)
  }, [])

  const trackRemoveFromCart = useCallback((product, quantity) => {
    analytics.trackRemoveFromCart(product, quantity)
  }, [])

  const trackViewItem = useCallback((product) => {
    analytics.trackViewItem(product)
  }, [])

  const trackViewItemList = useCallback((items, listName) => {
    analytics.trackViewItemList(items, listName)
  }, [])

  const trackSearch = useCallback((searchTerm, resultsCount) => {
    analytics.trackSearch(searchTerm, resultsCount)
  }, [])

  const trackBeginCheckout = useCallback((cartItems, totalValue) => {
    analytics.trackBeginCheckout(cartItems, totalValue)
  }, [])

  const trackPurchase = useCallback((transactionId, cartItems, totalValue, tax, shipping) => {
    analytics.trackPurchase(transactionId, cartItems, totalValue, tax, shipping)
  }, [])

  const trackGenerateLead = useCallback((method) => {
    analytics.trackGenerateLead(method)
  }, [])

  const trackContact = useCallback((method) => {
    analytics.trackContact(method)
  }, [])

  const trackEngagement = useCallback((action, category) => {
    analytics.trackEngagement(action, category)
  }, [])

  const trackEvent = useCallback((eventName, parameters) => {
    analytics.trackEvent(eventName, parameters)
  }, [])

  return {
    trackAddToCart,
    trackRemoveFromCart,
    trackViewItem,
    trackViewItemList,
    trackSearch,
    trackBeginCheckout,
    trackPurchase,
    trackGenerateLead,
    trackContact,
    trackEngagement,
    trackEvent
  }
}