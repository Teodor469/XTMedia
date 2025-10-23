import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SublimationGallery from '../components/SublimationGallery'
import SublimationDesignSection from '../components/SublimationDesignSection'
import { useState } from 'react'
import QuoteModal from '../components/QuoteModal'
import './SublimationPrinting.css'

function SublimationPrinting() {
  const { t } = useTranslation()
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
          <h1 className="page-title">{t('sublimationPrinting.hero.title')}</h1>
          <p className="page-subtitle">
            {t('sublimationPrinting.hero.subtitle')}
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn-primary">{t('sublimationPrinting.hero.primaryButton')}</Link>
            <Link to="/services" className="btn-secondary">{t('sublimationPrinting.hero.secondaryButton')}</Link>
          </div>
        </div>
      </section>

      <section className="service-detailed">
        <div className="service-detailed-content">
          <div className="service-detailed-header">
            <div className="service-icon">🎨</div>
            <div>
              <h2>{t('sublimationPrinting.whatWeOffer.title')}</h2>
              <p>{t('sublimationPrinting.whatWeOffer.subtitle')}</p>
            </div>
          </div>
          <ul className="service-features">
            {t('sublimationPrinting.whatWeOffer.features', { returnObjects: true }).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sublimation Process Section */}
      <section className="sublimation-process">
        <div className="process-content">
          <h2 className="section-title">{t('sublimationPrinting.process.title')}</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-icon">🖨️</div>
              <h3>{t('sublimationPrinting.process.steps.printing.title')}</h3>
              <p>{t('sublimationPrinting.process.steps.printing.description')}</p>
            </div>
            <div className="process-step">
              <div className="step-icon">🔥</div>
              <h3>{t('sublimationPrinting.process.steps.heat.title')}</h3>
              <p>{t('sublimationPrinting.process.steps.heat.description')}</p>
            </div>
            <div className="process-step">
              <div className="step-icon">🧬</div>
              <h3>{t('sublimationPrinting.process.steps.bond.title')}</h3>
              <p>{t('sublimationPrinting.process.steps.bond.description')}</p>
            </div>
            <div className="process-step">
              <div className="step-icon">✨</div>
              <h3>{t('sublimationPrinting.process.steps.finish.title')}</h3>
              <p>{t('sublimationPrinting.process.steps.finish.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <SublimationGallery />
      <SublimationDesignSection onGetQuote={handleGetQuote} />

      <section className="cta">
        <div className="cta-content">
          <h2>{t('sublimationPrinting.cta.title')}</h2>
          <p>{t('sublimationPrinting.cta.subtitle')}</p>
          <Link to="/contact" className="btn-primary">{t('sublimationPrinting.cta.button')}</Link>
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