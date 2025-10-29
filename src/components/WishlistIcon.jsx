import { Link } from 'react-router-dom'
import { useWishlist } from '../contexts/WishlistContext'
import './WishlistIcon.css'

function WishlistIcon() {
  const { getWishlistCount } = useWishlist()
  const count = getWishlistCount()

  return (
    <Link to="/wishlist" className="wishlist-icon-container" title="My Wishlist">
      <span className="wishlist-heart">❤️</span>
      {count > 0 && (
        <span className="wishlist-badge">{count}</span>
      )}
    </Link>
  )
}

export default WishlistIcon
