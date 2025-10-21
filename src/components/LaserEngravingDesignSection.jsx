import { useState } from 'react'
import ProductCard from './ProductCard'

function LaserEngravingDesignSection({ onGetQuote }) {
  const [activeTab, setActiveTab] = useState('templates')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)

  const designTemplates = [
    {
      id: 1,
      name: 'Corporate Logo Template',
      category: 'business',
      description: 'Professional logo layout for business cards and signage',
      price: '$25',
      placeholder: 'Corp-Logo-Template',
      features: ['Vector format', 'Scalable design', 'Multiple variants']
    },
    {
      id: 2,
      name: 'Wedding Invitation',
      category: 'personal',
      description: 'Elegant design for wedding invitations and save the dates',
      price: '$15',
      placeholder: 'Wedding-Template',
      features: ['Customizable text', 'Romantic fonts', 'Border designs']
    },
    {
      id: 3,
      name: 'Memorial Plaque',
      category: 'memorial',
      description: 'Respectful design for memorial plaques and tributes',
      price: '$30',
      placeholder: 'Memorial-Template',
      features: ['Tasteful layout', 'Multiple sizes', 'Photo integration']
    },
    {
      id: 4,
      name: 'Pet Tag Design',
      category: 'personal',
      description: 'Fun and practical designs for pet identification tags',
      price: '$10',
      placeholder: 'Pet-Tag-Template',
      features: ['Durable materials', 'Contact info fields', 'Fun graphics']
    },
    {
      id: 5,
      name: 'Award Certificate',
      category: 'business',
      description: 'Professional certificate design for achievements',
      price: '$20',
      placeholder: 'Award-Template',
      features: ['Formal layout', 'Achievement fields', 'Logo placement']
    },
    {
      id: 6,
      name: 'House Number Sign',
      category: 'home',
      description: 'Modern house number design for outdoor display',
      price: '$18',
      placeholder: 'House-Number-Template',
      features: ['Weather resistant', 'Modern fonts', 'Custom colors']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Categories', icon: '🎯' },
    { id: 'business', name: 'Business', icon: '💼' },
    { id: 'personal', name: 'Personal', icon: '👤' },
    { id: 'memorial', name: 'Memorial', icon: '🕊️' },
    { id: 'home', name: 'Home', icon: '🏠' }
  ]

  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredTemplates = selectedCategory === 'all'
    ? designTemplates
    : designTemplates.filter(template => template.category === selectedCategory)

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

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
  }

  return (
    <div className="custom-design-section">
      <div className="design-header">
        <h3>Laser Engraving Design Center</h3>
        <p>Create your perfect engraved design or choose from our professional templates</p>
      </div>

      <div className="design-tabs">
        <button
          className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          <span className="tab-icon">📋</span>
          Design Templates
        </button>
        <button
          className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          <span className="tab-icon">📁</span>
          Upload Your Design
        </button>
        <button
          className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveTab('custom')}
        >
          <span className="tab-icon">✏️</span>
          Custom Creation
        </button>
      </div>

      <div className="design-content">
        {activeTab === 'templates' && (
          <div className="templates-section">
            <div className="template-filters">
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

            <div className="templates-grid">
              {filteredTemplates.map((template, index) => (
                <ProductCard
                  key={template.id}
                  product={{
                    ...template,
                    title: template.name,
                    formattedPrice: template.price,
                    icon: template.placeholder
                  }}
                  variant="selectable"
                  isSelected={selectedTemplate?.id === template.id}
                  onSelect={handleTemplateSelect}
                  showActions={false}
                  className="animation-delay"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
              ))}
            </div>

            {selectedTemplate && (
              <div className="template-customization">
                <h4>Customize "{selectedTemplate.name}"</h4>
                <div className="customization-form">
                  <div className="form-group">
                    <label>Your Text</label>
                    <input type="text" placeholder="Enter your custom text..." />
                  </div>
                  <div className="form-group">
                    <label>Font Style</label>
                    <select>
                      <option>Modern Sans</option>
                      <option>Classic Serif</option>
                      <option>Script Elegant</option>
                      <option>Bold Display</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Material</label>
                    <select>
                      <option>Oak Wood</option>
                      <option>Stainless Steel</option>
                      <option>Clear Acrylic</option>
                      <option>Frosted Glass</option>
                    </select>
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => onGetQuote && onGetQuote('template', '', selectedTemplate.name)}
                  >
                    Add to Cart - {selectedTemplate.price}
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
                id="file-upload"
                accept=".jpg,.jpeg,.png,.svg,.pdf,.ai"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="file-upload" className="upload-dropzone">
                <div className="upload-icon">📁</div>
                <h4>Upload Your Design</h4>
                <p>Drag and drop your file here or click to browse</p>
                <span className="upload-formats">Supported: JPG, PNG, SVG, PDF, AI</span>
              </label>
            </div>

            {uploadedFile && (
              <div className="uploaded-file">
                <div className="file-preview">
                  <div className="file-icon">📄</div>
                  <div className="file-info">
                    <h4>{uploadedFile.name}</h4>
                    <p>Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <p>Type: {uploadedFile.type}</p>
                  </div>
                  <button className="file-remove" onClick={() => setUploadedFile(null)}>×</button>
                </div>
                <div className="upload-options">
                  <h4>Design Specifications</h4>
                  <div className="specs-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Width (inches)</label>
                        <input type="number" placeholder="e.g., 6" step="0.1" />
                      </div>
                      <div className="form-group">
                        <label>Height (inches)</label>
                        <input type="number" placeholder="e.g., 4" step="0.1" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Material</label>
                      <select>
                        <option>Select material...</option>
                        <option>Oak Wood</option>
                        <option>Stainless Steel</option>
                        <option>Clear Acrylic</option>
                        <option>Frosted Glass</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Special Instructions</label>
                      <textarea placeholder="Any special requirements or notes..."></textarea>
                    </div>
                    <button
                      className="btn-primary"
                      onClick={() => onGetQuote && onGetQuote('custom-upload', '', uploadedFile?.name || 'Custom Upload')}
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
              <h4>Work with Our Design Team</h4>
              <p>Let our professional designers create a completely custom engraved piece for you</p>
            </div>

            <div className="custom-form">
              <div className="form-group">
                <label>Project Type</label>
                <select>
                  <option>Select project type...</option>
                  <option>Business Signage</option>
                  <option>Personal Gift</option>
                  <option>Memorial Piece</option>
                  <option>Award/Trophy</option>
                  <option>Home Decor</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Design Description</label>
                <textarea
                  placeholder="Describe your vision, style preferences, text content, and any specific requirements..."
                  rows="4"
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Preferred Material</label>
                  <select>
                    <option>No preference</option>
                    <option>Wood (Oak, Walnut, etc.)</option>
                    <option>Metal (Steel, Aluminum)</option>
                    <option>Acrylic (Clear, Colored)</option>
                    <option>Glass (Clear, Frosted)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Approximate Size</label>
                  <select>
                    <option>Small (under 6")</option>
                    <option>Medium (6" - 12")</option>
                    <option>Large (12" - 24")</option>
                    <option>Extra Large (24"+)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Budget Range</label>
                <select>
                  <option>$25 - $50</option>
                  <option>$50 - $100</option>
                  <option>$100 - $250</option>
                  <option>$250 - $500</option>
                  <option>$500+</option>
                </select>
              </div>

              <div className="custom-process">
                <h5>What happens next:</h5>
                <ol>
                  <li>We'll review your requirements within 24 hours</li>
                  <li>Our designer will create initial concepts</li>
                  <li>We'll collaborate on revisions</li>
                  <li>Final design approval and production</li>
                </ol>
              </div>

              <button
                className="btn-primary"
                onClick={() => onGetQuote && onGetQuote('custom-design', '', 'Full Custom Design Project')}
              >
                Start Custom Design Project
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LaserEngravingDesignSection
