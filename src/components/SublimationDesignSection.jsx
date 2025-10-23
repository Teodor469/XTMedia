import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProductCard from './ProductCard'

function SublimationDesignSection({ onGetQuote }) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('products')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)

  const productTemplates = [
    {
      id: 1,
      name: t('sublimationPrinting.customDesign.products.tshirt.name'),
      category: 'apparel',
      description: t('sublimationPrinting.customDesign.products.tshirt.description'),
      price: t('sublimationPrinting.customDesign.products.tshirt.price'),
      placeholder: 'Tshirt-Template',
      features: t('sublimationPrinting.customDesign.products.tshirt.features', { returnObjects: true }),
      sizes: t('sublimationPrinting.customDesign.products.tshirt.sizes', { returnObjects: true })
    },
    {
      id: 2,
      name: t('sublimationPrinting.customDesign.products.mug.name'),
      category: 'drinkware',
      description: t('sublimationPrinting.customDesign.products.mug.description'),
      price: t('sublimationPrinting.customDesign.products.mug.price'),
      placeholder: 'Mug-Template',
      features: t('sublimationPrinting.customDesign.products.mug.features', { returnObjects: true }),
      sizes: t('sublimationPrinting.customDesign.products.mug.sizes', { returnObjects: true })
    },
    {
      id: 3,
      name: t('sublimationPrinting.customDesign.products.metal.name'),
      category: 'home',
      description: t('sublimationPrinting.customDesign.products.metal.description'),
      price: t('sublimationPrinting.customDesign.products.metal.price'),
      placeholder: 'Metal-Template',
      features: t('sublimationPrinting.customDesign.products.metal.features', { returnObjects: true }),
      sizes: t('sublimationPrinting.customDesign.products.metal.sizes', { returnObjects: true })
    },
    {
      id: 4,
      name: t('sublimationPrinting.customDesign.products.mousepad.name'),
      category: 'accessories',
      description: t('sublimationPrinting.customDesign.products.mousepad.description'),
      price: t('sublimationPrinting.customDesign.products.mousepad.price'),
      placeholder: 'Mousepad-Template',
      features: t('sublimationPrinting.customDesign.products.mousepad.features', { returnObjects: true }),
      sizes: t('sublimationPrinting.customDesign.products.mousepad.sizes', { returnObjects: true })
    },
    {
      id: 5,
      name: t('sublimationPrinting.customDesign.products.canvas.name'),
      category: 'home',
      description: t('sublimationPrinting.customDesign.products.canvas.description'),
      price: t('sublimationPrinting.customDesign.products.canvas.price'),
      placeholder: 'Canvas-Template',
      features: t('sublimationPrinting.customDesign.products.canvas.features', { returnObjects: true }),
      sizes: t('sublimationPrinting.customDesign.products.canvas.sizes', { returnObjects: true })
    },
    {
      id: 6,
      name: t('sublimationPrinting.customDesign.products.banner.name'),
      category: 'signage',
      description: t('sublimationPrinting.customDesign.products.banner.description'),
      price: t('sublimationPrinting.customDesign.products.banner.price'),
      placeholder: 'Banner-Template',
      features: t('sublimationPrinting.customDesign.products.banner.features', { returnObjects: true }),
      sizes: t('sublimationPrinting.customDesign.products.banner.sizes', { returnObjects: true })
    }
  ]

  const categories = [
    { id: 'all', name: t('sublimationPrinting.customDesign.categories.all'), icon: '🎯' },
    { id: 'apparel', name: t('sublimationPrinting.customDesign.categories.apparel'), icon: '👕' },
    { id: 'drinkware', name: t('sublimationPrinting.customDesign.categories.drinkware'), icon: '☕' },
    { id: 'home', name: t('sublimationPrinting.customDesign.categories.home'), icon: '🏠' },
    { id: 'accessories', name: t('sublimationPrinting.customDesign.categories.accessories'), icon: '📱' },
    { id: 'signage', name: t('sublimationPrinting.customDesign.categories.signage'), icon: '🪧' }
  ]

  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProducts = selectedCategory === 'all' 
    ? productTemplates 
    : productTemplates.filter(product => product.category === selectedCategory)

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

  const handleProductSelect = (product) => {
    setSelectedProduct(product)
  }

  return (
    <div className="sublimation-design-section">
      <div className="design-header">
        <h3>{t('sublimationPrinting.customDesign.header.title')}</h3>
        <p>{t('sublimationPrinting.customDesign.header.subtitle')}</p>
      </div>

      <div className="design-tabs">
        <button
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <span className="tab-icon">🛍️</span>
          {t('sublimationPrinting.customDesign.tabs.products')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          <span className="tab-icon">📁</span>
          {t('sublimationPrinting.customDesign.tabs.upload')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveTab('custom')}
        >
          <span className="tab-icon">✨</span>
          {t('sublimationPrinting.customDesign.tabs.custom')}
        </button>
      </div>

      <div className="design-content">
        {activeTab === 'products' && (
          <div className="products-section">
            <div className="product-filters">
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

            <div className="products-grid">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    title: product.name,
                    formattedPrice: `Starting at ${product.price}`,
                    icon: product.placeholder
                  }}
                  variant="selectable"
                  isSelected={selectedProduct?.id === product.id}
                  onSelect={handleProductSelect}
                  showActions={false}
                  className="animation-delay"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>

            {selectedProduct && (
              <div className="product-customization">
                <h4>{t('sublimationPrinting.customDesign.forms.customizeProduct', { name: selectedProduct.name })}</h4>
                <div className="customization-form">
                  <div className="form-group">
                    <label>{t('sublimationPrinting.customDesign.forms.designText')}</label>
                    <textarea placeholder={t('sublimationPrinting.customDesign.forms.placeholders.designDescription')} rows="3" />
                  </div>
                  <div className="form-group">
                    <label>{t('sublimationPrinting.customDesign.forms.size')}</label>
                    <select>
                      {selectedProduct.sizes.map((size, idx) => (
                        <option key={idx} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t('sublimationPrinting.customDesign.forms.quantity')}</label>
                    <input type="number" min="1" defaultValue="1" />
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => onGetQuote && onGetQuote('sublimation-product', selectedProduct.category, selectedProduct.name)}
                  >
                    {t('sublimationPrinting.customDesign.buttons.getQuote')} - {selectedProduct.price}+
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="upload-section">
            <div className="upload-area">
              <input 
                type="file" 
                id="file-upload-sub" 
                accept=".jpg,.jpeg,.png,.svg,.pdf,.ai,.psd"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="file-upload-sub" className="upload-dropzone">
                <div className="upload-icon">🎨</div>
                <h4>{t('sublimationPrinting.customDesign.fileUpload.title')}</h4>
                <p>{t('sublimationPrinting.customDesign.fileUpload.description')}</p>
                <span className="upload-formats">{t('sublimationPrinting.customDesign.fileUpload.supportedFormats')}</span>
              </label>
            </div>

            {uploadedFile && (
              <div className="uploaded-file">
                <div className="file-preview">
                  <div className="file-icon">🖼️</div>
                  <div className="file-info">
                    <h4>{uploadedFile.name}</h4>
                    <p>{t('sublimationPrinting.customDesign.fileUpload.fileInfo.size')} {(uploadedFile.size / 1024 / 1024).toFixed(2)} {t('sublimationPrinting.customDesign.fileUpload.fileInfo.mb')}</p>
                    <p>{t('sublimationPrinting.customDesign.fileUpload.fileInfo.type')} {uploadedFile.type}</p>
                  </div>
                  <button className="file-remove" onClick={() => setUploadedFile(null)}>{t('sublimationPrinting.customDesign.buttons.remove')}</button>
                </div>
                <div className="upload-options">
                  <h4>{t('sublimationPrinting.customDesign.forms.productSelection')}</h4>
                  <div className="specs-form">
                    <div className="form-group">
                      <label>{t('sublimationPrinting.customDesign.forms.productType')}</label>
                      <select>
                        <option value="">{t('sublimationPrinting.customDesign.forms.selectProduct')}</option>
                        {t('sublimationPrinting.customDesign.forms.options.productTypes', { returnObjects: true }).map((type, index) => (
                          <option key={index} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>{t('sublimationPrinting.customDesign.forms.width')}</label>
                        <input type="number" placeholder={t('sublimationPrinting.customDesign.forms.placeholders.widthExample')} step="0.1" />
                      </div>
                      <div className="form-group">
                        <label>{t('sublimationPrinting.customDesign.forms.height')}</label>
                        <input type="number" placeholder={t('sublimationPrinting.customDesign.forms.placeholders.heightExample')} step="0.1" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>{t('sublimationPrinting.customDesign.forms.quantity')}</label>
                      <input type="number" min="1" defaultValue="1" />
                    </div>
                    <div className="form-group">
                      <label>{t('sublimationPrinting.customDesign.forms.specialInstructions')}</label>
                      <textarea placeholder={t('sublimationPrinting.customDesign.forms.placeholders.specialRequirements')}></textarea>
                    </div>
                    <button
                      className="btn-primary"
                      onClick={() => onGetQuote && onGetQuote('sublimation-upload', '', uploadedFile?.name || 'Custom Upload')}
                    >
                      {t('sublimationPrinting.customDesign.buttons.getQuote')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="custom-section">
            <div className="custom-intro">
              <h4>{t('sublimationPrinting.customDesign.customService.title')}</h4>
              <p>{t('sublimationPrinting.customDesign.customService.description')}</p>
            </div>

            <div className="custom-form">
              <div className="form-group">
                <label>{t('sublimationPrinting.customDesign.forms.productCategory')}</label>
                <select>
                  <option value="">{t('sublimationPrinting.customDesign.forms.selectCategory')}</option>
                  {t('sublimationPrinting.customDesign.forms.options.productCategories', { returnObjects: true }).map((cat, index) => (
                    <option key={index} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>{t('sublimationPrinting.customDesign.forms.designConcept')}</label>
                <textarea
                  placeholder={t('sublimationPrinting.customDesign.forms.placeholders.designVision')}
                  rows="4"
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t('sublimationPrinting.customDesign.forms.colorScheme')}</label>
                  <select>
                    {t('sublimationPrinting.customDesign.forms.options.colorSchemes', { returnObjects: true }).map((scheme, index) => (
                      <option key={index}>{scheme}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('sublimationPrinting.customDesign.forms.designStyle')}</label>
                  <select>
                    {t('sublimationPrinting.customDesign.forms.options.designStyles', { returnObjects: true }).map((style, index) => (
                      <option key={index}>{style}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>{t('sublimationPrinting.customDesign.forms.budgetRange')}</label>
                <select>
                  {t('sublimationPrinting.customDesign.forms.options.budgets', { returnObjects: true }).map((budget, index) => (
                    <option key={index}>{budget}</option>
                  ))}
                </select>
              </div>

              <div className="custom-process">
                <h5>{t('sublimationPrinting.customDesign.forms.designProcess')}</h5>
                <ol>
                  {t('sublimationPrinting.customDesign.forms.processSteps', { returnObjects: true }).map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <button
                className="btn-primary"
                onClick={() => onGetQuote && onGetQuote('sublimation-design-service', '', 'Professional Design Service')}
              >
                {t('sublimationPrinting.customDesign.buttons.startProject')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SublimationDesignSection