import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProductCard from './ProductCard'

function LaserEngravingDesignSection({ onGetQuote }) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('templates')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)

  const designTemplates = [
    {
      id: 1,
      name: t('laserEngraving.customDesign.templates.corporateLogo.name'),
      category: 'business',
      description: t('laserEngraving.customDesign.templates.corporateLogo.description'),
      price: t('laserEngraving.customDesign.templates.corporateLogo.price'),
      placeholder: 'Corp-Logo-Template',
      features: t('laserEngraving.customDesign.templates.corporateLogo.features', { returnObjects: true })
    },
    {
      id: 2,
      name: t('laserEngraving.customDesign.templates.weddingInvitation.name'),
      category: 'personal',
      description: t('laserEngraving.customDesign.templates.weddingInvitation.description'),
      price: t('laserEngraving.customDesign.templates.weddingInvitation.price'),
      placeholder: 'Wedding-Template',
      features: t('laserEngraving.customDesign.templates.weddingInvitation.features', { returnObjects: true })
    },
    {
      id: 3,
      name: t('laserEngraving.customDesign.templates.memorialPlaque.name'),
      category: 'memorial',
      description: t('laserEngraving.customDesign.templates.memorialPlaque.description'),
      price: t('laserEngraving.customDesign.templates.memorialPlaque.price'),
      placeholder: 'Memorial-Template',
      features: t('laserEngraving.customDesign.templates.memorialPlaque.features', { returnObjects: true })
    },
    {
      id: 4,
      name: t('laserEngraving.customDesign.templates.petTag.name'),
      category: 'personal',
      description: t('laserEngraving.customDesign.templates.petTag.description'),
      price: t('laserEngraving.customDesign.templates.petTag.price'),
      placeholder: 'Pet-Tag-Template',
      features: t('laserEngraving.customDesign.templates.petTag.features', { returnObjects: true })
    },
    {
      id: 5,
      name: t('laserEngraving.customDesign.templates.awardCertificate.name'),
      category: 'business',
      description: t('laserEngraving.customDesign.templates.awardCertificate.description'),
      price: t('laserEngraving.customDesign.templates.awardCertificate.price'),
      placeholder: 'Award-Template',
      features: t('laserEngraving.customDesign.templates.awardCertificate.features', { returnObjects: true })
    },
    {
      id: 6,
      name: t('laserEngraving.customDesign.templates.houseNumber.name'),
      category: 'home',
      description: t('laserEngraving.customDesign.templates.houseNumber.description'),
      price: t('laserEngraving.customDesign.templates.houseNumber.price'),
      placeholder: 'House-Number-Template',
      features: t('laserEngraving.customDesign.templates.houseNumber.features', { returnObjects: true })
    }
  ]

  const categories = [
    { id: 'all', name: t('laserEngraving.customDesign.categories.all'), icon: '🎯' },
    { id: 'business', name: t('laserEngraving.customDesign.categories.business'), icon: '💼' },
    { id: 'personal', name: t('laserEngraving.customDesign.categories.personal'), icon: '👤' },
    { id: 'memorial', name: t('laserEngraving.customDesign.categories.memorial'), icon: '🕊️' },
    { id: 'home', name: t('laserEngraving.customDesign.categories.home'), icon: '🏠' }
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
        <h3>{t('laserEngraving.customDesign.header.title')}</h3>
        <p>{t('laserEngraving.customDesign.header.subtitle')}</p>
      </div>

      <div className="design-tabs">
        <button
          className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => setActiveTab('templates')}
        >
          <span className="tab-icon">📋</span>
          {t('laserEngraving.customDesign.tabs.templates')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          <span className="tab-icon">📁</span>
          {t('laserEngraving.customDesign.tabs.upload')}
        </button>
        <button
          className={`tab-btn ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveTab('custom')}
        >
          <span className="tab-icon">✏️</span>
          {t('laserEngraving.customDesign.tabs.custom')}
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
                <h4>{t('laserEngraving.customDesign.forms.customizeTemplate', { name: selectedTemplate.name })}</h4>
                <div className="customization-form">
                  <div className="form-group">
                    <label>{t('laserEngraving.customDesign.forms.yourText')}</label>
                    <input type="text" placeholder={t('laserEngraving.customDesign.forms.placeholders.customText')} />
                  </div>
                  <div className="form-group">
                    <label>{t('laserEngraving.customDesign.forms.fontStyle')}</label>
                    <select>
                      {t('laserEngraving.customDesign.forms.options.fontStyles', { returnObjects: true }).map((style, index) => (
                        <option key={index}>{style}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t('laserEngraving.customDesign.forms.material')}</label>
                    <select>
                      {t('laserEngraving.customDesign.forms.options.materials', { returnObjects: true }).map((material, index) => (
                        <option key={index}>{material}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    className="btn-primary"
                    onClick={() => onGetQuote && onGetQuote('template', '', selectedTemplate.name)}
                  >
                    {t('laserEngraving.customDesign.buttons.addToCart')} - {selectedTemplate.price}
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
                <h4>{t('laserEngraving.customDesign.fileUpload.title')}</h4>
                <p>{t('laserEngraving.customDesign.fileUpload.description')}</p>
                <span className="upload-formats">{t('laserEngraving.customDesign.fileUpload.supportedFormats')}</span>
              </label>
            </div>

            {uploadedFile && (
              <div className="uploaded-file">
                <div className="file-preview">
                  <div className="file-icon">📄</div>
                  <div className="file-info">
                    <h4>{uploadedFile.name}</h4>
                    <p>{t('laserEngraving.customDesign.fileUpload.fileInfo.size')} {(uploadedFile.size / 1024 / 1024).toFixed(2)} {t('laserEngraving.customDesign.fileUpload.fileInfo.mb')}</p>
                    <p>{t('laserEngraving.customDesign.fileUpload.fileInfo.type')} {uploadedFile.type}</p>
                  </div>
                  <button className="file-remove" onClick={() => setUploadedFile(null)}>{t('laserEngraving.customDesign.buttons.remove')}</button>
                </div>
                <div className="upload-options">
                  <h4>{t('laserEngraving.customDesign.forms.designSpecs')}</h4>
                  <div className="specs-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>{t('laserEngraving.customDesign.forms.width')}</label>
                        <input type="number" placeholder={t('laserEngraving.customDesign.forms.placeholders.widthExample')} step="0.1" />
                      </div>
                      <div className="form-group">
                        <label>{t('laserEngraving.customDesign.forms.height')}</label>
                        <input type="number" placeholder={t('laserEngraving.customDesign.forms.placeholders.heightExample')} step="0.1" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>{t('laserEngraving.customDesign.forms.material')}</label>
                      <select>
                        <option>{t('laserEngraving.customDesign.forms.selectMaterial')}</option>
                        {t('laserEngraving.customDesign.forms.options.materials', { returnObjects: true }).map((material, index) => (
                          <option key={index}>{material}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>{t('laserEngraving.customDesign.forms.specialInstructions')}</label>
                      <textarea placeholder={t('laserEngraving.customDesign.forms.placeholders.specialRequirements')}></textarea>
                    </div>
                    <button
                      className="btn-primary"
                      onClick={() => onGetQuote && onGetQuote('custom-upload', '', uploadedFile?.name || 'Custom Upload')}
                    >
                      {t('laserEngraving.customDesign.buttons.getQuote')}
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
              <h4>{t('laserEngraving.customDesign.customService.title')}</h4>
              <p>{t('laserEngraving.customDesign.customService.description')}</p>
            </div>

            <div className="custom-form">
              <div className="form-group">
                <label>{t('laserEngraving.customDesign.forms.projectType')}</label>
                <select>
                  <option>{t('laserEngraving.customDesign.forms.selectProjectType')}</option>
                  {t('laserEngraving.customDesign.forms.options.projectTypes', { returnObjects: true }).map((type, index) => (
                    <option key={index}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>{t('laserEngraving.customDesign.forms.designDescription')}</label>
                <textarea
                  placeholder={t('laserEngraving.customDesign.forms.placeholders.designVision')}
                  rows="4"
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t('laserEngraving.customDesign.forms.preferredMaterial')}</label>
                  <select>
                    {t('laserEngraving.customDesign.forms.options.materialPreferences', { returnObjects: true }).map((pref, index) => (
                      <option key={index}>{pref}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>{t('laserEngraving.customDesign.forms.approximateSize')}</label>
                  <select>
                    {t('laserEngraving.customDesign.forms.options.sizes', { returnObjects: true }).map((size, index) => (
                      <option key={index}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>{t('laserEngraving.customDesign.forms.budgetRange')}</label>
                <select>
                  {t('laserEngraving.customDesign.forms.options.budgets', { returnObjects: true }).map((budget, index) => (
                    <option key={index}>{budget}</option>
                  ))}
                </select>
              </div>

              <div className="custom-process">
                <h5>{t('laserEngraving.customDesign.forms.whatHappensNext')}</h5>
                <ol>
                  {t('laserEngraving.customDesign.forms.processSteps', { returnObjects: true }).map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>

              <button
                className="btn-primary"
                onClick={() => onGetQuote && onGetQuote('custom-design', '', 'Full Custom Design Project')}
              >
                {t('laserEngraving.customDesign.buttons.startProject')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LaserEngravingDesignSection
