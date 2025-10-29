import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { useToast } from '../contexts/ToastContext'
import { useAnalytics } from '../hooks/useAnalytics'
import './QuoteModal.css'

function QuoteModal({ isOpen, onClose, projectType = '', material = '', design = '' }) {
  const { error } = useToast()
  const { trackGenerateLead } = useAnalytics()
  
  // --- React Hook Form Setup ---
  const {
    register,
    handleSubmit,
    trigger, // Used to manually trigger validation
    reset,   // Used to reset the form fields
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    // Set default values for the form, useful for pre-filling from props
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectType: projectType,
      material: material,
      design: design,
      width: '',
      height: '',
      quantity: '1',
      timeline: '',
      description: '',
      budget: '',
    },
  });

  const [currentStep, setCurrentStep] = useState(1);

  // --- Effect to handle successful submission ---
  // This replaces the logic that was inside the old handleSubmit function.
  useEffect(() => {
    if (isSubmitSuccessful) {
      const timer = setTimeout(() => {
        onClose(); // Close the modal
        setCurrentStep(1); // Reset to the first step for next time
        reset(); // Reset form fields to their default values
      }, 3000);

      // Cleanup timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [isSubmitSuccessful, onClose, reset]);

  // --- Effect to update form values if props change ---
  useEffect(() => {
    // This ensures if the modal is re-opened with new props, the form updates.
    reset({ projectType, material, design });
  }, [projectType, material, design, reset, isOpen]);


  // --- Step Navigation ---
  // Define which fields belong to which step for validation
  const fieldsByStep = {
    1: ['name', 'email'],
    2: ['width', 'height', 'quantity'],
    3: [], // No required fields on step 3, so no validation needed to proceed
  };

  const handleNextStep = async () => {
    // Trigger validation for the fields on the current step
    const isValid = await trigger(fieldsByStep[currentStep]);
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // --- EmailJS credentials ---
  const SERVICE_ID = 'service_08rzodn';
  const TEMPLATE_ID = 'template_9lykb25';
  const PUBLIC_KEY = 'TuZi83K6rXe00z2w6';

  // --- Form Submission Handler ---
  const onSubmit = async (data) => {
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY);
      
      // Track quote request lead generation
      trackGenerateLead('quote_form')
      
      // The useEffect for isSubmitSuccessful will handle the rest.
    } catch (err) {
      console.error('EmailJS Error:', err);
      error('Oops! Something went wrong. Please try again later.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="quote-modal-overlay" onClick={onClose}>
      <div className="quote-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        {!isSubmitSuccessful ? (
          <>
            <div className="quote-header">
              <h2>Get Your Custom Quote</h2>
              <div className="step-indicator">
                {/* Step indicator remains the same */}
                <div className={`step ${currentStep >= 1 ? 'active' : ''}`}><span>1</span><p>Contact</p></div>
                <div className={`step ${currentStep >= 2 ? 'active' : ''}`}><span>2</span><p>Project</p></div>
                <div className={`step ${currentStep >= 3 ? 'active' : ''}`}><span>3</span><p>Details</p></div>
              </div>
            </div>

            {/* We pass our onSubmit function wrapped in the library's handleSubmit */}
            <form onSubmit={handleSubmit(onSubmit)} className="quote-form" noValidate>
              {currentStep === 1 && (
                <div className="form-step">
                  <h3>Contact Information</h3>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      {...register('name', { required: 'Full Name is required' })}
                    />
                    {errors.name && <p className="error-message">{errors.name.message}</p>}
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Please enter a valid email address',
                        },
                      })}
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+359 1234 567 89"
                      {...register('phone')}
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="form-step">
                  <h3>Project Specifications</h3>
                  <div className="form-group">
                    <label>Project Type</label>
                    <select {...register('projectType')}>
                      <option value="">Select project type</option>
                      <option value="business-signage">Business Signage</option>
                      <option value="personal-gift">Personal Gift</option>
                      <option value="memorial-piece">Memorial Piece</option>
                      <option value="award-trophy">Award/Trophy</option>
                      <option value="home-decor">Home Decor</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Material Preference</label>
                    <select {...register('material')}>
                      <option value="">Select material</option>
                      <option value="oak-wood">Oak Wood</option>
                      <option value="walnut-wood">Walnut Wood</option>
                      <option value="bamboo">Bamboo</option>
                      <option value="stainless-steel">Stainless Steel</option>
                      <option value="aluminum">Aluminum</option>
                      <option value="clear-acrylic">Clear Acrylic</option>
                      <option value="colored-acrylic">Colored Acrylic</option>
                      <option value="clear-glass">Clear Glass</option>
                      <option value="frosted-glass">Frosted Glass</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Width (inches)</label>
                      <input
                        type="number"
                        placeholder="e.g., 6"
                        step="0.1"
                        {...register('width', { min: { value: 0.1, message: 'Must be > 0' }, valueAsNumber: true })}
                      />
                      {errors.width && <p className="error-message">{errors.width.message}</p>}
                    </div>
                    <div className="form-group">
                      <label>Height (inches)</label>
                      <input
                        type="number"
                        placeholder="e.g., 4"
                        step="0.1"
                        {...register('height', { min: { value: 0.1, message: 'Must be > 0' }, valueAsNumber: true })}
                      />
                      {errors.height && <p className="error-message">{errors.height.message}</p>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      placeholder="1"
                      {...register('quantity', { min: { value: 1, message: 'Minimum 1' }, valueAsNumber: true })}
                    />
                     {errors.quantity && <p className="error-message">{errors.quantity.message}</p>}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="form-step">
                  <h3>Additional Details</h3>
                   <div className="form-group">
                    <label>Timeline Needed</label>
                    <select {...register('timeline')}>
                      <option value="">Select timeline</option>
                      <option value="rush-1-3-days">Rush (1-3 days) - Additional cost</option>
                      <option value="standard-1-week">Standard (1 week)</option>
                      <option value="flexible-2-weeks">Flexible (2+ weeks)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Budget Range</label>
                    <select {...register('budget')}>
                      <option value="">Select budget range</option>
                      <option value="25-50">$25 - $50</option>
                      <option value="50-100">$50 - $100</option>
                      <option value="100-250">$100 - $250</option>
                      <option value="250-500">$250 - $500</option>
                      <option value="500-plus">$500+</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Project Description</label>
                    <textarea
                      placeholder="Describe your project..."
                      rows="4"
                      {...register('description')}
                    />
                  </div>
                </div>
              )}

              <div className="form-navigation">
                {currentStep > 1 && (
                  <button type="button" className="btn-secondary" onClick={handlePrevStep}>
                    ← Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button type="button" className="btn-primary" onClick={handleNextStep}>
                    Next →
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="btn-primary" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Get Quote'}
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          <div className="quote-success">
            <div className="success-icon">✅</div>
            <h2>Quote Request Submitted!</h2>
            <p>Thank you for your interest! We'll review your project and send you a detailed quote within 24 hours.</p>
            <p className="success-note">Check your email for confirmation and next steps.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuoteModal;