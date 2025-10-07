import { Link, useLocation } from 'react-router-dom'

function Navigation() {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav className="nav">
      <div className="nav-content">
        <Link to="/" className="logo">XT Media</Link>
        <div className="nav-links">
          <Link 
            to="/services" 
            className={isActive('/services') ? 'active' : ''}
          >
            Services
          </Link>
          <Link 
            to="/about" 
            className={isActive('/about') ? 'active' : ''}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={isActive('/contact') ? 'active' : ''}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navigation