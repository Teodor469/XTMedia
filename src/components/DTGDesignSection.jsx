import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProductCard from './ProductCard'

function DTGDesignSection({ onGetQuote }) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('apparel')
  const [selectedGarment, setSelectedGarment] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)

  const apparelOptions = [
    {
      id: 1,
      name: 'Premium Cotton T-Shirt',
      category: 'tshirts',
      description: 'Classic fit with soft-hand feel, perfect for detailed designs',
      price: '$15',
      placeholder: 'Cotton-Tee-Option',
      features: ['100% Ring-Spun Cotton', 'Pre-Shrunk', 'Tear-Away Label'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
      colors: ['White', 'Black', 'Navy', 'Gray', 'Red', 'Royal Blue']
    },
    {
      id: 2,
      name: 'Tri-Blend T-Shirt',
      category: 'tshirts',
      description: 'Ultra-soft vintage feel with excellent drape and comfort',
      price: '$18',
      placeholder: 'Triblend-Tee-Option',
      features: ['50/25/25 Poly/Cotton/Rayon', 'Vintage Feel', 'Lightweight'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black', 'Gray', 'Navy', 'Burgundy', 'Forest']
    },
    {
      id: 3,
      name: 'Pullover Hoodie',
      category: 'hoodies',
      description: 'Cozy fleece hoodie perfect for larger graphic designs',
      price: '$35',
      placeholder: 'Hoodie-Option',
      features: ['80/20 Cotton/Poly', 'Kangaroo Pocket', 'Drawstring Hood'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
      colors: ['Black', 'Gray', 'Navy', 'Maroon', 'Forest', 'Purple']
    },
    {
      id: 4,
      name: 'Performance Athletic Tee',
      category: 'athletic',
      description: 'Moisture-wicking fabric ideal for sports team designs',
      price: '$20',
      placeholder: 'Athletic-Tee-Option',
      features: ['100% Polyester', 'Moisture-Wicking', 'Lightweight'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black', 'Navy', 'Red', 'Royal', 'Gray']
    },
    {
      id: 5,
      name: 'Long Sleeve Tee',
      category: 'longsleeve',
      description: 'Extended canvas for wrap-around designs and larger prints',
      price: '$22',
      placeholder: 'Longsleeve-Option',
      features: ['100% Cotton', 'Ribbed Cuffs', 'Side-Seamed'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black', 'Gray', 'Navy', 'Charcoal']
    },
    {
      id: 6,
      name: 'Kids Cotton Tee',
      category: 'kids',
      description: 'Soft organic cotton perfect for children\'s designs',
      price: '$12',
      placeholder: 'Kids-Tee-Option',
      features: ['100% Organic Cotton', 'Tagless', 'Machine Washable'],
      sizes: ['2T', '3T', '4T', 'YXS', 'YS', 'YM', 'YL'],
      colors: ['White', 'Black', 'Pink', 'Blue', 'Yellow', 'Green']
    }
  ]

  const categories = [
    { id: 'all', name: t('dtgPrinting.customDesign.categories.all'), icon: '👕' },
    { id: 'tshirts', name: t('dtgPrinting.customDesign.categories.tshirts'), icon: '👔' },
    { id: 'hoodies', name: t('dtgPrinting.customDesign.categories.hoodies'), icon: '🧥' },
    { id: 'athletic', name: t('dtgPrinting.customDesign.categories.athletic'), icon: '⚽' },
    { id: 'longsleeve', name: t('dtgPrinting.customDesign.categories.longsleeve'), icon: '🦾' },
    { id: 'kids', name: t('dtgPrinting.customDesign.categories.kids'), icon: '🧒' }
  ]

  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredApparel = selectedCategory === 'all' 
    ? apparelOptions 
    : apparelOptions.filter(item => item.category === selectedCategory)

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setUploadedFile({
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      })
    }
  }

  const handleGarmentSelect = (garment) => {
    setSelectedGarment(garment)
  }

  return (
    <div className="dtg-design-section">
      <div className="design-header">
        <h3>{t('dtgPrinting.customDesign.header.title')}</h3>
        <p>{t('dtgPrinting.customDesign.header.subtitle')}</p>
      </div>

      <div className="design-tabs">
        <button
          className={`tab-btn ${activeTab === 'apparel' ? 'active' : ''}`}
          onClick={() => setActiveTab('apparel')}
        >
          <span className="tab-icon">👕</span>
          {t('dtgPrinting.customDesign.tabs.apparel')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'design' ? 'active' : ''}`}
          onClick={() => setActiveTab('design')}
        >
          <span className="tab-icon">🎨</span>
          {t('dtgPrinting.customDesign.tabs.design')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'guidelines' ? 'active' : ''}`}
          onClick={() => setActiveTab('guidelines')}
        >
          <span className="tab-icon">📋</span>
          {t('dtgPrinting.customDesign.tabs.guidelines')}
        </button>
      </div>

      <div className="design-content">
        {activeTab === 'apparel' && (
          <div className="apparel-section">
            <div className="apparel-filters">
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

            <div className="apparel-grid">
              {filteredApparel.map((garment, index) => (
                <ProductCard
                  key={garment.id}
                  product={{
                    ...garment,
                    title: garment.name,
                    formattedPrice: `Starting at ${garment.price}`,
                    icon: garment.placeholder
                  }}
                  variant="selectable"
                  isSelected={selectedGarment?.id === garment.id}
                  onSelect={handleGarmentSelect}
                  showActions={false}
                  className="animation-delay"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>

            {selectedGarment && (
              <div className="apparel-customization">
                <h4>Customize "{selectedGarment.name}"</h4>
                <div className="customization-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Size</label>
                      <select>
                        {selectedGarment.sizes.map((size, idx) => (
                          <option key={idx} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Color</label>
                      <select>
                        {selectedGarment.colors.map((color, idx) => (
                          <option key={idx} value={color}>{color}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input type="number" min="1" defaultValue="1" />
                  </div>
                  <div className="form-group">
                    <label>Design Notes</label>
                    <textarea placeholder="Describe your design placement, colors, or special requirements..." rows="3" />
                  </div>
                  <button 
                    className="btn-primary"
                    onClick={() => onGetQuote && onGetQuote('dtg-apparel', selectedGarment.category, selectedGarment.name)}
                  >
                    Get Quote - {selectedGarment.price}+
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'design' && (
          <div className="design-upload-section">
            <div className="upload-area">
              <input 
                type="file" 
                id="file-upload-dtg" 
                accept=".jpg,.jpeg,.png,.svg,.pdf,.ai,.psd,.tiff"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="file-upload-dtg" className="upload-dropzone">
                <div className="upload-icon">🎨</div>
                <h4>Upload Your Design</h4>
                <p>Drag and drop your artwork here or click to browse</p>
                <span className="upload-formats">Supported: JPG, PNG, SVG, PDF, AI, PSD, TIFF</span>
              </label>
            </div>

            {uploadedFile && (
              <div className="uploaded-file">
                <div className="file-preview">
                  <div className="file-icon">🖼️</div>
                  <div className="file-info">
                    <h4>{uploadedFile.name}</h4>
                    <p>Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p>Type: {uploadedFile.type}</p>
                  </div>
                  <button className="file-remove" onClick={() => setUploadedFile(null)}>×</button>
                </div>
                <div className="upload-options">
                  <h4>Print Specifications</h4>
                  <div className="specs-form">
                    <div className="form-group">
                      <label>Garment Type</label>
                      <select>
                        <option value="">Select garment...</option>
                        <option value="tshirt">T-Shirt</option>
                        <option value="hoodie">Hoodie/Sweatshirt</option>
                        <option value="longsleeve">Long Sleeve</option>
                        <option value="tank">Tank Top</option>
                        <option value="kids">Kids Apparel</option>
                      </select>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Print Width (inches)</label>
                        <input type="number" placeholder="e.g., 12" step="0.25" max="14" />
                      </div>
                      <div className="form-group">
                        <label>Print Height (inches)</label>
                        <input type="number" placeholder="e.g., 10" step="0.25" max="16" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Print Placement</label>
                      <select>
                        <option value="front-center">Front Center</option>
                        <option value="front-left-chest">Front Left Chest</option>
                        <option value="back-center">Back Center</option>
                        <option value="front-back">Front & Back</option>
                        <option value="sleeve">Sleeve</option>
                        <option value="custom">Custom Placement</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Quantity</label>
                      <input type="number" min="1" defaultValue="1" />
                    </div>
                    <div className="form-group">
                      <label>Special Instructions</label>
                      <textarea placeholder="Color preferences, sizing notes, or other requirements..."></textarea>
                    </div>
                    <button 
                      className="btn-primary"
                      onClick={() => onGetQuote && onGetQuote('dtg-design-upload', '', uploadedFile?.name || 'Custom Design Upload')}
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'guidelines' && (
          <div className="guidelines-section">
            <div className="guidelines-intro">
              <h4>DTG Design Guidelines</h4>
              <p>Follow these guidelines to ensure your designs print beautifully on garments</p>
            </div>
            
            <div className="guidelines-grid">
              <div className="guideline-card">
                <div className="guideline-icon">📐</div>
                <h5>Resolution & Size</h5>
                <ul>
                  <li><strong>Minimum:</strong> 150 DPI at print size</li>
                  <li><strong>Recommended:</strong> 300 DPI for best quality</li>
                  <li><strong>Max print area:</strong> 14" x 16"</li>
                  <li><strong>Standard chest print:</strong> 12" wide</li>
                </ul>
              </div>

              <div className="guideline-card">
                <div className="guideline-icon">🎨</div>
                <h5>Colors & Design</h5>
                <ul>
                  <li><strong>Unlimited colors</strong> supported</li>
                  <li><strong>Photo-realistic</strong> designs work great</li>
                  <li><strong>Gradients</strong> and fine details print well</li>
                  <li><strong>White ink</strong> available for dark garments</li>
                </ul>
              </div>

              <div className="guideline-card">
                <div className="guideline-icon">📁</div>
                <h5>File Formats</h5>
                <ul>
                  <li><strong>Preferred:</strong> PNG with transparent background</li>
                  <li><strong>Accepted:</strong> JPG, PDF, AI, PSD, SVG</li>
                  <li><strong>Vector files</strong> for logos and text</li>
                  <li><strong>High-res</strong> for photographs</li>
                </ul>
              </div>

              <div className="guideline-card">
                <div className="guideline-icon">👕</div>
                <h5>Garment Compatibility</h5>
                <ul>
                  <li><strong>Best on:</strong> 100% cotton or cotton blends</li>
                  <li><strong>Light colors:</strong> All ink colors work</li>
                  <li><strong>Dark colors:</strong> White underbase required</li>
                  <li><strong>Performance fabrics:</strong> May have texture differences</li>
                </ul>
              </div>

              <div className="guideline-card">
                <div className="guideline-icon">🧼</div>
                <h5>Care Instructions</h5>
                <ul>
                  <li><strong>Wash:</strong> Inside out in cold water</li>
                  <li><strong>Dry:</strong> Low heat or hang dry</li>
                  <li><strong>Iron:</strong> Inside out, avoid direct contact</li>
                  <li><strong>No:</strong> Bleach or fabric softener</li>
                </ul>
              </div>

              <div className="guideline-card">
                <div className="guideline-icon">⚡</div>
                <h5>Turnaround Time</h5>
                <ul>
                  <li><strong>Standard:</strong> 3-5 business days</li>
                  <li><strong>Rush orders:</strong> 1-2 days (additional cost)</li>
                  <li><strong>Large orders:</strong> 5-7 days (50+ pieces)</li>
                  <li><strong>Design approval:</strong> Same day</li>
                </ul>
              </div>
            </div>

            <div className="guidelines-tips">
              <h5>💡 Pro Tips for Best Results</h5>
              <div className="tips-list">
                <div className="tip">
                  <strong>Dark Garments:</strong> Use white or light-colored designs for best contrast, or we'll add a white underbase for colored designs.
                </div>
                <div className="tip">
                  <strong>Small Text:</strong> Keep text at least 0.25" (6pt) for readability. Script fonts may need to be larger.
                </div>
                <div className="tip">
                  <strong>Placement:</strong> Standard chest placement is 4" down from collar. Back prints start 2" down from collar.
                </div>
                <div className="tip">
                  <strong>Quantity Discounts:</strong> Larger orders receive better per-piece pricing. Ask about bulk discounts!
                </div>
              </div>
            </div>
            
            <div className="guidelines-action">
              <button 
                className="btn-primary"
                onClick={() => onGetQuote && onGetQuote('dtg-consultation', '', 'Design Consultation')}
              >
                Get Design Consultation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DTGDesignSection