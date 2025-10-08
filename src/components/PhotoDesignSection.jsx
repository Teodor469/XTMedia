import { useState } from 'react'

function PhotoDesignSection({ onGetQuote }) {
  const [activeTab, setActiveTab] = useState('substrates')
  const [selectedSubstrate, setSelectedSubstrate] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)

  const substrateOptions = [
    {
      id: 1,
      name: 'Gallery Canvas',
      category: 'canvas',
      description: 'Museum-quality cotton canvas with gallery wrap or traditional framing',
      price: '$45',
      placeholder: 'Canvas-Substrate',
      features: ['Archival Quality', '75-year Lifespan', 'Gallery Wrap Available'],
      sizes: ['8x10"', '11x14"', '16x20"', '20x24"', '24x36"', '30x40"'],
      finishes: ['Matte', 'Satin', 'Gallery Wrap', 'Traditional Frame Ready']
    },
    {
      id: 2,
      name: 'Aluminum Metal Print',
      category: 'metal',
      description: 'Vibrant dye-sublimation on brushed or white aluminum',
      price: '$65',
      placeholder: 'Metal-Substrate',
      features: ['Weather Resistant', 'Scratch Proof', 'Modern Appeal'],
      sizes: ['5x7"', '8x10"', '11x14"', '16x20"', '20x30"', '24x36"'],
      finishes: ['Brushed Silver', 'White Gloss', 'Brushed Gold', 'Matte White']
    },
    {
      id: 3,
      name: 'Acrylic Face Mount',
      category: 'acrylic',
      description: 'Photo mounted behind clear acrylic for stunning depth and clarity',
      price: '$85',
      placeholder: 'Acrylic-Substrate',
      features: ['Maximum Depth', 'UV Protected', 'Premium Finish'],
      sizes: ['8x10"', '11x14"', '16x20"', '20x24"', '24x30"', '30x40"'],
      finishes: ['Clear Acrylic', 'Frosted Edge', 'Colored Back', 'Floating Mount']
    },
    {
      id: 4,
      name: 'Wood Print',
      category: 'wood',
      description: 'Direct printing on sustainably sourced birch or bamboo',
      price: '$55',
      placeholder: 'Wood-Substrate',
      features: ['Eco-Friendly', 'Natural Texture', 'Unique Grain'],
      sizes: ['5x7"', '8x10"', '11x14"', '16x20"', '20x24"', '24x30"'],
      finishes: ['Natural Birch', 'White Birch', 'Bamboo', 'Reclaimed Wood']
    },
    {
      id: 5,
      name: 'Fine Art Paper',
      category: 'paper',
      description: 'Professional-grade paper prints for traditional framing',
      price: '$25',
      placeholder: 'Paper-Substrate',
      features: ['Archival Inks', 'Museum Grade', 'Color Accurate'],
      sizes: ['4x6"', '5x7"', '8x10"', '11x14"', '16x20"', '20x24"', '24x36"'],
      finishes: ['Matte', 'Pearl', 'Metallic', 'Luster', 'Glossy']
    },
    {
      id: 6,
      name: 'HD Metal Print',
      category: 'metal',
      description: 'Ultra-high definition printing on premium aluminum',
      price: '$95',
      placeholder: 'HD-Metal-Substrate',
      features: ['4K Resolution', 'Extended Gamut', 'Premium Quality'],
      sizes: ['8x10"', '11x14"', '16x20"', '20x30"', '24x36"', '30x45"'],
      finishes: ['Ultra White', 'Brushed Silver', 'Satin', 'High Gloss']
    }
  ]

  const categories = [
    { id: 'all', name: 'All Substrates', icon: '📸' },
    { id: 'canvas', name: 'Canvas', icon: '🖼️' },
    { id: 'metal', name: 'Metal', icon: '🪙' },
    { id: 'acrylic', name: 'Acrylic', icon: '💎' },
    { id: 'wood', name: 'Wood', icon: '🌳' },
    { id: 'paper', name: 'Paper', icon: '📄' }
  ]

  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredSubstrates = selectedCategory === 'all' 
    ? substrateOptions 
    : substrateOptions.filter(substrate => substrate.category === selectedCategory)

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

  const handleSubstrateSelect = (substrate) => {
    setSelectedSubstrate(substrate)
  }

  return (
    <div className="photo-design-section">
      <div className="design-header">
        <h3>Photo Printing Studio</h3>
        <p>Choose your substrate and create museum-quality prints with exceptional clarity and color accuracy</p>
      </div>

      <div className="design-tabs">
        <button 
          className={`tab-btn ${activeTab === 'substrates' ? 'active' : ''}`}
          onClick={() => setActiveTab('substrates')}
        >
          <span className="tab-icon">🖼️</span>
          Choose Substrate
        </button>
        <button 
          className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          <span className="tab-icon">📁</span>
          Upload Photos
        </button>
        <button 
          className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
          onClick={() => setActiveTab('specs')}
        >
          <span className="tab-icon">⚙️</span>
          Print Specifications
        </button>
      </div>

      <div className="design-content">
        {activeTab === 'substrates' && (
          <div className="substrates-section">
            <div className="substrate-filters">
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

            <div className="substrates-grid">
              {filteredSubstrates.map((substrate, index) => (
                <div 
                  key={substrate.id} 
                  className={`substrate-card ${selectedSubstrate?.id === substrate.id ? 'selected' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleSubstrateSelect(substrate)}
                >
                  <div className="substrate-preview">
                    <div className="preview-placeholder">
                      <div className="placeholder-icon">📸</div>
                      <div className="placeholder-text">{substrate.placeholder}</div>
                    </div>
                  </div>
                  <div className="substrate-info">
                    <h4>{substrate.name}</h4>
                    <p>{substrate.description}</p>
                    <div className="substrate-features">
                      {substrate.features.map((feature, idx) => (
                        <span key={idx} className="feature-tag">{feature}</span>
                      ))}
                    </div>
                    <div className="substrate-sizes">
                      <p><strong>Available sizes:</strong></p>
                      <div className="sizes-list">
                        {substrate.sizes.map((size, idx) => (
                          <span key={idx} className="size-tag">{size}</span>
                        ))}
                      </div>
                    </div>
                    <div className="substrate-finishes">
                      <p><strong>Finish options:</strong></p>
                      <div className="finishes-list">
                        {substrate.finishes.map((finish, idx) => (
                          <span key={idx} className="finish-tag">{finish}</span>
                        ))}
                      </div>
                    </div>
                    <div className="substrate-footer">
                      <span className="substrate-price">Starting at {substrate.price}</span>
                      <button className="btn-substrate-select">
                        {selectedSubstrate?.id === substrate.id ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedSubstrate && (
              <div className="substrate-customization">
                <h4>Customize "{selectedSubstrate.name}"</h4>
                <div className="customization-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Size</label>
                      <select>
                        {selectedSubstrate.sizes.map((size, idx) => (
                          <option key={idx} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Finish</label>
                      <select>
                        {selectedSubstrate.finishes.map((finish, idx) => (
                          <option key={idx} value={finish}>{finish}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input type="number" min="1" defaultValue="1" />
                  </div>
                  <div className="form-group">
                    <label>Special Instructions</label>
                    <textarea placeholder="Color preferences, cropping notes, or mounting requirements..." rows="3" />
                  </div>
                  <button 
                    className="btn-primary"
                    onClick={() => onGetQuote && onGetQuote('photo-substrate', selectedSubstrate.category, selectedSubstrate.name)}
                  >
                    Get Quote - {selectedSubstrate.price}+
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="photo-upload-section">
            <div className="upload-area">
              <input 
                type="file" 
                id="file-upload-photo" 
                accept=".jpg,.jpeg,.png,.tiff,.tif,.raw,.psd"
                onChange={handleFileUpload}
                multiple
                style={{ display: 'none' }}
              />
              <label htmlFor="file-upload-photo" className="upload-dropzone">
                <div className="upload-icon">📸</div>
                <h4>Upload Your Photos</h4>
                <p>Drag and drop your high-resolution images here or click to browse</p>
                <span className="upload-formats">Supported: JPG, PNG, TIFF, RAW, PSD (Min. 300 DPI recommended)</span>
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
                  <h4>Print Options</h4>
                  <div className="specs-form">
                    <div className="form-group">
                      <label>Substrate Type</label>
                      <select>
                        <option value="">Select substrate...</option>
                        <option value="canvas">Canvas Print</option>
                        <option value="metal">Metal Print</option>
                        <option value="acrylic">Acrylic Face Mount</option>
                        <option value="wood">Wood Print</option>
                        <option value="paper">Fine Art Paper</option>
                      </select>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Print Width (inches)</label>
                        <input type="number" placeholder="e.g., 16" step="1" />
                      </div>
                      <div className="form-group">
                        <label>Print Height (inches)</label>
                        <input type="number" placeholder="e.g., 20" step="1" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Finish/Surface</label>
                      <select>
                        <option value="matte">Matte</option>
                        <option value="satin">Satin</option>
                        <option value="gloss">Gloss</option>
                        <option value="metallic">Metallic</option>
                        <option value="textured">Textured</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Color Profile</label>
                      <select>
                        <option value="srgb">sRGB (Standard)</option>
                        <option value="adobe-rgb">Adobe RGB (Wide Gamut)</option>
                        <option value="prophoto">ProPhoto RGB (Maximum)</option>
                        <option value="match-monitor">Match My Monitor</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Quantity</label>
                      <input type="number" min="1" defaultValue="1" />
                    </div>
                    <div className="form-group">
                      <label>Special Instructions</label>
                      <textarea placeholder="Color corrections, cropping preferences, or mounting instructions..."></textarea>
                    </div>
                    <button 
                      className="btn-primary"
                      onClick={() => onGetQuote && onGetQuote('photo-upload', '', uploadedFile?.name || 'Custom Photo Upload')}
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="specs-section">
            <div className="specs-intro">
              <h4>Photo Print Specifications</h4>
              <p>Professional guidelines for optimal print quality and color accuracy</p>
            </div>
            
            <div className="specs-grid">
              <div className="spec-card">
                <div className="spec-icon">📐</div>
                <h5>Resolution Requirements</h5>
                <ul>
                  <li><strong>Minimum:</strong> 150 DPI at final print size</li>
                  <li><strong>Recommended:</strong> 300 DPI for sharp detail</li>
                  <li><strong>Large format:</strong> 150-200 DPI acceptable</li>
                  <li><strong>Maximum:</strong> 600 DPI (no benefit beyond)</li>
                </ul>
              </div>

              <div className="spec-card">
                <div className="spec-icon">🎨</div>
                <h5>Color Management</h5>
                <ul>
                  <li><strong>Color space:</strong> sRGB or Adobe RGB</li>
                  <li><strong>Profile:</strong> Embedded ICC profiles required</li>
                  <li><strong>Calibration:</strong> Monitor calibration recommended</li>
                  <li><strong>Proofing:</strong> Soft proofs available upon request</li>
                </ul>
              </div>

              <div className="spec-card">
                <div className="spec-icon">📁</div>
                <h5>File Formats</h5>
                <ul>
                  <li><strong>Preferred:</strong> TIFF uncompressed</li>
                  <li><strong>Professional:</strong> PSD with layers flattened</li>
                  <li><strong>Standard:</strong> High-quality JPEG (90%+)</li>
                  <li><strong>RAW files:</strong> We can process upon request</li>
                </ul>
              </div>

              <div className="spec-card">
                <div className="spec-icon">📏</div>
                <h5>Size Guidelines</h5>
                <ul>
                  <li><strong>Standard sizes:</strong> 4x6" to 30x40"</li>
                  <li><strong>Custom sizes:</strong> Any dimension available</li>
                  <li><strong>Aspect ratio:</strong> Cropping may be required</li>
                  <li><strong>Panoramic:</strong> Up to 12" x 60" supported</li>
                </ul>
              </div>

              <div className="spec-card">
                <div className="spec-icon">🖨️</div>
                <h5>Print Quality</h5>
                <ul>
                  <li><strong>Archival inks:</strong> 75+ year fade resistance</li>
                  <li><strong>Color gamut:</strong> Extended range for vibrant colors</li>
                  <li><strong>Detail:</strong> Reproduction down to pixel level</li>
                  <li><strong>Consistency:</strong> Color-matched across reprints</li>
                </ul>
              </div>

              <div className="spec-card">
                <div className="spec-icon">⏱️</div>
                <h5>Turnaround Time</h5>
                <ul>
                  <li><strong>Standard prints:</strong> 2-3 business days</li>
                  <li><strong>Large format:</strong> 3-5 business days</li>
                  <li><strong>Rush service:</strong> Same/next day available</li>
                  <li><strong>Specialty substrates:</strong> 5-7 days</li>
                </ul>
              </div>
            </div>

            <div className="specs-tips">
              <h5>💡 Professional Tips</h5>
              <div className="tips-list">
                <div className="tip">
                  <strong>Sharpening:</strong> Apply output sharpening for your chosen substrate. We can handle this during processing if you prefer.
                </div>
                <div className="tip">
                  <strong>Black & White:</strong> For B&W prints, maintain RGB color space but desaturate. This allows for better tonal control.
                </div>
                <div className="tip">
                  <strong>Borders:</strong> Leave 0.125" margin if you want a white border, or submit edge-to-edge for borderless printing.
                </div>
                <div className="tip">
                  <strong>Batch Processing:</strong> Multiple photos of the same subject? We can color-match and optimize the entire series.
                </div>
              </div>
            </div>

            <div className="specs-consultation">
              <div className="consultation-card">
                <h5>Need Help with Your Photos?</h5>
                <p>Our professional team can assist with color correction, retouching, and optimization for your chosen substrate.</p>
                <div className="consultation-services">
                  <span>Color Correction</span>
                  <span>Photo Retouching</span>
                  <span>Format Conversion</span>
                  <span>Batch Processing</span>
                </div>
                <button 
                  className="btn-primary"
                  onClick={() => onGetQuote && onGetQuote('photo-consultation', '', 'Professional Photo Services')}
                >
                  Get Professional Help
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PhotoDesignSection