import { useState, useRef, useEffect } from 'react'
import { optimizeShopifyImage, createLazyLoadObserver, isWebPSupported } from '../utils/imageOptimization'
import './OptimizedImage.css'

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  quality,
  lazy = true,
  placeholder = null,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(!lazy)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)
  const observerRef = useRef(null)

  // Determine best format based on browser support
  const format = isWebPSupported() ? 'webp' : 'jpg'

  // Get optimized image URL
  const optimizedSrc = src ? optimizeShopifyImage(src, {
    width,
    height,
    quality,
    format
  }) : null

  useEffect(() => {
    const currentRef = imgRef.current
    if (!lazy || !currentRef) return

    observerRef.current = createLazyLoadObserver((target) => {
      setIsInView(true)
      observerRef.current?.unobserve(target)
    })

    if (observerRef.current) {
      observerRef.current.observe(currentRef)
    }

    return () => {
      if (observerRef.current && currentRef) {
        observerRef.current.unobserve(currentRef)
      }
    }
  }, [lazy])

  const handleLoad = (event) => {
    setIsLoaded(true)
    onLoad?.(event)
  }

  const handleError = (event) => {
    setHasError(true)
    onError?.(event)
  }

  const shouldShowImage = isInView && optimizedSrc && !hasError
  const showPlaceholder = !isLoaded && (placeholder || !shouldShowImage)

  return (
    <div 
      ref={imgRef}
      className={`optimized-image-container ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder */}
      {showPlaceholder && (
        <div className="optimized-image-placeholder">
          {placeholder || (
            <div className="optimized-image-default-placeholder">
              <span className="placeholder-icon">🖼️</span>
            </div>
          )}
        </div>
      )}

      {/* Main image */}
      {shouldShowImage && (
        <img
          src={optimizedSrc}
          alt={alt}
          className={`optimized-image ${isLoaded ? 'loaded' : 'loading'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={lazy ? 'lazy' : 'eager'}
          {...props}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="optimized-image-error">
          <span className="error-icon">⚠️</span>
          <span className="error-text">Failed to load image</span>
        </div>
      )}

      {/* Loading indicator for non-lazy images */}
      {!lazy && !isLoaded && !hasError && optimizedSrc && (
        <div className="optimized-image-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  )
}

export default OptimizedImage