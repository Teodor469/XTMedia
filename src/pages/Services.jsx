import { Link } from 'react-router-dom'

function Services() {
  const services = [
    {
      icon: '⚡',
      title: 'Laser Engraving',
      description: 'Precision laser technology for detailed, permanent marking on any material.',
      features: [
        'Wood, metal, glass, and plastic engraving',
        'Custom logos and text',
        'Precision cutting services',
        'Personalized gifts and awards'
      ]
    },
    {
      icon: '🎨',
      title: 'Sublimation Printing',
      description: 'Vibrant, fade-resistant designs that become one with your materials.',
      features: [
        'Full-color photo quality prints',
        'Mugs, t-shirts, and mousepads',
        'Custom promotional items',
        'Weather-resistant outdoor signage'
      ]
    },
    {
      icon: '👕',
      title: 'DTG Printing',
      description: 'Direct-to-garment printing for complex, colorful designs on textiles.',
      features: [
        'High-quality cotton apparel',
        'Complex multi-color designs',
        'Small batch and custom orders',
        'Eco-friendly water-based inks'
      ]
    },
    {
      icon: '📸',
      title: 'Photo Printing',
      description: 'Professional-grade photo reproduction with exceptional clarity and color.',
      features: [
        'Canvas and metal prints',
        'Large format printing',
        'Color-accurate reproductions',
        'Gallery-quality materials'
      ]
    }
  ]

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">Our Services</h1>
          <p className="page-subtitle">
            Comprehensive branding solutions powered by cutting-edge technology and expert craftsmanship.
          </p>
        </div>
      </section>

      <section className="services-detailed">
        <div className="services-content">
          {services.map((service, index) => (
            <div key={index} className="service-detailed">
              <div className="service-detailed-content">
                <div className="service-detailed-header">
                  <div className="service-icon">{service.icon}</div>
                  <div>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                  </div>
                </div>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>Ready to get started?</h2>
          <p>Contact us today to discuss your project and get a custom quote.</p>
          <Link to="/contact" className="btn-primary">Get Quote</Link>
        </div>
      </section>
    </>
  )
}

export default Services