import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import './ReviewStats.css'

function ReviewStats({ reviews }) {
  const { t } = useTranslation()

  // Calculate statistics
  const calculateStats = () => {
    if (reviews.length === 0) return { average: 0, total: 0, distribution: {} }

    const total = reviews.length
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    const average = (sum / total).toFixed(1)

    const distribution = {
      5: reviews.filter(r => r.rating === 5).length,
      4: reviews.filter(r => r.rating === 4).length,
      3: reviews.filter(r => r.rating === 3).length,
      2: reviews.filter(r => r.rating === 2).length,
      1: reviews.filter(r => r.rating === 1).length
    }

    return { average, total, distribution }
  }

  const stats = calculateStats()

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="stars stars-large">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={star <= rating ? 'star-filled' : 'star-empty'}>
            ★
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="reviews-stats">
      <div className="reviews-stats-container">
        <div className="stats-summary">
          <div className="average-rating">
            <div className="rating-number">{stats.average}</div>
            {renderStars(Math.round(stats.average))}
            <div className="total-reviews">
              {t('reviews.stats.basedOn', { count: stats.total })}
            </div>
          </div>

          <div className="rating-distribution">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = stats.distribution[rating] || 0
              const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0

              return (
                <div key={rating} className="distribution-row">
                  <span className="rating-label">{rating} ★</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="rating-count">{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

ReviewStats.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired
    })
  ).isRequired
}

export default ReviewStats
