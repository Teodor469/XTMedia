import { useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../../contexts/AuthContext'

function ProfileTab({ customer }) {
  const { updateProfile, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: customer?.firstName || '',
    lastName: customer?.lastName || '',
    email: customer?.email || '',
    phone: customer?.phone || '',
    acceptsMarketing: customer?.acceptsMarketing || false
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const result = await updateProfile(formData)

    if (result.success) {
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      firstName: customer?.firstName || '',
      lastName: customer?.lastName || '',
      email: customer?.email || '',
      phone: customer?.phone || '',
      acceptsMarketing: customer?.acceptsMarketing || false
    })
    setErrors({})
    setIsEditing(false)
  }

  return (
    <div className="profile-tab">
      <div className="tab-header">
        <div>
          <h2 className="tab-title">Profile Information</h2>
          <p className="tab-description">Manage your personal information</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn-secondary-sm"
          >
            ✏️ Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`form-input ${errors.firstName ? 'error' : ''}`}
                disabled={isLoading}
              />
              {errors.firstName && (
                <p className="form-error">{errors.firstName}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`form-input ${errors.lastName ? 'error' : ''}`}
                disabled={isLoading}
              />
              {errors.lastName && (
                <p className="form-error">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-input ${errors.email ? 'error' : ''}`}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="form-error">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              disabled={isLoading}
            />
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="acceptsMarketing"
              name="acceptsMarketing"
              checked={formData.acceptsMarketing}
              onChange={handleChange}
              className="checkbox-input"
              disabled={isLoading}
            />
            <label htmlFor="acceptsMarketing" className="checkbox-label">
              I want to receive news and special offers
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="profile-display">
          <div className="profile-info-grid">
            <div className="profile-info-item">
              <label className="profile-info-label">Name</label>
              <p className="profile-info-value">
                {customer?.firstName} {customer?.lastName}
              </p>
            </div>

            <div className="profile-info-item">
              <label className="profile-info-label">Email</label>
              <p className="profile-info-value">{customer?.email}</p>
            </div>

            <div className="profile-info-item">
              <label className="profile-info-label">Phone</label>
              <p className="profile-info-value">
                {customer?.phone || 'Not provided'}
              </p>
            </div>

            <div className="profile-info-item">
              <label className="profile-info-label">Marketing Emails</label>
              <p className="profile-info-value">
                {customer?.acceptsMarketing ? '✓ Subscribed' : '✗ Not subscribed'}
              </p>
            </div>

            <div className="profile-info-item">
              <label className="profile-info-label">Member Since</label>
              <p className="profile-info-value">
                {customer?.createdAt
                  ? new Date(customer.createdAt).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

ProfileTab.propTypes = {
  customer: PropTypes.object
}

export default ProfileTab
