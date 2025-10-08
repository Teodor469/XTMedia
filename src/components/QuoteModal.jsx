import { useState } from 'react'

function QuoteModal({ isOpen, onClose, projectType = '', material = '', design = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: projectType,
    material: material,
    design: design,
    width: '',
    height: '',
    quantity: '1',
    timeline: '',
    description: '',
    budget: ''
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Auto close after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setCurrentStep(1)
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        material: '',
        design: '',
        width: '',
        height: '',
        quantity: '1',
        timeline: '',
        description: '',
        budget: ''
      })
      onClose()
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <div className="quote-modal-overlay" onClick={onClose}>
      <div className="quote-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        {!isSubmitted ? (
          <>
            <div className="quote-header">
              <h2>Get Your Custom Quote</h2>
              <div className="step-indicator">
                <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                  <span>1</span>
                  <p>Contact</p>
                </div>
                <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                  <span>2</span>
                  <p>Project</p>
                </div>
                <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                  <span>3</span>
                  <p>Details</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="quote-form">
              {currentStep === 1 && (
                <div className="form-step">
                  <h3>Contact Information</h3>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="form-step">
                  <h3>Project Specifications</h3>
                  <div className="form-group">
                    <label>Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                    >
                      <option value="">Select project type</option>
                      <option value="business-signage">Business Signage</option>
                      <option value="personal-gift">Personal Gift</option>
                      <option value="memorial-piece">Memorial Piece</option>
                      <option value="award-trophy">Award/Trophy</option>
                      <option value="home-decor">Home Decor</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Material Preference</label>
                    <select
                      name="material"
                      value={formData.material}
                      onChange={handleInputChange}
                    >
                      <option value="">Select material</option>
                      <option value="oak-wood">Oak Wood</option>
                      <option value="walnut-wood">Walnut Wood</option>
                      <option value="bamboo">Bamboo</option>
                      <option value="stainless-steel">Stainless Steel</option>
                      <option value="aluminum">Aluminum</option>
                      <option value="clear-acrylic">Clear Acrylic</option>
                      <option value="colored-acrylic">Colored Acrylic</option>
                      <option value="clear-glass">Clear Glass</option>
                      <option value="frosted-glass">Frosted Glass</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Width (inches)</label>
                      <input
                        type="number"
                        name="width"
                        value={formData.width}
                        onChange={handleInputChange}
                        placeholder="e.g., 6"
                        step="0.1"
                        min="0.1"
                      />
                    </div>
                    <div className="form-group">
                      <label>Height (inches)</label>
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        placeholder="e.g., 4"
                        step="0.1"
                        min="0.1"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="1"
                      placeholder="1"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="form-step">
                  <h3>Additional Details</h3>
                  <div className="form-group">
                    <label>Timeline Needed</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                    >
                      <option value="">Select timeline</option>
                      <option value="rush-1-3-days">Rush (1-3 days) - Additional cost</option>
                      <option value="standard-1-week">Standard (1 week)</option>
                      <option value="flexible-2-weeks">Flexible (2+ weeks)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                    >
                      <option value="">Select budget range</option>
                      <option value="25-50">$25 - $50</option>
                      <option value="50-100">$50 - $100</option>
                      <option value="100-250">$100 - $250</option>
                      <option value="250-500">$250 - $500</option>
                      <option value="500-plus">$500+</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Project Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your project, including any text content, design ideas, special requirements, or reference materials..."
                      rows="4"
                    />
                  </div>
                </div>
              )}

              <div className="form-navigation">
                {currentStep > 1 && (
                  <button type="button" className="btn-secondary" onClick={handlePrevStep}>
                    ← Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button type="button" className="btn-primary" onClick={handleNextStep}>
                    Next →
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="btn-primary" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Get Quote'}
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          <div className="quote-success">
            <div className="success-icon">✅</div>
            <h2>Quote Request Submitted!</h2>
            <p>Thank you for your interest! We'll review your project and send you a detailed quote within 24 hours.</p>
            <p className="success-note">Check your email for confirmation and next steps.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuoteModal