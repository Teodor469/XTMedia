import { useState } from 'react'
import QuoteModal from './QuoteModal'

function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState(null)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [quoteData, setQuoteData] = useState({
    projectType: '',
    material: '',
    design: ''
  })

  const galleryItems = [
    {
      id: 1,
      category: 'canvas',
      material: 'Gallery Canvas',
      title: 'Family Portrait Canvas',
      description: 'Museum-quality canvas print with gallery wrap finish',
      size: 'large',
      placeholder: 'Canvas-Portrait-Large'
    },
    {
      id: 2,
      category: 'metal',
      material: 'Aluminum Print',
      title: 'Landscape Metal Print',
      description: 'Vibrant colors on brushed aluminum with modern appeal',
      size: 'medium',
      placeholder: 'Metal-Landscape-Med'
    },
    {
      id: 3,
      category: 'acrylic',
      material: 'Clear Acrylic',
      title: 'Modern Art Display',
      description: 'Stunning depth and clarity with acrylic face mounting',
      size: 'small',
      placeholder: 'Acrylic-Art-Small'
    },
    {
      id: 4,
      category: 'canvas',
      material: 'Premium Canvas',
      title: 'Wedding Photo Canvas',
      description: 'Romantic moments preserved on archival canvas',
      size: 'medium',
      placeholder: 'Canvas-Wedding-Med'
    },
    {
      id: 5,
      category: 'prints',
      material: 'Fine Art Paper',
      title: 'Photography Portfolio',
      description: 'Professional prints on museum-grade paper',
      size: 'large',
      placeholder: 'Paper-Portfolio-Large'
    },
    {
      id: 6,
      category: 'metal',
      material: 'Brushed Aluminum',
      title: 'Architecture Print',
      description: 'Sharp details and contrast on metallic surface',
      size: 'small',
      placeholder: 'Metal-Architecture-Small'
    },
    {
      id: 7,
      category: 'wood',
      material: 'Birch Wood',
      title: 'Nature Photography',
      description: 'Organic warmth with wood grain texture showing through',
      size: 'medium',
      placeholder: 'Wood-Nature-Med'
    },
    {
      id: 8,
      category: 'acrylic',
      material: 'Frosted Acrylic',
      title: 'Corporate Display',
      description: 'Professional presentation with elegant frosted finish',
      size: 'small',
      placeholder: 'Acrylic-Corporate-Small'
    },
    {
      id: 9,
      category: 'prints',
      material: 'Metallic Paper',
      title: 'Event Photography',
      description: 'Enhanced shimmer and depth for special occasions',
      size: 'large',
      placeholder: 'Paper-Event-Large'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Prints', icon: '📸' },
    { id: 'canvas', name: 'Canvas', icon: '🖼️' },
    { id: 'metal', name: 'Metal', icon: '🪙' },
    { id: 'acrylic', name: 'Acrylic', icon: '💎' },
    { id: 'wood', name: 'Wood', icon: '🌳' },
    { id: 'prints', name: 'Paper', icon: '📄' }
  ]

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  const handleImageClick = (item) => {
    setSelectedImage(item)
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  const handleGetQuote = (projectType = '', material = '', design = '') => {
    setQuoteData({ projectType, material, design })
    setIsQuoteModalOpen(true)
  }

  return (
    <div className="photo-gallery">
      <div className="gallery-header">
        <h3>Our Photo Printing Portfolio</h3>
        <p>Discover exceptional quality across premium substrates and printing methods</p>
      </div>

      <div className="gallery-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="filter-icon">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            className={`gallery-item ${item.size} fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => handleImageClick(item)}
          >
            <div className="gallery-image-placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon">📸</div>
                <div className="placeholder-text">{item.placeholder}</div>
              </div>
            </div>
            <div className="gallery-overlay">
              <div className="gallery-info">
                <h4>{item.title}</h4>
                <p className="material-tag">{item.material}</p>
                <p className="description">{item.description}</p>
                <div className="gallery-actions">
                  <button className="btn-ghost">View Details</button>
                  <button 
                    className="btn-primary-small"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleGetQuote('photo-printing', item.material, item.title)
                    }}
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for enlarged view */}
      {selectedImage && (
        <div className="gallery-modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-image-placeholder">
              <div className="placeholder-content large">
                <div className="placeholder-icon">📸</div>
                <div className="placeholder-text">{selectedImage.placeholder}</div>
              </div>
            </div>
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p className="modal-material">{selectedImage.material}</p>
              <p className="modal-description">{selectedImage.description}</p>
              <div className="modal-actions">
                <button className="btn-secondary">Similar Prints</button>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    setSelectedImage(null)
                    handleGetQuote('photo-printing', selectedImage.material, selectedImage.title)
                  }}
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        projectType={quoteData.projectType}
        material={quoteData.material}
        design={quoteData.design}
      />
    </div>
  )
}

export default PhotoGallery