import { Link } from 'react-router-dom'
import SublimationGallery from '../components/SublimationGallery'
import SublimationDesignSection from '../components/SublimationDesignSection'
import { useState } from 'react'
import QuoteModal from '../components/QuoteModal'

function SublimationPrinting() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [quoteData, setQuoteData] = useState({
    projectType: '',
    material: '',
    design: ''
  })

  const handleGetQuote = (projectType = '', material = '', design = '') => {
    setQuoteData({ projectType, material, design })
    setIsQuoteModalOpen(true)
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">Sublimation Printing</h1>
          <p className="page-subtitle">
            Vibrant, fade-resistant designs that become one with your materials. 
            From custom apparel to promotional items, experience the brilliance of sublimation technology.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn-primary">Get Started</Link>
            <Link to="/services" className="btn-secondary">All Services</Link>
          </div>
        </div>
      </section>

      <section className="service-detailed">
        <div className="service-detailed-content">
          <div className="service-detailed-header">
            <div className="service-icon">🎨</div>
            <div>
              <h2>What Makes Sublimation Special</h2>
              <p>Sublimation printing creates vibrant, permanent designs that won't crack, peel, or fade over time.</p>
            </div>
          </div>
          <ul className="service-features">
            <li>Full-color photo quality prints</li>
            <li>Mugs, t-shirts, and mousepads</li>
            <li>Custom promotional items</li>
            <li>Weather-resistant outdoor signage</li>
            <li>Fade-resistant and wash-safe designs</li>
            <li>Unlimited color possibilities</li>
            <li>Perfect for photographs and complex artwork</li>
            <li>Eco-friendly printing process</li>
          </ul>
        </div>
      </section>

      {/* Sublimation Process Section */}
      <section className="sublimation-process">
        <div className="process-content">
          <h2 className="section-title">How Sublimation Works</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-icon">🖨️</div>
              <h3>Digital Printing</h3>
              <p>Your design is printed onto special sublimation paper using heat-activated inks</p>
            </div>
            <div className="process-step">
              <div className="step-icon">🔥</div>
              <h3>Heat Transfer</h3>
              <p>Heat and pressure transform the ink from solid to gas, penetrating the material fibers</p>
            </div>
            <div className="process-step">
              <div className="step-icon">🧬</div>
              <h3>Molecular Bond</h3>
              <p>The ink bonds at a molecular level, becoming part of the material permanently</p>
            </div>
            <div className="process-step">
              <div className="step-icon">✨</div>
              <h3>Perfect Finish</h3>
              <p>Result: vibrant, fade-resistant designs that feel soft and natural to the touch</p>
            </div>
          </div>
        </div>
      </section>

      <SublimationGallery />
      <SublimationDesignSection onGetQuote={handleGetQuote} />

      <section className="cta">
        <div className="cta-content">
          <h2>Ready to bring your designs to life?</h2>
          <p>Experience the vibrant world of sublimation printing with professional quality and unlimited creativity.</p>
          <Link to="/contact" className="btn-primary">Start Your Project</Link>
        </div>
      </section>

      {/* Quote Modal */}
      <QuoteModal 
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        projectType={quoteData.projectType}
        material={quoteData.material}
        design={quoteData.design}
      />
    </>
  )
}

export default SublimationPrinting