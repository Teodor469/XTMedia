import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import './ReviewCard.css'

function ReviewCard({ review }) {
  const { t } = useTranslation()

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="stars stars-small">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? 'star-filled' : 'star-empty'}>
            ★
          </span>
        ))}
      </div>
    )
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="review-avatar">
          {review.name.charAt(0).toUpperCase()}
        </div>
        <div className="review-info">
          <div className="review-name">
            {review.name}
            {review.verified && (
              <span className="verified-badge" title={t('reviews.list.verifiedPurchase')}>
                ✓
              </span>
            )}
          </div>
          <div className="review-meta">
            {renderStars(review.rating)}
            <span className="review-date">
              {formatDate(review.date)}
            </span>
          </div>
        </div>
      </div>

      <div className="review-product">{review.product}</div>
      <p className="review-comment">{review.comment}</p>
    </div>
  )
}

ReviewCard.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    verified: PropTypes.bool
  }).isRequired
}

export default ReviewCard
