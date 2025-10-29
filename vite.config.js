import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { cspPlugin } from './src/plugins/csp.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cspPlugin()
  ],
  build: {
    // Security optimizations
    minify: 'esbuild',
    sourcemap: false, // Disable sourcemaps in production for security
    rollupOptions: {
      output: {
        // Obfuscate chunk names
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]',
        // Manual chunks for better optimization
        manualChunks: {
          // Vendor libraries (only include packages that are actually used)
          'vendor-react': ['react', 'react-dom'],
          'vendor-shopify': ['shopify-buy'],
          'vendor-sentry': ['@sentry/react'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          'vendor-forms': ['react-hook-form'],
          'vendor-utils': ['prop-types', 'react-helmet-async', 'react-router-dom']
        }
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 600
  },
  server: {
    // Security headers for development
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff'
    }
  }
})
