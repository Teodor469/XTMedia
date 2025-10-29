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
        assetFileNames: 'assets/[hash].[ext]'
      }
    }
  },
  server: {
    // Security headers for development
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff'
    }
  }
})
