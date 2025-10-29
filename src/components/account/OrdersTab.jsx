import PropTypes from 'prop-types'

function OrdersTab({ customerData, isLoading }) {
  const orders = customerData?.orders?.edges || []

  const getStatusBadge = (status) => {
    const statusMap = {
      PENDING: { label: 'Pending', class: 'badge-warning' },
      AUTHORIZED: { label: 'Authorized', class: 'badge-info' },
      PARTIALLY_PAID: { label: 'Partially Paid', class: 'badge-warning' },
      PAID: { label: 'Paid', class: 'badge-success' },
      PARTIALLY_REFUNDED: { label: 'Partially Refunded', class: 'badge-info' },
      REFUNDED: { label: 'Refunded', class: 'badge-neutral' },
      VOIDED: { label: 'Voided', class: 'badge-neutral' }
    }

    const config = statusMap[status] || { label: status, class: 'badge-neutral' }
    return <span className={`status-badge ${config.class}`}>{config.label}</span>
  }

  const getFulfillmentBadge = (status) => {
    const statusMap = {
      FULFILLED: { label: 'Delivered', class: 'badge-success' },
      IN_TRANSIT: { label: 'In Transit', class: 'badge-info' },
      PARTIALLY_FULFILLED: { label: 'Partially Shipped', class: 'badge-warning' },
      UNFULFILLED: { label: 'Processing', class: 'badge-warning' },
      RESTOCKED: { label: 'Restocked', class: 'badge-neutral' }
    }

    const config = statusMap[status] || { label: status, class: 'badge-neutral' }
    return <span className={`status-badge ${config.class}`}>{config.label}</span>
  }

  if (isLoading) {
    return (
      <div className="orders-tab">
        <div className="tab-header">
          <div>
            <h2 className="tab-title">Order History</h2>
            <p className="tab-description">View your past orders</p>
          </div>
        </div>
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="orders-tab">
      <div className="tab-header">
        <div>
          <h2 className="tab-title">Order History</h2>
          <p className="tab-description">
            {orders.length > 0
              ? `You have ${orders.length} order${orders.length !== 1 ? 's' : ''}`
              : 'View your past orders'}
          </p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3>No Orders Yet</h3>
          <p>When you make a purchase, your orders will appear here.</p>
          <a href="/products" className="btn-primary">
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(({ node: order }) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3 className="order-number">Order #{order.orderNumber}</h3>
                  <p className="order-date">
                    {new Date(order.processedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="order-badges">
                  {getFulfillmentBadge(order.fulfillmentStatus)}
                  {getStatusBadge(order.financialStatus)}
                </div>
              </div>

              <div className="order-items">
                {order.lineItems.edges.map(({ node: item }) => (
                  <div key={item.variant?.id || item.title} className="order-item">
                    {item.variant?.image?.url && (
                      <div className="order-item-image">
                        <img
                          src={item.variant.image.url}
                          alt={item.variant.image.altText || item.title}
                        />
                      </div>
                    )}
                    <div className="order-item-details">
                      <p className="order-item-title">{item.title}</p>
                      {item.variant?.title && item.variant.title !== 'Default Title' && (
                        <p className="order-item-variant">{item.variant.title}</p>
                      )}
                      <p className="order-item-quantity">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <span className="order-total-label">Total:</span>
                  <span className="order-total-amount">
                    {order.totalPrice.currencyCode} ${parseFloat(order.totalPrice.amount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

OrdersTab.propTypes = {
  customerData: PropTypes.object,
  isLoading: PropTypes.bool
}

export default OrdersTab
