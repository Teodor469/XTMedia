/**
 * Shopify Customer Authentication Service
 * Uses Shopify Storefront API for customer account management
 */

import Client from 'shopify-buy'

class ShopifyAuthService {
  constructor() {
    this.client = null
  }

  /**
   * Initialize the Shopify client
   */
  initialize(client) {
    this.client = client
  }

  /**
   * Create a new customer account
   * @param {Object} customerData - { email, password, firstName, lastName, acceptsMarketing }
   * @returns {Promise<Object>} - { customer, customerAccessToken, customerUserErrors }
   */
  async register({ email, password, firstName, lastName, acceptsMarketing = false }) {
    if (!this.client) {
      throw new Error('Shopify client not initialized')
    }

    const mutation = `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
            firstName
            lastName
            phone
            acceptsMarketing
            createdAt
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `

    const variables = {
      input: {
        email,
        password,
        firstName,
        lastName,
        acceptsMarketing
      }
    }

    try {
      const response = await this.client.graphQLClient.send(mutation, variables)

      if (response.data.customerCreate.customerUserErrors.length > 0) {
        const error = response.data.customerCreate.customerUserErrors[0]
        throw new Error(error.message || 'Registration failed')
      }

      // After successful registration, automatically log in
      if (response.data.customerCreate.customer) {
        const loginResult = await this.login(email, password)
        return {
          customer: response.data.customerCreate.customer,
          accessToken: loginResult.accessToken
        }
      }

      return response.data.customerCreate
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  /**
   * Login customer and get access token
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>} - { accessToken, expiresAt }
   */
  async login(email, password) {
    if (!this.client) {
      throw new Error('Shopify client not initialized')
    }

    const mutation = `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `

    const variables = {
      input: {
        email,
        password
      }
    }

    try {
      const response = await this.client.graphQLClient.send(mutation, variables)

      if (response.data.customerAccessTokenCreate.customerUserErrors.length > 0) {
        const error = response.data.customerAccessTokenCreate.customerUserErrors[0]
        throw new Error(error.message || 'Login failed')
      }

      const { accessToken, expiresAt } = response.data.customerAccessTokenCreate.customerAccessToken

      // Fetch customer details with the access token
      const customer = await this.getCustomer(accessToken)

      return {
        accessToken,
        expiresAt,
        customer
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  /**
   * Get customer details using access token
   * @param {string} accessToken
   * @returns {Promise<Object>} - Customer object
   */
  async getCustomer(accessToken) {
    if (!this.client) {
      throw new Error('Shopify client not initialized')
    }

    const query = `
      query getCustomer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
          email
          firstName
          lastName
          phone
          acceptsMarketing
          createdAt
          defaultAddress {
            id
            address1
            address2
            city
            province
            country
            zip
          }
        }
      }
    `

    const variables = {
      customerAccessToken: accessToken
    }

    try {
      const response = await this.client.graphQLClient.send(query, variables)
      return response.data.customer
    } catch (error) {
      console.error('Get customer error:', error)
      throw error
    }
  }

  /**
   * Logout customer by deleting access token
   * @param {string} accessToken
   * @returns {Promise<boolean>}
   */
  async logout(accessToken) {
    if (!this.client) {
      throw new Error('Shopify client not initialized')
    }

    const mutation = `
      mutation customerAccessTokenDelete($customerAccessToken: String!) {
        customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
          deletedAccessToken
          deletedCustomerAccessTokenId
          userErrors {
            field
            message
          }
        }
      }
    `

    const variables = {
      customerAccessToken: accessToken
    }

    try {
      await this.client.graphQLClient.send(mutation, variables)
      return true
    } catch (error) {
      console.error('Logout error:', error)
      return false
    }
  }

  /**
   * Renew customer access token
   * @param {string} accessToken
   * @returns {Promise<Object>} - { accessToken, expiresAt }
   */
  async renewAccessToken(accessToken) {
    if (!this.client) {
      throw new Error('Shopify client not initialized')
    }

    const mutation = `
      mutation customerAccessTokenRenew($customerAccessToken: String!) {
        customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          userErrors {
            field
            message
          }
        }
      }
    `

    const variables = {
      customerAccessToken: accessToken
    }

    try {
      const response = await this.client.graphQLClient.send(mutation, variables)
      return response.data.customerAccessTokenRenew.customerAccessToken
    } catch (error) {
      console.error('Token renewal error:', error)
      throw error
    }
  }
}

// Export singleton instance
export const shopifyAuthService = new ShopifyAuthService()
export default shopifyAuthService
