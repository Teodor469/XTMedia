import { useState } from 'react'
import ProcessTimeline from './ProcessTimeline'
import CustomDesignSection from './CustomDesignSection'
import QuoteModal from './QuoteModal'

function LaserEngravingGallery() {
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
      category: 'wood',
      material: 'Oak Wood',
      title: 'Custom Logo Engraving',
      description: 'Precision corporate logo on premium oak',
      size: 'large',
      placeholder: 'Wood-Logo-Large'
    },
    {
      id: 2,
      category: 'metal',
      material: 'Stainless Steel',
      title: 'Industrial Nameplate',
      description: 'Durable marking for industrial equipment',
      size: 'medium',
      placeholder: 'Metal-Nameplate-Med'
    },
    {
      id: 3,
      category: 'glass',
      material: 'Crystal Glass',
      title: 'Award Trophy',
      description: 'Elegant engraving for recognition',
      size: 'small',
      placeholder: 'Glass-Trophy-Small'
    },
    {
      id: 4,
      category: 'wood',
      material: 'Bamboo',
      title: 'Personalized Cutting Board',
      description: 'Custom family name and design',
      size: 'medium',
      placeholder: 'Bamboo-Board-Med'
    },
    {
      id: 5,
      category: 'acrylic',
      material: 'Clear Acrylic',
      title: 'Business Signage',
      description: 'Professional office door sign',
      size: 'large',
      placeholder: 'Acrylic-Sign-Large'
    },
    {
      id: 6,
      category: 'metal',
      material: 'Aluminum',
      title: 'Jewelry Engraving',
      description: 'Delicate text on jewelry piece',
      size: 'small',
      placeholder: 'Metal-Jewelry-Small'
    },
    {
      id: 7,
      category: 'wood',
      material: 'Walnut',
      title: 'Wedding Guest Book',
      description: 'Romantic design for special day',
      size: 'medium',
      placeholder: 'Wood-Wedding-Med'
    },
    {
      id: 8,
      category: 'glass',
      material: 'Frosted Glass',
      title: 'Corporate Gift',
      description: 'Executive desk accessory',
      size: 'small',
      placeholder: 'Glass-Corporate-Small'
    },
    {
      id: 9,
      category: 'acrylic',
      material: 'Colored Acrylic',
      title: 'Decorative Panel',
      description: 'Artistic wall decoration',
      size: 'large',
      placeholder: 'Acrylic-Art-Large'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Materials', icon: '🎯' },
    { id: 'wood', name: 'Wood', icon: '🌳' },
    { id: 'metal', name: 'Metal', icon: '⚙️' },
    { id: 'glass', name: 'Glass', icon: '💎' },
    { id: 'acrylic', name: 'Acrylic', icon: '🔷' }
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
    <div className="laser-gallery">
      <div className="gallery-header">
        <h3>Our Laser Engraving Portfolio</h3>
        <p>Explore our precision craftsmanship across various materials</p>
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
                      handleGetQuote('laser-engraving', item.material, item.title)
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
                <button className="btn-secondary">Similar Projects</button>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    setSelectedImage(null)
                    handleGetQuote('laser-engraving', selectedImage.material, selectedImage.title)
                  }}
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Custom Design Section */}
      <CustomDesignSection onGetQuote={handleGetQuote} />

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

export default LaserEngravingGallery