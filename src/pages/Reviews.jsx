import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ReviewStats from '../components/ReviewStats'
import ReviewCard from '../components/ReviewCard'
import ReviewForm from '../components/ReviewForm'
import './Reviews.css'

function Reviews() {
  const { t } = useTranslation()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterRating, setFilterRating] = useState('all')

  // Fetch reviews from JSON file
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/reviews.json')
        const data = await response.json()
        setReviews(data)
      } catch (error) {
        console.error('Error loading reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  // Filter reviews by rating
  const filteredReviews = filterRating === 'all'
    ? reviews
    : reviews.filter(r => r.rating === parseInt(filterRating))

  // Handle successful form submission
  const handleSubmitSuccess = (formData) => {
    console.log('Review submitted successfully:', formData)
    // You could show a notification or scroll to top here
  }

  return (
    <>
      {/* Hero Section */}
      <section className="page-hero reviews-hero">
        <div className="page-hero-content">
          <h1 className="page-title">{t('reviews.hero.title')}</h1>
          <p className="page-subtitle">{t('reviews.hero.subtitle')}</p>
        </div>
      </section>

      {/* Statistics Section */}
      <ReviewStats reviews={reviews} />

      {/* Reviews List Section */}
      <section className="reviews-list-section">
        <div className="reviews-list-container">
          <div className="reviews-header">
            <h2 className="section-title">{t('reviews.list.title')}</h2>

            <div className="reviews-filter">
              <label>{t('reviews.list.filterBy')}</label>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="filter-select"
              >
                <option value="all">{t('reviews.list.allRatings')}</option>
                <option value="5">5 ★</option>
                <option value="4">4 ★</option>
                <option value="3">3 ★</option>
                <option value="2">2 ★</option>
                <option value="1">1 ★</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading-reviews">
              <div className="loading-spinner">🔄 {t('reviews.list.loading')}</div>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="no-reviews">
              <p>{t('reviews.list.noReviews')}</p>
            </div>
          ) : (
            <div className="reviews-grid">
              {filteredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Submit Review Form Section */}
      <section className="submit-review-section">
        <div className="submit-review-container">
          <ReviewForm onSubmitSuccess={handleSubmitSuccess} />
        </div>
      </section>
    </>
  )
}

export default Reviews
