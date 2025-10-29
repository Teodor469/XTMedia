import { useState } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../../contexts/AuthContext'
import AddressForm from './AddressForm'

function AddressesTab({ customerData, isLoading, onUpdate }) {
  const { deleteAddress, setDefaultAddress } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

  const addresses = customerData?.addresses?.edges || []
  const defaultAddressId = customerData?.defaultAddress?.id

  const handleEdit = (address) => {
    setEditingAddress(address)
    setShowForm(true)
  }

  const handleDelete = async (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      const result = await deleteAddress(addressId)
      if (result.success) {
        onUpdate()
      }
    }
  }

  const handleSetDefault = async (addressId) => {
    const result = await setDefaultAddress(addressId)
    if (result.success) {
      onUpdate()
    }
  }

  const handleFormClose = (success) => {
    setShowForm(false)
    setEditingAddress(null)
    if (success) {
      onUpdate()
    }
  }

  const formatAddress = (address) => {
    const parts = [
      address.address1,
      address.address2,
      address.city,
      address.province,
      address.zip,
      address.country
    ].filter(Boolean)

    return parts.join(', ')
  }

  if (isLoading) {
    return (
      <div className="addresses-tab">
        <div className="tab-header">
          <div>
            <h2 className="tab-title">Addresses</h2>
            <p className="tab-description">Manage your saved addresses</p>
          </div>
        </div>
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>Loading addresses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="addresses-tab">
      <div className="tab-header">
        <div>
          <h2 className="tab-title">Addresses</h2>
          <p className="tab-description">
            {addresses.length > 0
              ? `You have ${addresses.length} saved address${addresses.length !== 1 ? 'es' : ''}`
              : 'Manage your saved addresses'}
          </p>
        </div>
        <button
          onClick={() => {
            setEditingAddress(null)
            setShowForm(true)
          }}
          className="btn-primary-sm"
        >
          + Add Address
        </button>
      </div>

      {showForm && (
        <div className="address-form-modal">
          <div className="address-form-overlay" onClick={() => handleFormClose(false)} />
          <div className="address-form-container">
            <AddressForm
              address={editingAddress}
              onClose={handleFormClose}
            />
          </div>
        </div>
      )}

      {addresses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📍</div>
          <h3>No Saved Addresses</h3>
          <p>Add an address to make checkout faster next time.</p>
        </div>
      ) : (
        <div className="addresses-grid">
          {addresses.map(({ node: address }) => (
            <div
              key={address.id}
              className={`address-card ${address.id === defaultAddressId ? 'default' : ''}`}
            >
              {address.id === defaultAddressId && (
                <div className="address-badge">Default</div>
              )}

              <div className="address-content">
                <h4 className="address-name">
                  {address.firstName} {address.lastName}
                </h4>
                <p className="address-text">{formatAddress(address)}</p>
                {address.phone && (
                  <p className="address-phone">📞 {address.phone}</p>
                )}
              </div>

              <div className="address-actions">
                {address.id !== defaultAddressId && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="address-action-btn"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => handleEdit(address)}
                  className="address-action-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="address-action-btn delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

AddressesTab.propTypes = {
  customerData: PropTypes.object,
  isLoading: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired
}

export default AddressesTab
