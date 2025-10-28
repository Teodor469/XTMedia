import { useQuery, useQueries, useQueryClient } from '@tanstack/react-query'
import { shopifyProductService } from '../services/shopifyProducts'

// Query keys for consistent caching
export const QUERY_KEYS = {
  products: ['products'],
  product: (handle) => ['product', handle],
  productsByCollection: (collectionId) => ['products', 'collection', collectionId],
  collections: ['collections']
}

/**
 * Hook to fetch all products with caching
 */
export const useProducts = (limit = 20, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.products, limit],
    queryFn: () => shopifyProductService.fetchProducts(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry if it's a 404 or authentication error
      if (error?.status === 404 || error?.status === 401) {
        return false
      }
      return failureCount < 2
    },
    ...options
  })
}

/**
 * Hook to fetch a single product by handle
 */
export const useProduct = (handle, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.product(handle),
    queryFn: () => shopifyProductService.fetchProductByHandle(handle),
    enabled: !!handle,
    staleTime: 10 * 60 * 1000, // 10 minutes for individual products
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: (failureCount, error) => {
      if (error?.status === 404) {
        return false
      }
      return failureCount < 2
    },
    ...options
  })
}

/**
 * Hook to fetch products by collection
 */
export const useProductsByCollection = (collectionId, limit = 20, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.productsByCollection(collectionId), limit],
    queryFn: () => shopifyProductService.fetchProductsByCollection(collectionId, limit),
    enabled: !!collectionId,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    ...options
  })
}

/**
 * Hook to fetch multiple products by handles
 */
export const useMultipleProducts = (handles = [], options = {}) => {
  return useQueries({
    queries: handles.map(handle => ({
      queryKey: QUERY_KEYS.product(handle),
      queryFn: () => shopifyProductService.fetchProductByHandle(handle),
      enabled: !!handle,
      staleTime: 10 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      ...options
    }))
  })
}

/**
 * Hook with fallback products for demo mode
 */
export const useProductsWithFallback = (getFallbackProducts, limit = 20, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.products, limit, 'with-fallback'],
    queryFn: async () => {
      try {
        return await shopifyProductService.fetchProducts(limit)
      } catch (error) {
        console.warn('Shopify products failed, using fallback:', error.message)
        return getFallbackProducts()
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    // Never retry when using fallback
    retry: false,
    ...options
  })
}

/**
 * Hook for prefetching products (useful for hover states, etc.)
 */
export const usePrefetchProduct = () => {
  const queryClient = useQueryClient()
  
  return (handle) => {
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.product(handle),
      queryFn: () => shopifyProductService.fetchProductByHandle(handle),
      staleTime: 10 * 60 * 1000
    })
  }
}

/**
 * Utility hook to invalidate product queries
 */
export const useInvalidateProducts = () => {
  const queryClient = useQueryClient()
  
  return {
    invalidateAllProducts: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.products })
    },
    invalidateProduct: (handle) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.product(handle) })
    },
    invalidateCollection: (collectionId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.productsByCollection(collectionId) })
    }
  }
}