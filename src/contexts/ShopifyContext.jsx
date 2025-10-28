import { createContext, useContext, useReducer, useEffect } from 'react'
import { shopifyClient } from '../config/shopify'

// Cart actions
const CART_ACTIONS = {
  SET_CHECKOUT: 'SET_CHECKOUT',
  ADD_LINE_ITEM: 'ADD_LINE_ITEM',
  UPDATE_LINE_ITEM: 'UPDATE_LINE_ITEM',
  REMOVE_LINE_ITEM: 'REMOVE_LINE_ITEM',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR'
}

// Initial state
const initialState = {
  checkout: null,
  lineItems: [],
  subtotal: '0.00',
  totalTax: '0.00',
  totalPrice: '0.00',
  isLoading: false,
  error: null
}

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_CHECKOUT:
      return {
        ...state,
        checkout: action.payload,
        lineItems: action.payload?.lineItems || [],
        subtotal: action.payload?.subtotalPrice?.amount || '0.00',
        totalTax: action.payload?.totalTax?.amount || '0.00',
        totalPrice: action.payload?.totalPrice?.amount || '0.00'
      }
    
    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    
    case CART_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    
    case CART_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    
    default:
      return state
  }
}

// Create context
const ShopifyContext = createContext()

// Provider component
export const ShopifyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Initialize checkout on mount
  useEffect(() => {
    initializeCheckout()
  }, [])

  // Initialize or restore checkout from localStorage
  const initializeCheckout = async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true })
      
      // Check if Shopify is properly configured
      const isShopifyConfigured = 
        import.meta.env.VITE_SHOPIFY_DOMAIN && 
        import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN &&
        import.meta.env.VITE_SHOPIFY_DOMAIN !== 'demo-store.myshopify.com' &&
        import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN !== 'demo-token'
      
      if (!isShopifyConfigured) {
        // Create a mock checkout for demo mode
        const mockCheckout = {
          id: 'demo-checkout',
          lineItems: [],
          subtotalPrice: { amount: '0.00', currencyCode: 'USD' },
          totalTax: { amount: '0.00', currencyCode: 'USD' },
          totalPrice: { amount: '0.00', currencyCode: 'USD' },
          webUrl: null,
          completedAt: null
        }
        dispatch({ type: CART_ACTIONS.SET_CHECKOUT, payload: mockCheckout })
        dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false })
        return
      }
      
      // Try to restore checkout from localStorage
      const savedCheckoutId = localStorage.getItem('shopify_checkout_id')
      
      if (savedCheckoutId) {
        try {
          const checkout = await shopifyClient.checkout.fetch(savedCheckoutId)
          if (!checkout.completedAt) {
            dispatch({ type: CART_ACTIONS.SET_CHECKOUT, payload: checkout })
            dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false })
            return
          }
        } catch {
          console.warn('Saved checkout not found, creating new one')
        }
      }
      
      // Create new checkout
      const checkout = await shopifyClient.checkout.create()
      localStorage.setItem('shopify_checkout_id', checkout.id)
      dispatch({ type: CART_ACTIONS.SET_CHECKOUT, payload: checkout })
      
    } catch (error) {
      console.warn('Shopify initialization failed, using demo mode:', error.message)
      // Create a mock checkout for demo mode
      const mockCheckout = {
        id: 'demo-checkout',
        lineItems: [],
        subtotalPrice: { amount: '0.00', currencyCode: 'USD' },
        totalTax: { amount: '0.00', currencyCode: 'USD' },
        totalPrice: { amount: '0.00', currencyCode: 'USD' },
        webUrl: null,
        completedAt: null
      }
      dispatch({ type: CART_ACTIONS.SET_CHECKOUT, payload: mockCheckout })
    } finally {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false })
    }
  }

  // Add item to cart
  const addToCart = async (variantId, quantity = 1) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true })
      dispatch({ type: CART_ACTIONS.CLEAR_ERROR })

      // Handle demo mode
      if (state.checkout.id === 'demo-checkout') {
        // Create a mock line item for demo
        const mockLineItem = {
          id: `demo-item-${Date.now()}`,
          title: 'Demo Product',
          quantity: parseInt(quantity, 10),
          variant: {
            id: variantId,
            title: 'Default',
            price: '19.99',
            image: null
          }
        }
        
        const updatedCheckout = {
          ...state.checkout,
          lineItems: [...state.lineItems, mockLineItem]
        }
        
        // Calculate totals
        const subtotal = updatedCheckout.lineItems.reduce((sum, item) => 
          sum + (parseFloat(item.variant.price) * item.quantity), 0
        ).toFixed(2)
        
        updatedCheckout.subtotalPrice = { amount: subtotal, currencyCode: 'USD' }
        updatedCheckout.totalPrice = { amount: subtotal, currencyCode: 'USD' }
        
        dispatch({ type: CART_ACTIONS.SET_CHECKOUT, payload: updatedCheckout })
        return updatedCheckout
      }

      const lineItemsToAdd = [{
        variantId,
        quantity: parseInt(quantity, 10)
      }]

      const checkout = await shopifyClient.checkout.addLineItems(state.checkout.id, lineItemsToAdd)
      dispatch({ type: CART_ACTIONS.SET_CHECKOUT, payload: checkout })
      
      return checkout
    } catch (error) {
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message })
      throw error
    } finally {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false })
    }
  }

  // Remove item from cart
  const removeFromCart = async (lineItemId) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true })
      dispatch({ type: CART_ACTIONS.CLEAR_ERROR })

      const checkout = await shopifyClient.checkout.removeLineItems(state.checkout.id, [lineItemId])
      dispatch({ type: CART_ACTIONS.SET_CHECKOUT, payload: checkout })
      
      return checkout
    } catch (error) {
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message })
      throw error
    } finally {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false })
    }
  }

  // Update item quantity
  const updateCartItemQuantity = async (lineItemId, quantity) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true })
      dispatch({ type: CART_ACTIONS.CLEAR_ERROR })

      const lineItemsToUpdate = [{
        id: lineItemId,
        quantity: parseInt(quantity, 10)
      }]

      const checkout = await shopifyClient.checkout.updateLineItems(state.checkout.id, lineItemsToUpdate)
      dispatch({ type: CART_ACTIONS.SET_CHECKOUT, payload: checkout })
      
      return checkout
    } catch (error) {
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message })
      throw error
    } finally {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false })
    }
  }

  // Get cart item count
  const getCartItemCount = () => {
    return state.lineItems.reduce((total, item) => total + item.quantity, 0)
  }

  // Clear cart
  const clearCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true })
      
      const lineItemIds = state.lineItems.map(item => item.id)
      if (lineItemIds.length > 0) {
        const checkout = await shopifyClient.checkout.removeLineItems(state.checkout.id, lineItemIds)
        dispatch({ type: CART_ACTIONS.SET_CHECKOUT, payload: checkout })
      }
    } catch (error) {
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message })
    } finally {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false })
    }
  }

  // Context value
  const value = {
    // State
    ...state,
    cartItemCount: getCartItemCount(),
    
    // Actions
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    clearError: () => dispatch({ type: CART_ACTIONS.CLEAR_ERROR })
  }

  return (
    <ShopifyContext.Provider value={value}>
      {children}
    </ShopifyContext.Provider>
  )
}

// Hook to use the context
// eslint-disable-next-line react-refresh/only-export-components
export const useShopify = () => {
  const context = useContext(ShopifyContext)
  if (!context) {
    throw new Error('useShopify must be used within a ShopifyProvider')
  }
  return context
}