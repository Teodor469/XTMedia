import { Link } from 'react-router-dom'
import DTGGallery from '../components/DTGGallery'
import DTGDesignSection from '../components/DTGDesignSection'
import { useState } from 'react'
import QuoteModal from '../components/QuoteModal'
import './DTGPrinting.css'

function DTGPrinting() {
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
          <h1 className="page-title">DTG Printing</h1>
          <p className="page-subtitle">
            Direct-to-garment printing for complex, colorful designs on textiles. 
            Experience unlimited colors, photographic detail, and eco-friendly water-based inks.
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
            <div className="service-icon">👕</div>
            <div>
              <h2>Why Choose DTG Printing</h2>
              <p>Direct-to-garment technology allows for complex, detailed designs with unlimited colors and photographic quality.</p>
            </div>
          </div>
          <ul className="service-features">
            <li>High-quality cotton apparel</li>
            <li>Complex multi-color designs</li>
            <li>Small batch and custom orders</li>
            <li>Eco-friendly water-based inks</li>
            <li>Photo-realistic print quality</li>
            <li>No minimum order quantities</li>
            <li>Soft-hand feel that moves with fabric</li>
            <li>Same-day design approval available</li>
          </ul>
        </div>
      </section>

      {/* DTG Process Section */}
      <section className="dtg-process">
        <div className="process-content">
          <h2 className="section-title">How DTG Printing Works</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-icon">🎯</div>
              <h3>Design Preparation</h3>
              <p>Your artwork is optimized for garment printing with proper color profiles and sizing</p>
            </div>
            <div className="process-step">
              <div className="step-icon">🧴</div>
              <h3>Pre-Treatment</h3>
              <p>Garments receive special pre-treatment to ensure ink adhesion and vibrant colors</p>
            </div>
            <div className="process-step">
              <div className="step-icon">🖨️</div>
              <h3>Direct Printing</h3>
              <p>Water-based inks are printed directly onto the fabric using industrial DTG printers</p>
            </div>
            <div className="process-step">
              <div className="step-icon">🔥</div>
              <h3>Heat Curing</h3>
              <p>Prints are cured with heat to ensure durability and washability</p>
            </div>
            <div className="process-step">
              <div className="step-icon">✅</div>
              <h3>Quality Check</h3>
              <p>Each piece is inspected for print quality, color accuracy, and overall finish</p>
            </div>
            <div className="process-step">
              <div className="step-icon">📦</div>
              <h3>Packaging</h3>
              <p>Finished garments are carefully folded and packaged for delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* DTG Advantages Section */}
      <section className="dtg-advantages">
        <div className="advantages-content">
          <h2 className="section-title">DTG vs Traditional Methods</h2>
          <div className="comparison-grid">
            <div className="advantage-card">
              <div className="advantage-icon">🌈</div>
              <h3>Unlimited Colors</h3>
              <p>Unlike screen printing, DTG has no color limitations. Print full-color photographs and complex gradients with ease.</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">📸</div>
              <h3>Photo Quality</h3>
              <p>Achieve photographic detail that's impossible with vinyl or screen printing. Perfect for portraits and detailed artwork.</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">🔢</div>
              <h3>No Minimums</h3>
              <p>Order as few as one piece. Great for prototypes, personal gifts, or testing designs before larger runs.</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">🌱</div>
              <h3>Eco-Friendly</h3>
              <p>Water-based inks are environmentally safe and produce minimal waste compared to traditional methods.</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">🤚</div>
              <h3>Soft Feel</h3>
              <p>Inks absorb into the fabric fibers, creating a soft hand-feel that won't crack or peel over time.</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">⚡</div>
              <h3>Quick Turnaround</h3>
              <p>No screens to create or setup time. Fast production for rush orders and last-minute projects.</p>
            </div>
          </div>
        </div>
      </section>

      <DTGGallery />
      <DTGDesignSection onGetQuote={handleGetQuote} />

      <section className="cta">
        <div className="cta-content">
          <h2>Ready to print your next design?</h2>
          <p>Experience the freedom of unlimited colors and photographic detail with professional DTG printing.</p>
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

export default DTGPrinting