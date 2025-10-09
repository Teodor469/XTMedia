import { useState } from 'react'
import { useTranslation } from 'react-i18next'

function ProcessTimeline() {
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      id: 0,
      title: t('laserEngraving.processTimeline.steps.consultation.title'),
      icon: '💡',
      description: t('laserEngraving.processTimeline.steps.consultation.description'),
      details: t('laserEngraving.processTimeline.steps.consultation.details'),
      duration: t('laserEngraving.processTimeline.steps.consultation.duration')
    },
    {
      id: 1,
      title: t('laserEngraving.processTimeline.steps.creation.title'),
      icon: '🎨',
      description: t('laserEngraving.processTimeline.steps.creation.description'),
      details: t('laserEngraving.processTimeline.steps.creation.details'),
      duration: t('laserEngraving.processTimeline.steps.creation.duration')
    },
    {
      id: 2,
      title: t('laserEngraving.processTimeline.steps.setup.title'),
      icon: '🔧',
      description: t('laserEngraving.processTimeline.steps.setup.description'),
      details: t('laserEngraving.processTimeline.steps.setup.details'),
      duration: t('laserEngraving.processTimeline.steps.setup.duration')
    },
    {
      id: 3,
      title: t('laserEngraving.processTimeline.steps.engraving.title'),
      icon: '⚡',
      description: t('laserEngraving.processTimeline.steps.engraving.description'),
      details: t('laserEngraving.processTimeline.steps.engraving.details'),
      duration: t('laserEngraving.processTimeline.steps.engraving.duration')
    },
    {
      id: 4,
      title: t('laserEngraving.processTimeline.steps.finishing.title'),
      icon: '🔍',
      description: t('laserEngraving.processTimeline.steps.finishing.description'),
      details: t('laserEngraving.processTimeline.steps.finishing.details'),
      duration: t('laserEngraving.processTimeline.steps.finishing.duration')
    },
    {
      id: 5,
      title: t('laserEngraving.processTimeline.steps.delivery.title'),
      icon: '📦',
      description: t('laserEngraving.processTimeline.steps.delivery.description'),
      details: t('laserEngraving.processTimeline.steps.delivery.details'),
      duration: t('laserEngraving.processTimeline.steps.delivery.duration')
    }
  ]

  return (
    <div className="process-timeline">
      <div className="timeline-header">
        <h3>{t('laserEngraving.processTimeline.title')}</h3>
        <p>{t('laserEngraving.processTimeline.subtitle')}</p>
      </div>

      <div className="timeline-container">
        <div className="timeline-steps">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`timeline-step ${activeStep === index ? 'active' : ''} ${activeStep > index ? 'completed' : ''}`}
              onClick={() => setActiveStep(index)}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-icon">{step.icon}</div>
              <div className="step-content">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
                <span className="step-duration">{step.duration}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="timeline-details">
          <div className="detail-card">
            <div className="detail-header">
              <div className="detail-icon">{steps[activeStep].icon}</div>
              <div>
                <h3>{steps[activeStep].title}</h3>
                <span className="detail-duration">{t('laserEngraving.processTimeline.navigation.typicalDuration')} {steps[activeStep].duration}</span>
              </div>
            </div>
            <p className="detail-description">{steps[activeStep].details}</p>
            
            <div className="timeline-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
              <span className="progress-text">
                {t('laserEngraving.processTimeline.navigation.step')} {activeStep + 1} {t('laserEngraving.processTimeline.navigation.of')} {steps.length}
              </span>
            </div>

            <div className="timeline-navigation">
              <button 
                className="nav-btn prev" 
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
              >
                {t('laserEngraving.processTimeline.navigation.previous')}
              </button>
              <button 
                className="nav-btn next" 
                onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
              >
                {t('laserEngraving.processTimeline.navigation.next')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProcessTimeline