import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import ProfileTab from '../components/account/ProfileTab'
import OrdersTab from '../components/account/OrdersTab'
import AddressesTab from '../components/account/AddressesTab'
import './Account.css'

function Account() {
  const navigate = useNavigate()
  const { isAuthenticated, isLoading, customer, getCustomerDetails } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [customerData, setCustomerData] = useState(null)
  const [dataLoading, setDataLoading] = useState(true)

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/account' } } })
    }
  }, [isAuthenticated, isLoading, navigate])

  // Load customer data
  useEffect(() => {
    const loadCustomerData = async () => {
      if (isAuthenticated) {
        setDataLoading(true)
        const data = await getCustomerDetails()
        setCustomerData(data)
        setDataLoading(false)
      }
    }

    loadCustomerData()
  }, [isAuthenticated, getCustomerDetails])

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'orders', label: 'Orders', icon: '📦' },
    { id: 'addresses', label: 'Addresses', icon: '📍' }
  ]

  if (isLoading || !isAuthenticated) {
    return null
  }

  return (
    <div className="account-page">
      {/* Hero Section */}
      <section className="account-hero">
        <div className="account-hero-content">
          <h1 className="account-title">My Account</h1>
          <p className="account-subtitle">
            Welcome back, {customer?.firstName || 'there'}!
          </p>
        </div>
      </section>

      {/* Account Content */}
      <section className="account-content">
        <div className="account-container">
          {/* Tabs Navigation */}
          <div className="account-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`account-tab ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="account-tab-content">
            {activeTab === 'profile' && (
              <ProfileTab customer={customer} />
            )}
            {activeTab === 'orders' && (
              <OrdersTab
                customerData={customerData}
                isLoading={dataLoading}
              />
            )}
            {activeTab === 'addresses' && (
              <AddressesTab
                customerData={customerData}
                isLoading={dataLoading}
                onUpdate={() => getCustomerDetails().then(setCustomerData)}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Account
