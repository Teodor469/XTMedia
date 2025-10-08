import { useState } from 'react'

function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      id: 0,
      title: 'Design Consultation',
      icon: '💡',
      description: 'We work with you to understand your vision and requirements',
      details: 'Our team discusses your project goals, material preferences, size requirements, and design specifications. We provide expert recommendations based on your needs and budget.',
      duration: '30-60 min'
    },
    {
      id: 1,
      title: 'Design Creation',
      icon: '🎨',
      description: 'Professional design creation or your artwork preparation',
      details: 'We either create custom designs from scratch or prepare your existing artwork for laser engraving. This includes file optimization, sizing, and material-specific adjustments.',
      duration: '1-3 days'
    },
    {
      id: 2,
      title: 'Material Setup',
      icon: '🔧',
      description: 'Precise material placement and laser calibration',
      details: 'Your chosen material is carefully positioned and secured. Our laser system is calibrated for optimal settings including power, speed, and focus based on material type and thickness.',
      duration: '15-30 min'
    },
    {
      id: 3,
      title: 'Laser Engraving',
      icon: '⚡',
      description: 'High-precision laser engraving process',
      details: 'The laser precisely removes material according to your design. Our advanced systems ensure consistent depth and clean edges. Complex designs are completed in multiple passes if needed.',
      duration: '5 min - 2 hours'
    },
    {
      id: 4,
      title: 'Quality Check',
      icon: '🔍',
      description: 'Thorough inspection and finishing touches',
      details: 'Each piece is carefully inspected for quality and precision. Any excess material is cleaned away, and finishing touches are applied as needed.',
      duration: '10-15 min'
    },
    {
      id: 5,
      title: 'Delivery',
      icon: '📦',
      description: 'Secure packaging and prompt delivery',
      details: 'Your finished piece is carefully packaged to prevent damage during transport. We offer various delivery options including pickup, local delivery, and shipping.',
      duration: '1-3 days'
    }
  ]

  return (
    <div className="process-timeline">
      <div className="timeline-header">
        <h3>Our Laser Engraving Process</h3>
        <p>From concept to completion - see how we bring your vision to life</p>
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
                <span className="detail-duration">Typical duration: {steps[activeStep].duration}</span>
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
                Step {activeStep + 1} of {steps.length}
              </span>
            </div>

            <div className="timeline-navigation">
              <button 
                className="nav-btn prev" 
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
              >
                ← Previous
              </button>
              <button 
                className="nav-btn next" 
                onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProcessTimeline