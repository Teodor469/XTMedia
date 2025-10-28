import { useQuery, useQueries, useQueryClient } from '@tanstack/react-query'
import { shopifyProductService } from '../services/shopifyProducts'

// Query keys for consistent caching
export const QUERY_KEYS = {
  products: ['products'],
  product: (handle) => ['product', handle],
  productsByCollection: (collectionId) => ['products', 'collection', collectionId],
  collections: ['collections'],
  search: (query, filters) => ['products', 'search', query, filters],
  suggestions: (query) => ['suggestions', query],
  filterOptions: ['filter-options']
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
 * Hook to search products with filters
 */
export const useProductSearch = (query = '', filters = {}, options = {}) => {
  const hasActiveFilters = Object.values(filters).some(value => {
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'string') return value !== 'all' && value !== 'relevance'
    if (typeof value === 'number') return value !== 0 && value !== 500
    return false
  })
  
  return useQuery({
    queryKey: QUERY_KEYS.search(query, filters),
    queryFn: () => shopifyProductService.searchProducts(query, filters, 50),
    enabled: !!(query || hasActiveFilters), // Enable if there's a query OR any active filters
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      if (error?.status === 404) return false
      return failureCount < 2
    },
    ...options
  })
}

/**
 * Hook to get product suggestions for autocomplete
 */
export const useProductSuggestions = (query, options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.suggestions(query),
    queryFn: () => shopifyProductService.getProductSuggestions(query),
    enabled: !!(query && query.length >= 2),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: false, // Don't retry suggestions
    ...options
  })
}

/**
 * Hook to fetch collections for filtering
 */
export const useCollections = (options = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.collections,
    queryFn: () => shopifyProductService.fetchCollections(),
    staleTime: 30 * 60 * 1000, // 30 minutes for collections
    gcTime: 60 * 60 * 1000, // 1 hour
    retry: 2,
    ...options
  })
}

/**
 * Hook to get filter options from a set of products
 */
export const useFilterOptions = (products = [], options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.filterOptions, products.length],
    queryFn: () => shopifyProductService.getFilterOptions(products),
    enabled: products.length > 0,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: false,
    ...options
  })
}

/**
 * Combined hook for search with fallback products
 */
export const useProductSearchWithFallback = (query, filters, getFallbackProducts, options = {}) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.search(query, filters), 'with-fallback'],
    queryFn: async () => {
      try {
        return await shopifyProductService.searchProducts(query, filters, 50)
      } catch (error) {
        console.warn('Shopify search failed, using fallback:', error.message)
        return getFallbackProducts()
      }
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: false, // Don't retry when using fallback
    ...options
  })
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
    },
    invalidateSearch: () => {
      queryClient.invalidateQueries({ queryKey: ['products', 'search'] })
    },
    invalidateAll: () => {
      queryClient.invalidateQueries()
    }
  }
}