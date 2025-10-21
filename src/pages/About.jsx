import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './About.css'

function About() {
  const { t } = useTranslation()

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">{t('about.hero.title')}</h1>
          <p className="page-subtitle">
            {t('about.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Founder Introduction Section */}
      <section className="founder-section">
        <div className="founder-container">
          <div className="founder-image">
            <div className="founder-photo-placeholder">
              <div className="placeholder-icon">👤</div>
              <div className="placeholder-text">{t('about.founder.photoPlaceholder')}</div>
            </div>
          </div>
          <div className="founder-story">
            <h2>{t('about.founder.title')}</h2>
            <p>{t('about.founder.paragraph1')}</p>
            <p>{t('about.founder.paragraph2')}</p>
            <p>{t('about.founder.paragraph3')}</p>
          </div>
        </div>
      </section>

      {/* How It All Started Section */}
      <section className="story-section">
        <div className="story-container">
          <h2>{t('about.story.title')}</h2>
          <p>{t('about.story.paragraph1')}</p>
          <p>{t('about.story.paragraph2')}</p>
          <p>{t('about.story.paragraph3')}</p>
        </div>
      </section>

      {/* Who We Are Today Section */}
      <section className="today-section">
        <div className="today-container">
          <div className="today-content">
            <h2>{t('about.today.title')}</h2>
            <p>{t('about.today.paragraph1')}</p>
            <p>{t('about.today.paragraph2')}</p>
            <div className="today-image">
              <div className="today-photo-placeholder">
                <div className="placeholder-icon">🏢</div>
                <div className="placeholder-text">{t('about.today.photoPlaceholder')}</div>
              </div>
            </div>
            <p>{t('about.today.paragraph3')}</p>
            <p>{t('about.today.paragraph4')}</p>
          </div>
        </div>
      </section>

      {/* Philosophy & Values Section */}
      <section className="philosophy-section">
        <div className="philosophy-container">
          <h2>{t('about.philosophy.title')}</h2>
          <p>{t('about.philosophy.paragraph1')}</p>
          <p className="core-value-highlight">
            {t('about.philosophy.coreValue')} <strong>{t('about.philosophy.honesty')}</strong>. {t('about.philosophy.paragraph2')}
          </p>
          <div className="values-grid">
            <div className="value-item">
              <div className="value-icon">🎯</div>
              <h3>{t('about.philosophy.values.precision.title')}</h3>
              <p>{t('about.philosophy.values.precision.description')}</p>
            </div>
            <div className="value-item">
              <div className="value-icon">⚡</div>
              <h3>{t('about.philosophy.values.speed.title')}</h3>
              <p>{t('about.philosophy.values.speed.description')}</p>
            </div>
            <div className="value-item">
              <div className="value-icon">🤝</div>
              <h3>{t('about.philosophy.values.partnership.title')}</h3>
              <p>{t('about.philosophy.values.partnership.description')}</p>
            </div>
            <div className="value-item">
              <div className="value-icon">💎</div>
              <h3>{t('about.philosophy.values.quality.title')}</h3>
              <p>{t('about.philosophy.values.quality.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Trust Section */}
      <section className="trust-section">
        <div className="trust-container">
          <h2>{t('about.trust.title')}</h2>
          <div className="certifications">
            <div className="cert-badge">
              <div className="cert-icon">✓</div>
              <p>{t('about.trust.certifications.equipment')}</p>
            </div>
            <div className="cert-badge">
              <div className="cert-icon">✓</div>
              <p>{t('about.trust.certifications.quality')}</p>
            </div>
            <div className="cert-badge">
              <div className="cert-icon">✓</div>
              <p>{t('about.trust.certifications.ecoFriendly')}</p>
            </div>
            <div className="cert-badge">
              <div className="cert-icon">✓</div>
              <p>{t('about.trust.certifications.satisfaction')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2>{t('about.cta.title')}</h2>
          <p>{t('about.cta.subtitle')}</p>
          <Link to="/contact" className="btn-primary">{t('about.cta.button')}</Link>
        </div>
      </section>
    </>
  )
}

export default About