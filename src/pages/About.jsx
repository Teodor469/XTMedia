import { Link } from 'react-router-dom'

function About() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">About XT Media</h1>
          <p className="page-subtitle">
            Where precision meets creativity. We're passionate about bringing your vision to life.
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="about-container">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Founded with a vision to revolutionize the branding industry, XT Media combines 
              cutting-edge technology with traditional craftsmanship. We believe that every 
              brand deserves to stand out, and we're here to make that happen.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              To provide businesses and individuals with exceptional branding solutions 
              through precision laser engraving, vibrant sublimation printing, and 
              professional direct-to-garment services. We're committed to quality, 
              innovation, and customer satisfaction.
            </p>

            <h2>Why Choose Us</h2>
            <div className="features-grid">
              <div className="feature">
                <h3>🎯 Precision</h3>
                <p>State-of-the-art equipment ensures every detail is perfect.</p>
              </div>
              <div className="feature">
                <h3>⚡ Speed</h3>
                <p>Fast turnaround times without compromising quality.</p>
              </div>
              <div className="feature">
                <h3>🤝 Service</h3>
                <p>Dedicated support from concept to completion.</p>
              </div>
              <div className="feature">
                <h3>💎 Quality</h3>
                <p>Premium materials and meticulous attention to detail.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>Let's work together</h2>
          <p>Ready to bring your brand to life? We'd love to hear about your project.</p>
          <Link to="/contact" className="btn-primary">Start a Project</Link>
        </div>
      </section>
    </>
  )
}

export default About