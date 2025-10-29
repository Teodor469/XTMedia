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

  const value = {
    customer,
    accessToken,
    isLoading,
    isAuthenticated,
    register,
    login,
    logout,
    refreshCustomer
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
