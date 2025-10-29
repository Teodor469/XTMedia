import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useShopify } from './ShopifyContext'
import { shopifyAuthService } from '../services/shopifyAuth'
import { useToast } from './ToastContext'

const AuthContext = createContext()

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'shopify_customer_token',
  TOKEN_EXPIRY: 'shopify_token_expiry',
  CUSTOMER: 'shopify_customer'
}

export function AuthProvider({ children }) {
  const { client } = useShopify()
  const { success, error: showError } = useToast()
  const [customer, setCustomer] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Initialize auth service and check for existing session
  useEffect(() => {
    if (client) {
      shopifyAuthService.initialize(client)
      checkExistingSession()
    }
  }, [client])

  /**
   * Check for existing session in localStorage
   */
  const checkExistingSession = async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
      const expiry = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY)
      const storedCustomer = localStorage.getItem(STORAGE_KEYS.CUSTOMER)

      if (!token || !expiry) {
        setIsLoading(false)
        return
      }

      // Check if token is expired
      const expiryDate = new Date(expiry)
      const now = new Date()

      if (expiryDate <= now) {
        // Token expired, try to renew
        try {
          const renewed = await shopifyAuthService.renewAccessToken(token)
          saveSession(renewed.accessToken, renewed.expiresAt, JSON.parse(storedCustomer))
        } catch (err) {
          // Renewal failed, clear session
          clearSession()
        }
      } else {
        // Token still valid
        setAccessToken(token)
        setCustomer(JSON.parse(storedCustomer))
        setIsAuthenticated(true)
      }
    } catch (err) {
      console.error('Session check error:', err)
      clearSession()
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Save session to state and localStorage
   */
  const saveSession = (token, expiresAt, customerData) => {
    setAccessToken(token)
    setCustomer(customerData)
    setIsAuthenticated(true)

    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token)
    localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiresAt)
    localStorage.setItem(STORAGE_KEYS.CUSTOMER, JSON.stringify(customerData))
  }

  /**
   * Clear session from state and localStorage
   */
  const clearSession = () => {
    setAccessToken(null)
    setCustomer(null)
    setIsAuthenticated(false)

    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRY)
    localStorage.removeItem(STORAGE_KEYS.CUSTOMER)
  }

  /**
   * Register a new customer
   */
  const register = async ({ email, password, firstName, lastName, acceptsMarketing }) => {
    try {
      setIsLoading(true)

      const result = await shopifyAuthService.register({
        email,
        password,
        firstName,
        lastName,
        acceptsMarketing
      })

      // Save session
      saveSession(result.accessToken.accessToken, result.accessToken.expiresAt, result.customer)

      success(`Welcome, ${firstName}! Your account has been created.`)
      return { success: true, customer: result.customer }
    } catch (err) {
      const errorMessage = err.message || 'Registration failed. Please try again.'
      showError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Login customer
   */
  const login = async (email, password) => {
    try {
      setIsLoading(true)

      const result = await shopifyAuthService.login(email, password)

      // Save session
      saveSession(result.accessToken, result.expiresAt, result.customer)

      success(`Welcome back, ${result.customer.firstName || 'there'}!`)
      return { success: true, customer: result.customer }
    } catch (err) {
      const errorMessage = err.message || 'Login failed. Please check your credentials.'
      showError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Logout customer
   */
  const logout = async () => {
    try {
      if (accessToken) {
        await shopifyAuthService.logout(accessToken)
      }
      clearSession()
      success('You have been logged out successfully.')
    } catch (err) {
      console.error('Logout error:', err)
      // Clear session anyway
      clearSession()
    }
  }

  /**
   * Refresh customer data
   */
  const refreshCustomer = async () => {
    if (!accessToken) return

    try {
      const customerData = await shopifyAuthService.getCustomer(accessToken)
      setCustomer(customerData)
      localStorage.setItem(STORAGE_KEYS.CUSTOMER, JSON.stringify(customerData))
    } catch (err) {
      console.error('Refresh customer error:', err)
    }
  }

  /**
   * Update customer profile
   */
  const updateProfile = async (profileData) => {
    if (!accessToken) {
      showError('You must be logged in to update your profile')
      return { success: false }
    }

    try {
      setIsLoading(true)
      const updatedCustomer = await shopifyAuthService.updateCustomer(accessToken, profileData)

      // Update local state
      setCustomer(prev => ({ ...prev, ...updatedCustomer }))
      localStorage.setItem(STORAGE_KEYS.CUSTOMER, JSON.stringify({ ...customer, ...updatedCustomer }))

      success('Profile updated successfully!')
      return { success: true, customer: updatedCustomer }
    } catch (err) {
      const errorMessage = err.message || 'Failed to update profile'
      showError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Get customer with orders and addresses
   */
  const getCustomerDetails = async () => {
    if (!accessToken) return null

    try {
      const customerData = await shopifyAuthService.getCustomerWithOrders(accessToken)
      return customerData
    } catch (err) {
      console.error('Get customer details error:', err)
      return null
    }
  }

  /**
   * Address management methods
   */
  const createAddress = async (address) => {
    if (!accessToken) {
      showError('You must be logged in')
      return { success: false }
    }

    try {
      const newAddress = await shopifyAuthService.createAddress(accessToken, address)
      success('Address added successfully!')
      return { success: true, address: newAddress }
    } catch (err) {
      const errorMessage = err.message || 'Failed to create address'
      showError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const updateAddress = async (addressId, address) => {
    if (!accessToken) {
      showError('You must be logged in')
      return { success: false }
    }

    try {
      const updatedAddress = await shopifyAuthService.updateAddress(accessToken, addressId, address)
      success('Address updated successfully!')
      return { success: true, address: updatedAddress }
    } catch (err) {
      const errorMessage = err.message || 'Failed to update address'
      showError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const deleteAddress = async (addressId) => {
    if (!accessToken) {
      showError('You must be logged in')
      return { success: false }
    }

    try {
      await shopifyAuthService.deleteAddress(accessToken, addressId)
      success('Address deleted successfully!')
      return { success: true }
    } catch (err) {
      const errorMessage = err.message || 'Failed to delete address'
      showError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const setDefaultAddress = async (addressId) => {
    if (!accessToken) {
      showError('You must be logged in')
      return { success: false }
    }

    try {
      await shopifyAuthService.setDefaultAddress(accessToken, addressId)
      success('Default address updated!')
      return { success: true }
    } catch (err) {
      const errorMessage = err.message || 'Failed to set default address'
      showError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  /**
   * Password recovery
   */
  const recoverPassword = async (email) => {
    try {
      await shopifyAuthService.recoverPassword(email)
      success('Password reset email sent! Check your inbox.')
      return { success: true }
    } catch (err) {
      const errorMessage = err.message || 'Failed to send reset email'
      showError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const value = {
    customer,
    accessToken,
    isLoading,
    isAuthenticated,
    register,
    login,
    logout,
    refreshCustomer,
    updateProfile,
    getCustomerDetails,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    recoverPassword
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
