import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com'; // Make sure you've run: npm install emailjs-com
import './Contact.css';

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  // --- Your EmailJS credentials ---
  // It's highly recommended to store these in environment variables
  // for better security, especially in a public repository.
  const SERVICE_ID = 'service_08rzodn'; // Your EmailJS Service ID
  const TEMPLATE_ID = 'template_9lykb25'; // Replace with your Template ID from EmailJS dashboard
  const PUBLIC_KEY = 'TuZi83K6rXe00z2w6'; // Replace with your Public Key from EmailJS dashboard

  // --- Updated Form Submission Handler ---
  const onSubmit = async (data) => {
    // The 'data' object contains all the validated form fields.
    // We pass this directly to EmailJS as the template parameters.
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY);
      // Reset the form fields after successful submission
      reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      // You can add user-facing error handling here, like a toast notification.
      alert('Oops! Something went wrong. Please try again later.');
    }
  };

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
            {/* Contact info section remains unchanged */}
            <h2>Contact Information</h2>
            <div className="contact-details">
              <div className="contact-item"><h3>📍 Address</h3><p>123 Business Street<br />Your City, State 12345</p></div>
              <div className="contact-item"><h3>📞 Phone</h3><p>(555) 123-4567</p></div>
              <div className="contact-item"><h3>✉️ Email</h3><p>hello@xtmedia.com</p></div>
              <div className="contact-item"><h3>🕒 Hours</h3><p>Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 4PM<br />Sunday: Closed</p></div>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send us a Message</h2>

            {isSubmitSuccessful ? (
              <div className="form-success">
                <h3>✅ Thank You!</h3>
                <p>Your message has been sent. We'll get back to you shortly.</p>
              </div>
            ) : (
              // The handleSubmit function from react-hook-form wraps our onSubmit
              <form onSubmit={handleSubmit(onSubmit)} className="form" noValidate>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Your name is required.' })}
                  />
                  {errors.name && <p className="error-message">{errors.name.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'Your email is required.',
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Please enter a valid email address.',
                      },
                    })}
                  />
                  {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone (Optional)</label>
                  <input type="tel" id="phone" {...register('phone')} />
                </div>
                <div className="form-group">
                  <label htmlFor="service">Service Interest</label>
                  <select id="service" {...register('service')}>
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
                  <textarea
                    id="message"
                    rows="5"
                    {...register('message', {
                      required: 'Please provide some details about your project.',
                    })}
                  ></textarea>
                  {errors.message && <p className="error-message">{errors.message.message}</p>}
                </div>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;