import { useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../../contexts/AuthContext'

function AddressForm({ address, onClose }) {
  const { createAddress, updateAddress } = useAuth()
  const isEditing = !!address

  const [formData, setFormData] = useState({
    firstName: address?.firstName || '',
    lastName: address?.lastName || '',
    address1: address?.address1 || '',
    address2: address?.address2 || '',
    city: address?.city || '',
    province: address?.province || '',
    country: address?.country || '',
    zip: address?.zip || '',
    phone: address?.phone || ''
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.address1.trim()) newErrors.address1 = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.country.trim()) newErrors.country = 'Country is required'
    if (!formData.zip.trim()) newErrors.zip = 'Postal code is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    const result = isEditing
      ? await updateAddress(address.id, formData)
      : await createAddress(formData)

    setIsSubmitting(false)

    if (result.success) {
      onClose(true)
    }
  }

  return (
    <div className="address-form">
      <div className="address-form-header">
        <h3>{isEditing ? 'Edit Address' : 'Add New Address'}</h3>
        <button
          onClick={() => onClose(false)}
          className="close-btn"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`form-input ${errors.firstName ? 'error' : ''}`}
              disabled={isSubmitting}
            />
            {errors.firstName && (
              <p className="form-error">{errors.firstName}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`form-input ${errors.lastName ? 'error' : ''}`}
              disabled={isSubmitting}
            />
            {errors.lastName && (
              <p className="form-error">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address1" className="form-label">
            Address Line 1 *
          </label>
          <input
            type="text"
            id="address1"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            className={`form-input ${errors.address1 ? 'error' : ''}`}
            placeholder="Street address, P.O. box"
            disabled={isSubmitting}
          />
          {errors.address1 && (
            <p className="form-error">{errors.address1}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address2" className="form-label">
            Address Line 2
          </label>
          <input
            type="text"
            id="address2"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            className="form-input"
            placeholder="Apartment, suite, unit, building, floor, etc."
            disabled={isSubmitting}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city" className="form-label">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`form-input ${errors.city ? 'error' : ''}`}
              disabled={isSubmitting}
            />
            {errors.city && (
              <p className="form-error">{errors.city}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="province" className="form-label">
              State / Province
            </label>
            <input
              type="text"
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="form-input"
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="zip" className="form-label">
              Postal Code *
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className={`form-input ${errors.zip ? 'error' : ''}`}
              disabled={isSubmitting}
            />
            {errors.zip && (
              <p className="form-error">{errors.zip}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="country" className="form-label">
              Country *
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`form-input ${errors.country ? 'error' : ''}`}
              disabled={isSubmitting}
            />
            {errors.country && (
              <p className="form-error">{errors.country}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
            disabled={isSubmitting}
          />
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => onClose(false)}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                {isEditing ? 'Updating...' : 'Adding...'}
              </>
            ) : (
              isEditing ? 'Update Address' : 'Add Address'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

AddressForm.propTypes = {
  address: PropTypes.object,
  onClose: PropTypes.func.isRequired
}

export default AddressForm
