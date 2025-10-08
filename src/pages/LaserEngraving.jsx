import { Link } from 'react-router-dom'
import LaserEngravingGallery from '../components/LaserEngravingGallery'

function LaserEngraving() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">Laser Engraving</h1>
          <p className="page-subtitle">
            Precision laser technology for detailed, permanent marking on any material. 
            From custom logos to personalized gifts, we bring your vision to life with exceptional quality.
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
            <div className="service-icon">⚡</div>
            <div>
              <h2>What We Offer</h2>
              <p>Professional laser engraving services with cutting-edge technology and expert craftsmanship.</p>
            </div>
          </div>
          <ul className="service-features">
            <li>Wood, metal, glass, and plastic engraving</li>
            <li>Custom logos and text</li>
            <li>Precision cutting services</li>
            <li>Personalized gifts and awards</li>
            <li>Industrial marking and nameplates</li>
            <li>Architectural signage</li>
            <li>Memorial and commemorative pieces</li>
            <li>Small batch and large volume orders</li>
          </ul>
        </div>
      </section>

      <LaserEngravingGallery />

      <section className="cta">
        <div className="cta-content">
          <h2>Ready to create something amazing?</h2>
          <p>Let's discuss your laser engraving project and bring your ideas to life with precision and creativity.</p>
          <Link to="/contact" className="btn-primary">Start Your Project</Link>
        </div>
      </section>
    </>
  )
}

export default LaserEngraving