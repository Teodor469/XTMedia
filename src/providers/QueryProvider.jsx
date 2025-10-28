import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

const QueryProvider = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Cache for 5 minutes
            staleTime: 5 * 60 * 1000,
            // Keep in cache for 10 minutes
            gcTime: 10 * 60 * 1000,
            // Retry failed requests 2 times
            retry: 2,
            // Don't refetch on window focus in development
            refetchOnWindowFocus: !import.meta.env.DEV,
            // Disable background refetching for stable demo experience
            refetchOnReconnect: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryProvider