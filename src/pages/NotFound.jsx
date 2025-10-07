import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="app">
      <section className="not-found">
        <div className="not-found-content">
          <h1 className="not-found-title">404</h1>
          <h2>Page Not Found</h2>
          <p>The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="btn-primary">Go Home</Link>
        </div>
      </section>
    </div>
  )
}

export default NotFound