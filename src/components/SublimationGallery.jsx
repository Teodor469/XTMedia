import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import QuoteModal from './QuoteModal'

function SublimationGallery() {
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
      category: 'apparel',
      material: t('sublimationPrinting.gallery.items.tshirt.material'),
      title: t('sublimationPrinting.gallery.items.tshirt.title'),
      description: t('sublimationPrinting.gallery.items.tshirt.description'),
      size: 'large',
      placeholder: 'Photo-Tshirt-Large'
    },
    {
      id: 2,
      category: 'drinkware',
      material: t('sublimationPrinting.gallery.items.mug.material'),
      title: t('sublimationPrinting.gallery.items.mug.title'),
      description: t('sublimationPrinting.gallery.items.mug.description'),
      size: 'medium',
      placeholder: 'Custom-Mug-Med'
    },
    {
      id: 3,
      category: 'home',
      material: t('sublimationPrinting.gallery.items.metalArt.material'),
      title: t('sublimationPrinting.gallery.items.metalArt.title'),
      description: t('sublimationPrinting.gallery.items.metalArt.description'),
      size: 'small',
      placeholder: 'Metal-Art-Small'
    },
    {
      id: 4,
      category: 'accessories',
      material: t('sublimationPrinting.gallery.items.mousepad.material'),
      title: t('sublimationPrinting.gallery.items.mousepad.title'),
      description: t('sublimationPrinting.gallery.items.mousepad.description'),
      size: 'medium',
      placeholder: 'Mousepad-Med'
    },
    {
      id: 5,
      category: 'signage',
      material: t('sublimationPrinting.gallery.items.banner.material'),
      title: t('sublimationPrinting.gallery.items.banner.title'),
      description: t('sublimationPrinting.gallery.items.banner.description'),
      size: 'large',
      placeholder: 'Banner-Sign-Large'
    },
    {
      id: 6,
      category: 'drinkware',
      material: t('sublimationPrinting.gallery.items.tumbler.material'),
      title: t('sublimationPrinting.gallery.items.tumbler.title'),
      description: t('sublimationPrinting.gallery.items.tumbler.description'),
      size: 'small',
      placeholder: 'Steel-Tumbler-Small'
    },
    {
      id: 7,
      category: 'apparel',
      material: t('sublimationPrinting.gallery.items.jersey.material'),
      title: t('sublimationPrinting.gallery.items.jersey.title'),
      description: t('sublimationPrinting.gallery.items.jersey.description'),
      size: 'medium',
      placeholder: 'Athletic-Jersey-Med'
    },
    {
      id: 8,
      category: 'home',
      material: t('sublimationPrinting.gallery.items.canvas.material'),
      title: t('sublimationPrinting.gallery.items.canvas.title'),
      description: t('sublimationPrinting.gallery.items.canvas.description'),
      size: 'small',
      placeholder: 'Canvas-Print-Small'
    },
    {
      id: 9,
      category: 'accessories',
      material: t('sublimationPrinting.gallery.items.phoneCase.material'),
      title: t('sublimationPrinting.gallery.items.phoneCase.title'),
      description: t('sublimationPrinting.gallery.items.phoneCase.description'),
      size: 'large',
      placeholder: 'Phone-Case-Large'
    }
  ]

  const categories = [
    { id: 'all', name: t('sublimationPrinting.gallery.categories.all'), icon: '🎯' },
    { id: 'apparel', name: t('sublimationPrinting.gallery.categories.apparel'), icon: '👕' },
    { id: 'drinkware', name: t('sublimationPrinting.gallery.categories.drinkware'), icon: '☕' },
    { id: 'home', name: t('sublimationPrinting.gallery.categories.home'), icon: '🏠' },
    { id: 'accessories', name: t('sublimationPrinting.gallery.categories.accessories'), icon: '📱' },
    { id: 'signage', name: t('sublimationPrinting.gallery.categories.signage'), icon: '🪧' }
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
        <h3>{t('sublimationPrinting.gallery.title')}</h3>
        <p>{t('sublimationPrinting.gallery.subtitle')}</p>
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
                  <button className="btn-ghost">{t('sublimationPrinting.gallery.buttons.viewDetails')}</button>
                  <button
                    className="btn-primary-small"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleGetQuote('sublimation-printing', item.material, item.title)
                    }}
                  >
                    {t('sublimationPrinting.gallery.buttons.getQuote')}
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
                <button className="btn-secondary">{t('sublimationPrinting.gallery.buttons.similarProducts')}</button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setSelectedImage(null)
                    handleGetQuote('sublimation-printing', selectedImage.material, selectedImage.title)
                  }}
                >
                  {t('sublimationPrinting.gallery.buttons.requestQuote')}
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