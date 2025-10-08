import { useState } from 'react'

function SublimationDesignSection({ onGetQuote }) {
  const [activeTab, setActiveTab] = useState('products')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)

  const productTemplates = [
    {
      id: 1,
      name: 'Premium T-Shirt Design',
      category: 'apparel',
      description: 'Full-color designs on premium cotton blend tees',
      price: '$18',
      placeholder: 'Tshirt-Template',
      features: ['100% Cotton Blend', 'Machine Washable', 'Fade Resistant'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    {
      id: 2,
      name: 'Coffee Mug Collection',
      category: 'drinkware',
      description: 'Vibrant designs on ceramic and stainless steel mugs',
      price: '$12',
      placeholder: 'Mug-Template',
      features: ['Dishwasher Safe', 'Microwave Safe', 'Vibrant Colors'],
      sizes: ['11oz', '15oz', '20oz Tumbler']
    },
    {
      id: 3,
      name: 'Metal Print Art',
      category: 'home',
      description: 'High-definition prints on aluminum panels',
      price: '$35',
      placeholder: 'Metal-Template',
      features: ['Weather Resistant', 'Scratch Proof', 'HD Quality'],
      sizes: ['8x10"', '11x14"', '16x20"', '20x30"']
    },
    {
      id: 4,
      name: 'Mouse Pad Pro',
      category: 'accessories',
      description: 'Professional gaming and office mouse pads',
      price: '$8',
      placeholder: 'Mousepad-Template',
      features: ['Non-Slip Base', 'Smooth Surface', 'Edge Stitching'],
      sizes: ['Standard', 'Large', 'XL Gaming']
    },
    {
      id: 5,
      name: 'Canvas Gallery Wrap',
      category: 'home',
      description: 'Museum-quality canvas prints with gallery wrapping',
      price: '$45',
      placeholder: 'Canvas-Template',
      features: ['Gallery Wrapped', 'UV Resistant', 'Rich Colors'],
      sizes: ['12x16"', '16x20"', '20x24"', '24x36"']
    },
    {
      id: 6,
      name: 'Outdoor Banner',
      category: 'signage',
      description: 'Weather-resistant vinyl banners for outdoor use',
      price: '$25',
      placeholder: 'Banner-Template',
      features: ['Waterproof', 'UV Protected', 'Grommets Included'],
      sizes: ['2x4ft', '3x6ft', '4x8ft', 'Custom']
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
        <h3>Sublimation Design Studio</h3>
        <p>Choose your product and create stunning, fade-resistant designs</p>
      </div>

      <div className="design-tabs">
        <button 
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          <span className="tab-icon">🛍️</span>
          Product Gallery
        </button>
        <button 
          className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          <span className="tab-icon">📁</span>
          Upload Design
        </button>
        <button 
          className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveTab('custom')}
        >
          <span className="tab-icon">✨</span>
          Design Service
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
                <div 
                  key={product.id} 
                  className={`product-card ${selectedProduct?.id === product.id ? 'selected' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleProductSelect(product)}
                >
                  <div className="product-preview">
                    <div className="preview-placeholder">
                      <div className="placeholder-icon">🎨</div>
                      <div className="placeholder-text">{product.placeholder}</div>
                    </div>
                  </div>
                  <div className="product-info">
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <div className="product-features">
                      {product.features.map((feature, idx) => (
                        <span key={idx} className="feature-tag">{feature}</span>
                      ))}
                    </div>
                    <div className="product-sizes">
                      <p><strong>Available sizes:</strong></p>
                      <div className="sizes-list">
                        {product.sizes.map((size, idx) => (
                          <span key={idx} className="size-tag">{size}</span>
                        ))}
                      </div>
                    </div>
                    <div className="product-footer">
                      <span className="product-price">Starting at {product.price}</span>
                      <button className="btn-product-select">
                        {selectedProduct?.id === product.id ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedProduct && (
              <div className="product-customization">
                <h4>Customize "{selectedProduct.name}"</h4>
                <div className="customization-form">
                  <div className="form-group">
                    <label>Your Design/Text</label>
                    <textarea placeholder="Describe your design or upload a file below..." rows="3" />
                  </div>
                  <div className="form-group">
                    <label>Size/Quantity</label>
                    <select>
                      {selectedProduct.sizes.map((size, idx) => (
                        <option key={idx} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input type="number" min="1" defaultValue="1" />
                  </div>
                  <button 
                    className="btn-primary"
                    onClick={() => onGetQuote && onGetQuote('sublimation-product', selectedProduct.category, selectedProduct.name)}
                  >
                    Get Quote - {selectedProduct.price}+
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
                <h4>Upload Your Design</h4>
                <p>Drag and drop your artwork here or click to browse</p>
                <span className="upload-formats">Supported: JPG, PNG, SVG, PDF, AI, PSD</span>
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
                  <h4>Product Selection</h4>
                  <div className="specs-form">
                    <div className="form-group">
                      <label>Product Type</label>
                      <select>
                        <option value="">Select product...</option>
                        <option value="apparel">T-Shirts & Apparel</option>
                        <option value="drinkware">Mugs & Drinkware</option>
                        <option value="home">Home Decor</option>
                        <option value="accessories">Accessories</option>
                        <option value="signage">Signs & Banners</option>
                      </select>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Width (inches)</label>
                        <input type="number" placeholder="e.g., 8" step="0.1" />
                      </div>
                      <div className="form-group">
                        <label>Height (inches)</label>
                        <input type="number" placeholder="e.g., 10" step="0.1" />
                      </div>
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
                      onClick={() => onGetQuote && onGetQuote('sublimation-upload', '', uploadedFile?.name || 'Custom Upload')}
                    >
                      Get Quote
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
              <h4>Professional Design Service</h4>
              <p>Let our design team create stunning artwork optimized for sublimation printing</p>
            </div>
            
            <div className="custom-form">
              <div className="form-group">
                <label>Product Category</label>
                <select>
                  <option value="">Select category...</option>
                  <option value="apparel">Apparel & Clothing</option>
                  <option value="drinkware">Mugs & Drinkware</option>
                  <option value="home-decor">Home Decor</option>
                  <option value="business">Business Products</option>
                  <option value="promotional">Promotional Items</option>
                  <option value="signage">Signs & Banners</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Design Concept</label>
                <textarea 
                  placeholder="Describe your vision: style, colors, text, imagery, target audience, and overall feel you want to achieve..."
                  rows="4"
                ></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Color Scheme</label>
                  <select>
                    <option>Bright & Vibrant</option>
                    <option>Subtle & Elegant</option>
                    <option>Bold & High Contrast</option>
                    <option>Pastel & Soft</option>
                    <option>Monochrome</option>
                    <option>Custom Colors</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Design Style</label>
                  <select>
                    <option>Modern & Clean</option>
                    <option>Vintage & Retro</option>
                    <option>Artistic & Creative</option>
                    <option>Professional & Corporate</option>
                    <option>Fun & Playful</option>
                    <option>Minimalist</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Budget Range</label>
                <select>
                  <option>$50 - $100 (Simple design)</option>
                  <option>$100 - $200 (Standard design)</option>
                  <option>$200 - $350 (Complex design)</option>
                  <option>$350+ (Premium design)</option>
                </select>
              </div>
              
              <div className="custom-process">
                <h5>Design Process:</h5>
                <ol>
                  <li>Initial consultation and concept review</li>
                  <li>First draft design within 2-3 business days</li>
                  <li>Up to 3 rounds of revisions included</li>
                  <li>Final files delivered in all needed formats</li>
                  <li>Production begins immediately after approval</li>
                </ol>
              </div>
              
              <button 
                className="btn-primary"
                onClick={() => onGetQuote && onGetQuote('sublimation-design-service', '', 'Professional Design Service')}
              >
                Start Design Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SublimationDesignSection