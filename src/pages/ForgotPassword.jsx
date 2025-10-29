import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Login.css'

function ForgotPassword() {
  const { recoverPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const validateEmail = () => {
    if (!email.trim()) {
      setError('Email is required')
      return false
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateEmail()) return

    setIsSubmitting(true)
    const result = await recoverPassword(email)
    setIsSubmitting(false)

    if (result.success) {
      setEmailSent(true)
    }
  }

  if (emailSent) {
    return (
      <div className="auth-page">
        <section className="auth-hero">
          <div className="auth-hero-content">
            <h1 className="auth-title">Check Your Email</h1>
            <p className="auth-subtitle">
              We've sent password reset instructions
            </p>
          </div>
        </section>

        <section className="auth-form-section">
          <div className="auth-container">
            <div className="auth-card">
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h2>Email Sent!</h2>
                <p>
                  We've sent password reset instructions to <strong>{email}</strong>.
                  Please check your inbox and follow the link to reset your password.
                </p>
                <p className="help-text">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button
                    onClick={() => {
                      setEmailSent(false)
                      setEmail('')
                    }}
                    className="text-link"
                  >
                    try again
                  </button>
                  .
                </p>
              </div>

              <div className="auth-card-footer">
                <Link to="/login" className="auth-secondary-link">
                  ← Back to Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="auth-page">
      {/* Hero Section */}
      <section className="auth-hero">
        <div className="auth-hero-content">
          <h1 className="auth-title">Forgot Password?</h1>
          <p className="auth-subtitle">
            Enter your email and we'll send you reset instructions
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="auth-form-section">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-card-header">
              <h2 className="auth-card-title">Reset Password</h2>
              <p className="auth-card-subtitle">
                Remember your password?{' '}
                <Link to="/login" className="auth-link">
                  Sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  className={`form-input ${error ? 'error' : ''}`}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                />
                {error && <p className="form-error">{error}</p>}
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Sending...
                  </>
                ) : (
                  'Send Reset Instructions'
                )}
              </button>
            </form>

            <div className="auth-card-footer">
              <Link to="/" className="auth-secondary-link">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ForgotPassword
