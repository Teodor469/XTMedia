function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-content">
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">
            Ready to start your project? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <div className="contact-details">
              <div className="contact-item">
                <h3>📍 Address</h3>
                <p>123 Business Street<br />Your City, State 12345</p>
              </div>
              <div className="contact-item">
                <h3>📞 Phone</h3>
                <p>(555) 123-4567</p>
              </div>
              <div className="contact-item">
                <h3>✉️ Email</h3>
                <p>hello@xtmedia.com</p>
              </div>
              <div className="contact-item">
                <h3>🕒 Hours</h3>
                <p>Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 4PM<br />Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send us a Message</h2>
            <form className="form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone (Optional)</label>
                <input type="tel" id="phone" name="phone" />
              </div>
              <div className="form-group">
                <label htmlFor="service">Service Interest</label>
                <select id="service" name="service">
                  <option value="">Select a service</option>
                  <option value="laser-engraving">Laser Engraving</option>
                  <option value="sublimation">Sublimation Printing</option>
                  <option value="dtg">DTG Printing</option>
                  <option value="photo-printing">Photo Printing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Project Details</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" className="btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact