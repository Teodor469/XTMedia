import { useState } from 'react'
import QuoteModal from './QuoteModal'

function SublimationGallery() {
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
      category: 'apparel',
      material: 'Cotton T-Shirt',
      title: 'Custom Photo T-Shirt',
      description: 'High-quality photo reproduction on premium cotton',
      size: 'large',
      placeholder: 'Photo-Tshirt-Large'
    },
    {
      id: 2,
      category: 'drinkware',
      material: 'Ceramic Mug',
      title: 'Personalized Coffee Mug',
      description: 'Vibrant colors that won\'t fade with washing',
      size: 'medium',
      placeholder: 'Custom-Mug-Med'
    },
    {
      id: 3,
      category: 'home',
      material: 'Aluminum Panel',
      title: 'Metal Wall Art',
      description: 'Stunning metal prints for modern decor',
      size: 'small',
      placeholder: 'Metal-Art-Small'
    },
    {
      id: 4,
      category: 'accessories',
      material: 'Polyester Fabric',
      title: 'Custom Mouse Pad',
      description: 'Smooth surface with vibrant edge-to-edge printing',
      size: 'medium',
      placeholder: 'Mousepad-Med'
    },
    {
      id: 5,
      category: 'signage',
      material: 'Outdoor Banner',
      title: 'Weather-Resistant Signage',
      description: 'Durable outdoor advertising with brilliant colors',
      size: 'large',
      placeholder: 'Banner-Sign-Large'
    },
    {
      id: 6,
      category: 'drinkware',
      material: 'Stainless Steel',
      title: 'Travel Tumbler',
      description: 'Insulated drinkware with full-wrap designs',
      size: 'small',
      placeholder: 'Steel-Tumbler-Small'
    },
    {
      id: 7,
      category: 'apparel',
      material: 'Polyester Blend',
      title: 'Athletic Jersey',
      description: 'Performance wear with moisture-wicking properties',
      size: 'medium',
      placeholder: 'Athletic-Jersey-Med'
    },
    {
      id: 8,
      category: 'home',
      material: 'Canvas',
      title: 'Canvas Wall Print',
      description: 'Gallery-quality canvas with rich color saturation',
      size: 'small',
      placeholder: 'Canvas-Print-Small'
    },
    {
      id: 9,
      category: 'accessories',
      material: 'Polyester',
      title: 'Custom Phone Case',
      description: 'Protective cases with edge-to-edge printing',
      size: 'large',
      placeholder: 'Phone-Case-Large'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Products', icon: '🎯' },
    { id: 'apparel', name: 'Apparel', icon: '👕' },
    { id: 'drinkware', name: 'Drinkware', icon: '☕' },
    { id: 'home', name: 'Home Decor', icon: '🏠' },
    { id: 'accessories', name: 'Accessories', icon: '📱' },
    { id: 'signage', name: 'Signage', icon: '🪧' }
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
    <div className="sublimation-gallery">
      <div className="gallery-header">
        <h3>Our Sublimation Portfolio</h3>
        <p>Discover vibrant, fade-resistant designs across a wide range of products</p>
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
                <div className="placeholder-icon">🎨</div>
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
                      handleGetQuote('sublimation-printing', item.material, item.title)
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
                <div className="placeholder-icon">🎨</div>
                <div className="placeholder-text">{selectedImage.placeholder}</div>
              </div>
            </div>
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p className="modal-material">{selectedImage.material}</p>
              <p className="modal-description">{selectedImage.description}</p>
              <div className="modal-actions">
                <button className="btn-secondary">Similar Products</button>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    setSelectedImage(null)
                    handleGetQuote('sublimation-printing', selectedImage.material, selectedImage.title)
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

export default SublimationGallery