import './LoadingSkeleton.css'

// Product card skeleton
export const ProductCardSkeleton = () => (
  <div className="skeleton-card">
    <div className="skeleton-image"></div>
    <div className="skeleton-content">
      <div className="skeleton-title"></div>
      <div className="skeleton-price"></div>
      <div className="skeleton-description"></div>
      <div className="skeleton-button"></div>
    </div>
  </div>
)

// Product grid skeleton
export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="products-carousel">
    {Array.from({ length: count }, (_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
)

// Gallery item skeleton
export const GalleryItemSkeleton = () => (
  <div className="skeleton-gallery-item">
    <div className="skeleton-gallery-image"></div>
    <div className="skeleton-gallery-title"></div>
  </div>
)

// Gallery grid skeleton
export const GalleryGridSkeleton = ({ count = 9 }) => (
  <div className="gallery-grid">
    {Array.from({ length: count }, (_, i) => (
      <GalleryItemSkeleton key={i} />
    ))}
  </div>
)

// Generic content skeleton
export const ContentSkeleton = ({ lines = 3 }) => (
  <div className="skeleton-content">
    {Array.from({ length: lines }, (_, i) => (
      <div 
        key={i} 
        className="skeleton-line" 
        style={{ width: i === lines - 1 ? '60%' : '100%' }}
      ></div>
    ))}
  </div>
)