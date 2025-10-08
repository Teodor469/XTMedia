import { Link } from 'react-router-dom'
import PhotoGallery from '../components/PhotoGallery'
import PhotoDesignSection from '../components/PhotoDesignSection'
import { useState } from 'react'
import QuoteModal from '../components/QuoteModal'

function PhotoPrinting() {
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
          <h1 className="page-title">Photo Printing</h1>
          <p className="page-subtitle">
            Professional-grade photo reproduction with exceptional clarity and color accuracy. 
            From canvas and metal prints to gallery-quality materials, preserve your memories with museum-quality craftsmanship.
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
            <div className="service-icon">📸</div>
            <div>
              <h2>Museum-Quality Photo Printing</h2>
              <p>Experience exceptional color accuracy and detail reproduction across premium substrates and printing technologies.</p>
            </div>
          </div>
          <ul className="service-features">
            <li>Canvas and metal prints</li>
            <li>Large format printing</li>
            <li>Color-accurate reproductions</li>
            <li>Gallery-quality materials</li>
            <li>Archival inks with 75+ year lifespan</li>
            <li>Professional color management</li>
            <li>Custom sizes and finishes</li>
            <li>Same-day rush service available</li>
          </ul>
        </div>
      </section>

      {/* Photo Quality Section */}
      <section className="photo-quality">
        <div className="quality-content">
          <h2 className="section-title">What Makes Our Prints Special</h2>
          <div className="quality-features">
            <div className="quality-feature">
              <div className="feature-icon">🎨</div>
              <h3>Color Accuracy</h3>
              <p>Professional color management ensures your prints match your vision with precise color reproduction and consistency across all materials.</p>
            </div>
            <div className="quality-feature">
              <div className="feature-icon">🔬</div>
              <h3>Fine Detail</h3>
              <p>Advanced printing technology captures every detail from your original image, reproducing textures and nuances with exceptional clarity.</p>
            </div>
            <div className="quality-feature">
              <div className="feature-icon">⏳</div>
              <h3>Archival Quality</h3>
              <p>Museum-grade materials and archival inks ensure your prints maintain their vibrancy and quality for generations to come.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Substrate Comparison Section */}
      <section className="substrate-comparison">
        <div className="comparison-content">
          <h2 className="section-title">Choose Your Perfect Substrate</h2>
          <div className="substrates-grid">
            <div className="substrate-option">
              <div className="substrate-icon">🖼️</div>
              <h3>Canvas Prints</h3>
              <div className="substrate-details">
                <p><strong>Best for:</strong> Portraits, artwork, traditional photography</p>
                <p><strong>Feel:</strong> Textured, artistic, classic gallery look</p>
                <p><strong>Durability:</strong> 75+ years, fade-resistant</p>
                <p><strong>Sizes:</strong> 8x10" to 40x60"</p>
              </div>
            </div>

            <div className="substrate-option">
              <div className="substrate-icon">🪙</div>
              <h3>Metal Prints</h3>
              <div className="substrate-details">
                <p><strong>Best for:</strong> Landscapes, modern art, vibrant colors</p>
                <p><strong>Feel:</strong> Sleek, contemporary, luminous</p>
                <p><strong>Durability:</strong> Weather-resistant, scratch-proof</p>
                <p><strong>Sizes:</strong> 5x7" to 30x45"</p>
              </div>
            </div>

            <div className="substrate-option">
              <div className="substrate-icon">💎</div>
              <h3>Acrylic Prints</h3>
              <div className="substrate-details">
                <p><strong>Best for:</strong> Fine art, corporate displays, luxury presentation</p>
                <p><strong>Feel:</strong> Stunning depth, crystal-clear, premium</p>
                <p><strong>Durability:</strong> UV-protected, easy to clean</p>
                <p><strong>Sizes:</strong> 8x10" to 30x40"</p>
              </div>
            </div>

            <div className="substrate-option">
              <div className="substrate-icon">🌳</div>
              <h3>Wood Prints</h3>
              <div className="substrate-details">
                <p><strong>Best for:</strong> Nature photography, rustic themes, eco-conscious</p>
                <p><strong>Feel:</strong> Natural texture, warm, organic</p>
                <p><strong>Durability:</strong> Sustainable materials, long-lasting</p>
                <p><strong>Sizes:</strong> 5x7" to 24x30"</p>
              </div>
            </div>

            <div className="substrate-option">
              <div className="substrate-icon">📄</div>
              <h3>Fine Art Paper</h3>
              <div className="substrate-details">
                <p><strong>Best for:</strong> Professional portfolios, traditional framing</p>
                <p><strong>Feel:</strong> Classic, museum-quality, versatile</p>
                <p><strong>Durability:</strong> Archival paper, fade-resistant inks</p>
                <p><strong>Sizes:</strong> 4x6" to 24x36"</p>
              </div>
            </div>

            <div className="substrate-option">
              <div className="substrate-icon">✨</div>
              <h3>Specialty Finishes</h3>
              <div className="substrate-details">
                <p><strong>Best for:</strong> Unique presentations, artistic effects</p>
                <p><strong>Feel:</strong> Textured, metallic, or custom surfaces</p>
                <p><strong>Durability:</strong> Varies by material, premium quality</p>
                <p><strong>Sizes:</strong> Custom sizing available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PhotoGallery />
      <PhotoDesignSection onGetQuote={handleGetQuote} />

      <section className="cta">
        <div className="cta-content">
          <h2>Ready to bring your photos to life?</h2>
          <p>Transform your digital memories into stunning physical prints with professional quality and museum-grade materials.</p>
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

export default PhotoPrinting