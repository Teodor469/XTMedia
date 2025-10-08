import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LaserEngravingGallery from '../components/LaserEngravingGallery'
import './LaserEngraving.css'

function LaserEngraving() {
  const { t } = useTranslation()

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">{t('laserEngraving.hero.title')}</h1>
          <p className="page-subtitle">
            {t('laserEngraving.hero.subtitle')}
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn-primary">{t('laserEngraving.hero.primaryButton')}</Link>
            <Link to="/services" className="btn-secondary">{t('laserEngraving.hero.secondaryButton')}</Link>
          </div>
        </div>
      </section>

      <section className="service-detailed">
        <div className="service-detailed-content">
          <div className="service-detailed-header">
            <div className="service-icon">⚡</div>
            <div>
              <h2>{t('laserEngraving.whatWeOffer.title')}</h2>
              <p>{t('laserEngraving.whatWeOffer.subtitle')}</p>
            </div>
          </div>
          <ul className="service-features">
            {t('laserEngraving.whatWeOffer.features', { returnObjects: true }).map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      </section>

      <LaserEngravingGallery />

      <section className="cta">
        <div className="cta-content">
          <h2>{t('laserEngraving.cta.title')}</h2>
          <p>{t('laserEngraving.cta.subtitle')}</p>
          <Link to="/contact" className="btn-primary">{t('laserEngraving.cta.button')}</Link>
        </div>
      </section>
    </>
  )
}

export default LaserEngraving