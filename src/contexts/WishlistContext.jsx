import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useToast } from './ToastContext'

const WishlistContext = createContext()

const STORAGE_KEY = 'xtmedia_wishlist'

export function WishlistProvider({ children }) {
  const { success, error: showError } = useToast()
  const [wishlist, setWishlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(STORAGE_KEY)
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist))
      }
    } catch (err) {
      console.error('Failed to load wishlist:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist))
      } catch (err) {
        console.error('Failed to save wishlist:', err)
      }
    }
  }, [wishlist, isLoading])

  /**
   * Add product to wishlist
   */
  const addToWishlist = (product) => {
    // Check if already in wishlist
    const exists = wishlist.some((item) => item.id === product.id)
    if (exists) {
      showError('This item is already in your wishlist')
      return
    }

    // Add product with timestamp
    const wishlistItem = {
      id: product.id,
      title: product.title,
      handle: product.handle,
      price: product.price,
      formattedPrice: product.formattedPrice,
      featuredImage: product.featuredImage,
      variants: product.variants,
      description: product.description,
      addedAt: new Date().toISOString()
    }

    setWishlist((prev) => [...prev, wishlistItem])
    success(`${product.title} added to wishlist!`)
  }

  /**
   * Remove product from wishlist
   */
  const removeFromWishlist = (productId) => {
    const product = wishlist.find((item) => item.id === productId)
    setWishlist((prev) => prev.filter((item) => item.id !== productId))

    if (product) {
      success(`${product.title} removed from wishlist`)
    }
  }

  /**
   * Toggle product in wishlist
   */
  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some((item) => item.id === product.id)
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  /**
   * Check if product is in wishlist
   */
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId)
  }

  /**
   * Clear entire wishlist
   */
  const clearWishlist = () => {
    setWishlist([])
    success('Wishlist cleared')
  }

  /**
   * Get wishlist count
   */
  const getWishlistCount = () => {
    return wishlist.length
  }

  const value = {
    wishlist,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistCount
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

export default WishlistContext
