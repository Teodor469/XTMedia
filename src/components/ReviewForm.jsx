import { useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import './ReviewForm.css'

function ReviewForm({ onSubmitSuccess }) {
  const { t } = useTranslation()

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    product: '',
    rating: 5,
    comment: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle rating change
  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      // EmailJS configuration
      // Replace these with your EmailJS credentials
      const serviceId = 'YOUR_SERVICE_ID'
      const templateId = 'YOUR_TEMPLATE_ID'
      const publicKey = 'YOUR_PUBLIC_KEY'

      // Check if EmailJS is configured
      if (serviceId === 'YOUR_SERVICE_ID') {
        // Demo mode - simulate success
        console.log('Demo mode: Review submission', formData)
        await new Promise(resolve => setTimeout(resolve, 1000))

        setSubmitSuccess(true)
        setFormData({
          name: '',
          email: '',
          product: '',
          rating: 5,
          comment: ''
        })

        // Call success callback if provided
        if (onSubmitSuccess) {
          onSubmitSuccess(formData)
        }

        // Hide success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000)
      } else {
        // Send email via EmailJS
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            product: formData.product,
            rating: formData.rating,
            comment: formData.comment,
            date: new Date().toLocaleDateString()
          },
          publicKey
        )

        setSubmitSuccess(true)
        setFormData({
          name: '',
          email: '',
          product: '',
          rating: 5,
          comment: ''
        })

        // Call success callback if provided
        if (onSubmitSuccess) {
          onSubmitSuccess(formData)
        }

        // Hide success message after 5 seconds
        setTimeout(() => setSubmitSuccess(false), 5000)
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      setSubmitError(t('reviews.form.error'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="review-form-wrapper">
      <h2 className="section-title">{t('reviews.form.title')}</h2>
      <p className="section-subtitle">{t('reviews.form.subtitle')}</p>

      <form onSubmit={handleSubmit} className="review-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">{t('reviews.form.name')} *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder={t('reviews.form.namePlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">{t('reviews.form.email')} *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder={t('reviews.form.emailPlaceholder')}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="product">{t('reviews.form.product')} *</label>
          <input
            type="text"
            id="product"
            name="product"
            value={formData.product}
            onChange={handleInputChange}
            required
            placeholder={t('reviews.form.productPlaceholder')}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">{t('reviews.form.rating')} *</label>
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-button ${star <= formData.rating ? 'active' : ''}`}
                onClick={() => handleRatingChange(star)}
                aria-label={`Rate ${star} stars`}
              >
                ★
              </button>
            ))}
            <span className="rating-label-text">
              {formData.rating} {t('reviews.form.outOf')} 5
            </span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="comment">{t('reviews.form.comment')} *</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            required
            rows="6"
            placeholder={t('reviews.form.commentPlaceholder')}
          />
        </div>

        {submitSuccess && (
          <div className="success-message">
            ✓ {t('reviews.form.success')}
          </div>
        )}

        {submitError && (
          <div className="error-message">
            ⚠️ {submitError}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary submit-button"
          disabled={submitting}
        >
          {submitting ? t('reviews.form.submitting') : t('reviews.form.submit')}
        </button>

        <p className="form-note">
          {t('reviews.form.note')}
        </p>
      </form>
    </div>
  )
}

ReviewForm.propTypes = {
  onSubmitSuccess: PropTypes.func
}

export default ReviewForm
