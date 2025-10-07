import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Precision crafted.
            <br />
            Brand perfected.
          </h1>
          <p className="hero-subtitle">
            Transform your vision into reality with our cutting-edge laser engraving, 
            sublimation printing, and DTG solutions. Where innovation meets artistry.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn-primary">Get Started</Link>
            <Link to="/services" className="btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="services-content">
          <h2 className="section-title">Our Expertise</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">⚡</div>
              <h3>Laser Engraving</h3>
              <p>Precision laser technology for detailed, permanent marking on any material.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🎨</div>
              <h3>Sublimation Printing</h3>
              <p>Vibrant, fade-resistant designs that become one with your materials.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">👕</div>
              <h3>DTG Printing</h3>
              <p>Direct-to-garment printing for complex, colorful designs on textiles.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📸</div>
              <h3>Photo Printing</h3>
              <p>Professional-grade photo reproduction with exceptional clarity and color.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>Ready to elevate your brand?</h2>
          <p>Let's bring your ideas to life with precision and creativity.</p>
          <Link to="/contact" className="btn-primary">Start Your Project</Link>
        </div>
      </section>
    </>
  )
}

export default Home