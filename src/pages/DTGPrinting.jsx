import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import DTGGallery from '../components/DTGGallery'
import DTGDesignSection from '../components/DTGDesignSection'
import { useState } from 'react'
import QuoteModal from '../components/QuoteModal'
import './DTGPrinting.css'

function DTGPrinting() {
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
          <h1 className="page-title">{t('dtgPrinting.hero.title')}</h1>
          <p className="page-subtitle">
            {t('dtgPrinting.hero.subtitle')}
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn-primary">{t('dtgPrinting.hero.primaryButton')}</Link>
            <Link to="/services" className="btn-secondary">{t('dtgPrinting.hero.secondaryButton')}</Link>
          </div>
        </div>
      </section>

      <section className="service-detailed">
        <div className="service-detailed-content">
          <div className="service-detailed-header">
            <div className="service-icon">👕</div>
            <div>
              <h2>{t('dtgPrinting.whatWeOffer.title')}</h2>
              <p>{t('dtgPrinting.whatWeOffer.subtitle')}</p>
            </div>
          </div>
          <ul className="service-features">
            {t('dtgPrinting.whatWeOffer.features', { returnObjects: true }).map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* DTG Process Section */}
      <section className="dtg-process">
        <div className="process-content">
          <h2 className="section-title">{t('dtgPrinting.process.title')}</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-icon">🎯</div>
              <h3>{t('dtgPrinting.process.steps.preparation.title')}</h3>
              <p>{t('dtgPrinting.process.steps.preparation.description')}</p>
            </div>
            <div className="process-step">
              <div className="step-icon">🧴</div>
              <h3>{t('dtgPrinting.process.steps.pretreatment.title')}</h3>
              <p>{t('dtgPrinting.process.steps.pretreatment.description')}</p>
            </div>
            <div className="process-step">
              <div className="step-icon">🖨️</div>
              <h3>{t('dtgPrinting.process.steps.printing.title')}</h3>
              <p>{t('dtgPrinting.process.steps.printing.description')}</p>
            </div>
            <div className="process-step">
              <div className="step-icon">🔥</div>
              <h3>{t('dtgPrinting.process.steps.curing.title')}</h3>
              <p>{t('dtgPrinting.process.steps.curing.description')}</p>
            </div>
            <div className="process-step">
              <div className="step-icon">✅</div>
              <h3>{t('dtgPrinting.process.steps.quality.title')}</h3>
              <p>{t('dtgPrinting.process.steps.quality.description')}</p>
            </div>
            <div className="process-step">
              <div className="step-icon">📦</div>
              <h3>{t('dtgPrinting.process.steps.packaging.title')}</h3>
              <p>{t('dtgPrinting.process.steps.packaging.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DTG Advantages Section */}
      <section className="dtg-advantages">
        <div className="advantages-content">
          <h2 className="section-title">{t('dtgPrinting.advantages.title')}</h2>
          <div className="comparison-grid">
            <div className="advantage-card">
              <div className="advantage-icon">🌈</div>
              <h3>{t('dtgPrinting.advantages.items.colors.title')}</h3>
              <p>{t('dtgPrinting.advantages.items.colors.description')}</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">📸</div>
              <h3>{t('dtgPrinting.advantages.items.quality.title')}</h3>
              <p>{t('dtgPrinting.advantages.items.quality.description')}</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">🔢</div>
              <h3>{t('dtgPrinting.advantages.items.minimums.title')}</h3>
              <p>{t('dtgPrinting.advantages.items.minimums.description')}</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">🌱</div>
              <h3>{t('dtgPrinting.advantages.items.eco.title')}</h3>
              <p>{t('dtgPrinting.advantages.items.eco.description')}</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">🤚</div>
              <h3>{t('dtgPrinting.advantages.items.feel.title')}</h3>
              <p>{t('dtgPrinting.advantages.items.feel.description')}</p>
            </div>
            <div className="advantage-card">
              <div className="advantage-icon">⚡</div>
              <h3>{t('dtgPrinting.advantages.items.speed.title')}</h3>
              <p>{t('dtgPrinting.advantages.items.speed.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <DTGGallery />
      <DTGDesignSection onGetQuote={handleGetQuote} />

      <section className="cta">
        <div className="cta-content">
          <h2>{t('dtgPrinting.cta.title')}</h2>
          <p>{t('dtgPrinting.cta.subtitle')}</p>
          <Link to="/contact" className="btn-primary">{t('dtgPrinting.cta.button')}</Link>
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