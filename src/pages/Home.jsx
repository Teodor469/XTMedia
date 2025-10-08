import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Home.css'

function Home() {
  const { t } = useTranslation()

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('home.hero.title')}
          </h1>
          <p className="hero-subtitle">
            {t('home.hero.subtitle')}
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn-primary">{t('home.hero.cta')}</Link>
            <Link to="/services" className="btn-secondary">{t('home.hero.secondary')}</Link>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="services-content">
          <h2 className="section-title">{t('home.services.title')}</h2>
          <div className="services-grid">
            <Link to="/services/laser-engraving" className="service-card">
              <div className="service-icon">⚡</div>
              <h3>{t('home.services.laserEngraving.title')}</h3>
              <p>{t('home.services.laserEngraving.description')}</p>
            </Link>
            <Link to="/services/sublimation-printing" className="service-card">
              <div className="service-icon">🎨</div>
              <h3>{t('home.services.sublimationPrinting.title')}</h3>
              <p>{t('home.services.sublimationPrinting.description')}</p>
            </Link>
            <Link to="/services/dtg-printing" className="service-card">
              <div className="service-icon">👕</div>
              <h3>{t('home.services.dtgPrinting.title')}</h3>
              <p>{t('home.services.dtgPrinting.description')}</p>
            </Link>
            <Link to="/services/photo-printing" className="service-card">
              <div className="service-icon">📸</div>
              <h3>{t('home.services.photoPrinting.title')}</h3>
              <p>{t('home.services.photoPrinting.description')}</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="cta-content">
          <h2>{t('home.cta.title')}</h2>
          <p>{t('home.cta.subtitle')}</p>
          <Link to="/contact" className="btn-primary">{t('home.cta.button')}</Link>
        </div>
      </section>
    </>
  )
}

export default Home