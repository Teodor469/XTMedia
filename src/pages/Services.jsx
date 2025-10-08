import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Services.css'

function Services() {
  const { t } = useTranslation()

  const services = [
    {
      icon: '⚡',
      titleKey: 'services.laserEngraving.title',
      descriptionKey: 'services.laserEngraving.description',
      featuresKey: 'services.laserEngraving.features'
    },
    {
      icon: '🎨',
      titleKey: 'services.sublimationPrinting.title',
      descriptionKey: 'services.sublimationPrinting.description',
      featuresKey: 'services.sublimationPrinting.features'
    },
    {
      icon: '👕',
      titleKey: 'services.dtgPrinting.title',
      descriptionKey: 'services.dtgPrinting.description',
      featuresKey: 'services.dtgPrinting.features'
    },
    {
      icon: '📸',
      titleKey: 'services.photoPrinting.title',
      descriptionKey: 'services.photoPrinting.description',
      featuresKey: 'services.photoPrinting.features'
    }
  ]

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">{t('services.title')}</h1>
          <p className="page-subtitle">
            {t('services.subtitle')}
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
                    <h2>{t(service.titleKey)}</h2>
                    <p>{t(service.descriptionKey)}</p>
                  </div>
                </div>
                <ul className="service-features">
                  {t(service.featuresKey, { returnObjects: true }).map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                {/* Add View Details buttons for specialized services */}
                {index === 0 && (
                  <div className="service-action">
                    <Link to="/services/laser-engraving" className="btn-primary">
                      {t('common.viewGallery')}
                    </Link>
                  </div>
                )}
                {index === 1 && (
                  <div className="service-action">
                    <Link to="/services/sublimation-printing" className="btn-primary">
                      {t('common.viewGallery')}
                    </Link>
                  </div>
                )}
                {index === 2 && (
                  <div className="service-action">
                    <Link to="/services/dtg-printing" className="btn-primary">
                      {t('common.viewGallery')}
                    </Link>
                  </div>
                )}
                {index === 3 && (
                  <div className="service-action">
                    <Link to="/services/photo-printing" className="btn-primary">
                      {t('common.viewGallery')}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>{t('services.cta.title')}</h2>
          <p>{t('services.cta.subtitle')}</p>
          <Link to="/contact" className="btn-primary">{t('services.cta.button')}</Link>
        </div>
      </section>
    </>
  )
}

export default Services