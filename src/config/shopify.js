import Client from 'shopify-buy'

// Shopify configuration with fallback values for development
const shopifyConfig = {
  domain: import.meta.env.VITE_SHOPIFY_DOMAIN || 'demo-store.myshopify.com',
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'demo-token'
}

// Initialize Shopify client
export const shopifyClient = Client.buildClient(shopifyConfig)

// GraphQL queries for products
export const PRODUCT_QUERIES = {
  // Get all products with basic info
  GET_PRODUCTS: `
    query getProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  `,
  
  // Get single product by handle
  GET_PRODUCT: `
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        description
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `
}

// Helper functions
export const formatPrice = (price, currencyCode = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(price))
}

export const getProductImageUrl = (product) => {
  return product?.images?.edges?.[0]?.node?.url || '/placeholder-image.jpg'
}

export const getProductPrice = (product) => {
  return product?.priceRange?.minVariantPrice?.amount || '0'
}

export const getProductVariantId = (product) => {
  return product?.variants?.edges?.[0]?.node?.id
}