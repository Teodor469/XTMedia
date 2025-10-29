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

  /**
   * Update customer profile
   * @param {string} accessToken
   * @param {Object} customerData - { email, firstName, lastName, phone, acceptsMarketing }
   * @returns {Promise<Object>}
   */
  async updateCustomer(accessToken, customerData) {
    if (!this.client) {
      throw new Error('Shopify client not initialized')
    }

    const mutation = `
      mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
        customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
          customer {
            id
            email
            firstName
            lastName
            phone
            acceptsMarketing
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
      customerAccessToken: accessToken,
      customer: customerData
    }

    try {
      const response = await this.client.graphQLClient.send(mutation, variables)

      if (response.data.customerUpdate.customerUserErrors.length > 0) {
        const error = response.data.customerUpdate.customerUserErrors[0]
        throw new Error(error.message || 'Update failed')
      }

      return response.data.customerUpdate.customer
    } catch (error) {
      console.error('Update customer error:', error)
      throw error
    }
  }

  /**
   * Get customer with full details including orders
   * @param {string} accessToken
   * @param {number} ordersFirst - Number of orders to fetch
   * @returns {Promise<Object>}
   */
  async getCustomerWithOrders(accessToken, ordersFirst = 10) {
    if (!this.client) {
      throw new Error('Shopify client not initialized')
    }

    const query = `
      query getCustomerWithOrders($customerAccessToken: String!, $ordersFirst: Int!) {
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
            phone
          }
          addresses(first: 10) {
            edges {
              node {
                id
                address1
                address2
                city
                province
                country
                zip
                phone
                firstName
                lastName
              }
            }
          }
          orders(first: $ordersFirst, sortKey: PROCESSED_AT, reverse: true) {
            edges {
              node {
                id
                orderNumber
                processedAt
                financialStatus
                fulfillmentStatus
                totalPrice {
                  amount
                  currencyCode
                }
                lineItems(first: 10) {
                  edges {
                    node {
                      title
                      quantity
                      variant {
                        id
                        title
                        image {
                          url
                          altText
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `

    const variables = {
      customerAccessToken: accessToken,
      ordersFirst
    }

    try {
      const response = await this.client.graphQLClient.send(query, variables)
      return response.data.customer
    } catch (error) {
      console.error('Get customer with orders error:', error)
      throw error
    }
  }

  /**
   * Create a new customer address
   * @param {string} accessToken
   * @param {Object} address
   * @returns {Promise<Object>}
   */
  async createAddress(accessToken, address) {
    if (!this.client) {
      throw new Error('Shopify client not initialized')
    }

    const mutation = `
      mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
        customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
          customerAddress {
            id
            address1
            address2
            city
            province
            country
            zip
            phone
            firstName
            lastName
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
      customerAccessToken: accessToken,
      address
    }

    try {
      const response = await this.client.graphQLClient.send(mutation, variables)

      if (response.data.customerAddressCreate.customerUserErrors.length > 0) {
        const error = response.data.customerAddressCreate.customerUserErrors[0]
        throw new Error(error.message || 'Address creation failed')
      }

      return response.data.customerAddressCreate.customerAddress
    } catch (error) {
      console.error('Create address error:', error)
      throw error
    }
  }

  /**
   * Update an existing customer address
   * @param {string} accessToken
   * @param {string} addressId
   * @param {Object} address
   * @returns {Promise<Object>}
   */
  async updateAddress(accessToken, addressId, address) {
    if (!this.client) {
      throw new Error('Shopify client not initialized')
    }

    const mutation = `
      mutation customerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
        customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
          customerAddress {
            id
            address1
            address2
            city
            province
            country
            zip
            phone
            firstName
            lastName
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
      customerAccessToken: accessToken,
      id: addressId,
      address
    }

    try {
      const response = await this.client.graphQLClient.send(mutation, variables)

      if (response.data.customerAddressUpdate.customerUserErrors.length > 0) {
        const error = response.data.customerAddressUpdate.customerUserErrors[0]
        throw new Error(error.message || 'Address update failed')
      }

      return response.data.customerAddressUpdate.customerAddress
    } catch (error) {
      console.error('Update address error:', error)
      throw error
    }
  }

  /**
   * Delete a customer address
   * @param {string} accessToken
   * @param {string} addressId
   * @returns {Promise<boolean>}
   */
  async deleteAddress(accessToken, addressId) {
    if (!this.client) {
      throw new Error('Shopify client not initialized')
    }

    const mutation = `
      mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
        customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
          deletedCustomerAddressId
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `

    const variables = {
      customerAccessToken: accessToken,
      id: addressId
    }

    try {
      const response = await this.client.graphQLClient.send(mutation, variables)

      if (response.data.customerAddressDelete.customerUserErrors.length > 0) {
        const error = response.data.customerAddressDelete.customerUserErrors[0]
        throw new Error(error.message || 'Address deletion failed')
      }

      return true
    } catch (error) {
      console.error('Delete address error:', error)
      throw error
    }
  }

  /**
   * Set default address
   * @param {string} accessToken
   * @param {string} addressId
   * @returns {Promise<Object>}
   */
  async setDefaultAddress(accessToken, addressId) {
    if (!this.client) {
      throw new Error('Shopify client not initialized')
    }

    const mutation = `
      mutation customerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
        customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
          customer {
            id
            defaultAddress {
              id
            }
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
      customerAccessToken: accessToken,
      addressId
    }

    try {
      const response = await this.client.graphQLClient.send(mutation, variables)

      if (response.data.customerDefaultAddressUpdate.customerUserErrors.length > 0) {
        const error = response.data.customerDefaultAddressUpdate.customerUserErrors[0]
        throw new Error(error.message || 'Failed to set default address')
      }

      return response.data.customerDefaultAddressUpdate.customer
    } catch (error) {
      console.error('Set default address error:', error)
      throw error
    }
  }

  /**
   * Initiate password recovery
   * @param {string} email
   * @returns {Promise<boolean>}
   */
  async recoverPassword(email) {
    if (!this.client) {
      throw new Error('Shopify client not initialized')
    }

    const mutation = `
      mutation customerRecover($email: String!) {
        customerRecover(email: $email) {
          customerUserErrors {
            code
            field
            message
          }
        }
      }
    `

    const variables = {
      email
    }

    try {
      const response = await this.client.graphQLClient.send(mutation, variables)

      if (response.data.customerRecover.customerUserErrors.length > 0) {
        const error = response.data.customerRecover.customerUserErrors[0]
        throw new Error(error.message || 'Password recovery failed')
      }

      return true
    } catch (error) {
      console.error('Password recovery error:', error)
      throw error
    }
  }

  /**
   * Reset password with reset token
   * @param {string} resetToken
   * @param {string} password
   * @returns {Promise<Object>}
   */
  async resetPassword(resetToken, password) {
    if (!this.client) {
      throw new Error('Shopify client not initialized')
    }

    const mutation = `
      mutation customerReset($id: ID!, $input: CustomerResetInput!) {
        customerReset(id: $id, input: $input) {
          customer {
            id
            email
          }
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
      id: resetToken,
      input: {
        password
      }
    }

    try {
      const response = await this.client.graphQLClient.send(mutation, variables)

      if (response.data.customerReset.customerUserErrors.length > 0) {
        const error = response.data.customerReset.customerUserErrors[0]
        throw new Error(error.message || 'Password reset failed')
      }

      return {
        customer: response.data.customerReset.customer,
        accessToken: response.data.customerReset.customerAccessToken
      }
    } catch (error) {
      console.error('Password reset error:', error)
      throw error
    }
  }
}

// Export singleton instance
export const shopifyAuthService = new ShopifyAuthService()
export default shopifyAuthService
