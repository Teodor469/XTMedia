import { useState } from 'react'
import QuoteModal from './QuoteModal'

function DTGGallery() {
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
      material: 'Premium Cotton',
      title: 'Full-Color Graphic Tee',
      description: 'Complex multi-color design with photographic detail',
      size: 'large',
      placeholder: 'DTG-GraphicTee-Large'
    },
    {
      id: 2,
      category: 'hoodies',
      material: '50/50 Cotton Blend',
      title: 'Custom Hoodie Design',
      description: 'Soft-hand print that moves with the fabric',
      size: 'medium',
      placeholder: 'DTG-Hoodie-Med'
    },
    {
      id: 3,
      category: 'fashion',
      material: 'Tri-Blend',
      title: 'Vintage Band Tee',
      description: 'Distressed look with perfect color matching',
      size: 'small',
      placeholder: 'DTG-Vintage-Small'
    },
    {
      id: 4,
      category: 'business',
      material: 'Performance Cotton',
      title: 'Corporate Event Shirt',
      description: 'Professional branding with crisp logo reproduction',
      size: 'medium',
      placeholder: 'DTG-Corporate-Med'
    },
    {
      id: 5,
      category: 'sports',
      material: 'Athletic Blend',
      title: 'Team Jersey Print',
      description: 'Breathable fabric with durable team graphics',
      size: 'large',
      placeholder: 'DTG-Jersey-Large'
    },
    {
      id: 6,
      category: 'kids',
      material: 'Organic Cotton',
      title: 'Kids Character Shirt',
      description: 'Safe, eco-friendly inks on soft children\'s apparel',
      size: 'small',
      placeholder: 'DTG-Kids-Small'
    },
    {
      id: 7,
      category: 'fashion',
      material: 'Ring-Spun Cotton',
      title: 'Fashion Forward Design',
      description: 'High-fashion print with intricate color gradients',
      size: 'medium',
      placeholder: 'DTG-Fashion-Med'
    },
    {
      id: 8,
      category: 'apparel',
      material: 'Cotton/Poly Blend',
      title: 'Photo Print Tee',
      description: 'High-resolution photo reproduction with fine detail',
      size: 'small',
      placeholder: 'DTG-Photo-Small'
    },
    {
      id: 9,
      category: 'business',
      material: 'Premium Cotton',
      title: 'Promotional Apparel',
      description: 'Bulk order with consistent quality across all pieces',
      size: 'large',
      placeholder: 'DTG-Promo-Large'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Apparel', icon: '👕' },
    { id: 'apparel', name: 'T-Shirts', icon: '👔' },
    { id: 'hoodies', name: 'Hoodies', icon: '🧥' },
    { id: 'fashion', name: 'Fashion', icon: '✨' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'kids', name: 'Kids', icon: '🧒' }
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
    <div className="dtg-gallery">
      <div className="gallery-header">
        <h3>Our DTG Printing Portfolio</h3>
        <p>Explore complex, colorful designs printed directly onto premium cotton apparel</p>
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
                <div className="placeholder-icon">👕</div>
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
                      handleGetQuote('dtg-printing', item.material, item.title)
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
                <div className="placeholder-icon">👕</div>
                <div className="placeholder-text">{selectedImage.placeholder}</div>
              </div>
            </div>
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p className="modal-material">{selectedImage.material}</p>
              <p className="modal-description">{selectedImage.description}</p>
              <div className="modal-actions">
                <button className="btn-secondary">Similar Designs</button>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    setSelectedImage(null)
                    handleGetQuote('dtg-printing', selectedImage.material, selectedImage.title)
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

export default DTGGallery