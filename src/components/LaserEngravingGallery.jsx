import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProcessTimeline from './ProcessTimeline'
import CustomDesignSection from './CustomDesignSection'
import QuoteModal from './QuoteModal'

function LaserEngravingGallery() {
  const { t } = useTranslation()
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
      material: t('laserEngraving.gallery.items.customLogo.material'),
      title: t('laserEngraving.gallery.items.customLogo.title'),
      description: t('laserEngraving.gallery.items.customLogo.description'),
      size: 'large',
      placeholder: 'Wood-Logo-Large'
    },
    {
      id: 2,
      category: 'metal',
      material: t('laserEngraving.gallery.items.industrialNameplate.material'),
      title: t('laserEngraving.gallery.items.industrialNameplate.title'),
      description: t('laserEngraving.gallery.items.industrialNameplate.description'),
      size: 'medium',
      placeholder: 'Metal-Nameplate-Med'
    },
    {
      id: 3,
      category: 'glass',
      material: t('laserEngraving.gallery.items.awardTrophy.material'),
      title: t('laserEngraving.gallery.items.awardTrophy.title'),
      description: t('laserEngraving.gallery.items.awardTrophy.description'),
      size: 'small',
      placeholder: 'Glass-Trophy-Small'
    },
    {
      id: 4,
      category: 'wood',
      material: t('laserEngraving.gallery.items.cuttingBoard.material'),
      title: t('laserEngraving.gallery.items.cuttingBoard.title'),
      description: t('laserEngraving.gallery.items.cuttingBoard.description'),
      size: 'medium',
      placeholder: 'Bamboo-Board-Med'
    },
    {
      id: 5,
      category: 'acrylic',
      material: t('laserEngraving.gallery.items.businessSignage.material'),
      title: t('laserEngraving.gallery.items.businessSignage.title'),
      description: t('laserEngraving.gallery.items.businessSignage.description'),
      size: 'large',
      placeholder: 'Acrylic-Sign-Large'
    },
    {
      id: 6,
      category: 'metal',
      material: t('laserEngraving.gallery.items.jewelryEngraving.material'),
      title: t('laserEngraving.gallery.items.jewelryEngraving.title'),
      description: t('laserEngraving.gallery.items.jewelryEngraving.description'),
      size: 'small',
      placeholder: 'Metal-Jewelry-Small'
    },
    {
      id: 7,
      category: 'wood',
      material: t('laserEngraving.gallery.items.weddingGuestBook.material'),
      title: t('laserEngraving.gallery.items.weddingGuestBook.title'),
      description: t('laserEngraving.gallery.items.weddingGuestBook.description'),
      size: 'medium',
      placeholder: 'Wood-Wedding-Med'
    },
    {
      id: 8,
      category: 'glass',
      material: t('laserEngraving.gallery.items.corporateGift.material'),
      title: t('laserEngraving.gallery.items.corporateGift.title'),
      description: t('laserEngraving.gallery.items.corporateGift.description'),
      size: 'small',
      placeholder: 'Glass-Corporate-Small'
    },
    {
      id: 9,
      category: 'acrylic',
      material: t('laserEngraving.gallery.items.decorativePanel.material'),
      title: t('laserEngraving.gallery.items.decorativePanel.title'),
      description: t('laserEngraving.gallery.items.decorativePanel.description'),
      size: 'large',
      placeholder: 'Acrylic-Art-Large'
    }
  ]

  const categories = [
    { id: 'all', name: t('laserEngraving.gallery.categories.all'), icon: '🎯' },
    { id: 'wood', name: t('laserEngraving.gallery.categories.wood'), icon: '🌳' },
    { id: 'metal', name: t('laserEngraving.gallery.categories.metal'), icon: '⚙️' },
    { id: 'glass', name: t('laserEngraving.gallery.categories.glass'), icon: '💎' },
    { id: 'acrylic', name: t('laserEngraving.gallery.categories.acrylic'), icon: '🔷' }
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
        <h3>{t('laserEngraving.gallery.title')}</h3>
        <p>{t('laserEngraving.gallery.subtitle')}</p>
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
                  <button className="btn-ghost">{t('laserEngraving.gallery.buttons.viewDetails')}</button>
                  <button 
                    className="btn-primary-small"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleGetQuote('laser-engraving', item.material, item.title)
                    }}
                  >
                    {t('laserEngraving.gallery.buttons.getQuote')}
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
                <button className="btn-secondary">{t('laserEngraving.gallery.buttons.similarProjects')}</button>
                <button 
                  className="btn-primary"
                  onClick={() => {
                    setSelectedImage(null)
                    handleGetQuote('laser-engraving', selectedImage.material, selectedImage.title)
                  }}
                >
                  {t('laserEngraving.gallery.buttons.requestQuote')}
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