# Reviews System Setup Guide

## Overview
The Reviews page allows customers to submit reviews and displays existing reviews from a static JSON file. Review submissions are sent to your email via EmailJS for moderation before being manually added to the reviews database.

## Current Setup

### Components
- **Reviews Page**: `src/pages/Reviews.jsx`
- **Reviews Data**: `public/reviews.json`
- **Styling**: `src/pages/Reviews.css`
- **Route**: `/reviews`

### How It Works

```
User submits review → EmailJS sends email → You review submission
                                                      ↓
                                    Approve & add to reviews.json
                                                      ↓
                                    Review appears on website
```

## EmailJS Configuration

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (Free tier: 200 emails/month)
3. Verify your email address
4. Log in to your dashboard

### Step 2: Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the setup wizard:
   - **Gmail**: Click "Connect Account" and authorize
   - **Other**: Enter SMTP credentials
5. Click **Create Service**
6. Copy your **Service ID** (e.g., `service_abc1234`)

### Step 3: Create Email Template

1. Go to **Email Templates** in dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Review Submission - {{product}}

From: {{from_name}} ({{from_email}})
Product/Service: {{product}}
Rating: {{rating}} / 5 stars
Date: {{date}}

Review:
{{comment}}

---
This review was submitted through your website review form.
Please moderate and add to reviews.json if approved.
```

4. **Template Variables** to include:
   - `from_name`
   - `from_email`
   - `product`
   - `rating`
   - `comment`
   - `date`

5. Click **Save**
6. Copy your **Template ID** (e.g., `template_xyz5678`)

### Step 4: Get Public Key

1. Go to **Account** (top right menu)
2. Click **General** tab
3. Find **Public Key** section
4. Copy your **Public Key** (e.g., `abc123def456ghi789`)

### Step 5: Update Code

Open `src/pages/Reviews.jsx` and find this section (around line 72):

```javascript
// EmailJS configuration
// Replace these with your EmailJS credentials
const serviceId = 'YOUR_SERVICE_ID'
const templateId = 'YOUR_TEMPLATE_ID'
const publicKey = 'YOUR_PUBLIC_KEY'
```

Replace with your actual credentials:

```javascript
const serviceId = 'service_abc1234'      // Your Service ID
const templateId = 'template_xyz5678'    // Your Template ID
const publicKey = 'abc123def456ghi789'   // Your Public Key
```

### Step 6: Test the System

1. Navigate to `http://localhost:5173/reviews`
2. Fill out the review form
3. Click "Submit Review"
4. Check your email inbox for the submission
5. If successful, you'll see: "Thank you for your review!"

## Managing Reviews

### Adding New Reviews

When you receive a review submission email:

1. **Review the content** for appropriateness
2. **Open** `public/reviews.json`
3. **Add new entry** at the top of the array:

```json
{
  "id": "9",
  "name": "Customer Name",
  "product": "Product Name",
  "rating": 5,
  "comment": "Their review comment...",
  "date": "2024-03-20",
  "verified": true
}
```

4. **Save the file**
5. Review will appear immediately on the website

### Review Object Structure

```javascript
{
  "id": "unique-id",           // Unique identifier (increment number)
  "name": "John Doe",          // Customer name
  "product": "Custom T-Shirt", // Product/service name
  "rating": 5,                 // Rating (1-5)
  "comment": "Great quality!", // Review text
  "date": "2024-01-15",        // Submission date (YYYY-MM-DD)
  "verified": true             // Shows verification badge
}
```

### Editing Reviews

To edit an existing review:

1. Open `public/reviews.json`
2. Find the review by `id`
3. Modify the fields
4. Save the file

### Deleting Reviews

To remove a review:

1. Open `public/reviews.json`
2. Find and delete the entire review object
3. Save the file

## Features

### ✨ Current Features

**Display:**
- Average rating calculation
- Star rating visualization
- Rating distribution chart
- Filter reviews by star rating
- Responsive design (mobile-friendly)
- Verified purchase badges
- Loading states

**Submission Form:**
- Name, email, product fields
- Interactive star rating selector
- Comment textarea
- Email notification via EmailJS
- Success/error messages
- Form validation
- Bilingual (English/Bulgarian)

### 🎨 Customization

#### Change Colors

Edit `src/pages/Reviews.css`:

```css
/* Green accent color (line 210) */
.progress-fill {
  background: linear-gradient(90deg, #08b688 0%, #059669 100%);
}

/* Star color (line 48) */
.star-filled {
  color: #fbbf24;  /* Change to your brand color */
}
```

#### Modify Review Display

Edit `src/pages/Reviews.jsx`:

- Line 155: Change reviews per page
- Line 172: Modify date format
- Line 240: Adjust card layout

## Demo Mode

Currently, the form is in **demo mode** because EmailJS credentials haven't been configured.

**Demo behavior:**
- Form submissions are simulated (no email sent)
- Console logs the review data
- Shows success message
- Does NOT actually send emails

**To exit demo mode:**
Replace `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`, and `YOUR_PUBLIC_KEY` with your actual EmailJS credentials.

## Troubleshooting

### Form not sending emails?

**Check:**
1. EmailJS credentials are correct in `Reviews.jsx`
2. EmailJS service is active (check dashboard)
3. Email template is published
4. Browser console for errors
5. EmailJS monthly limit not exceeded (200 emails/month free)

### Reviews not displaying?

**Check:**
1. `public/reviews.json` exists
2. JSON syntax is valid (no trailing commas)
3. Browser console for errors
4. File path is correct

### Styling issues?

**Check:**
1. `Reviews.css` is imported in `Reviews.jsx`
2. CSS classes match component markup
3. Browser cache (hard refresh: Ctrl+F5)

## Upgrading to Real Backend (Future)

When you want to move beyond static files:

### Option 1: Firebase

```bash
npm install firebase
```

**Pros:** Real-time updates, automatic moderation
**Cons:** Requires setup, external dependency

### Option 2: Custom Backend

Build a Node.js/Express backend with:
- Database (MongoDB/PostgreSQL)
- REST API endpoints
- Admin panel for moderation

**Pros:** Full control, scalable
**Cons:** More complex, hosting required

### Option 3: Review Platforms

Use services like:
- **Judge.me** (Shopify integration)
- **Yotpo** (Enterprise reviews)
- **Trustpilot** (External platform)

**Pros:** Professional, feature-rich
**Cons:** Monthly fees, less control

## File Locations

- **Page Component**: `src/pages/Reviews.jsx`
- **Styles**: `src/pages/Reviews.css`
- **Reviews Data**: `public/reviews.json`
- **Route**: `src/router.jsx` (line 50)
- **Navigation**: `src/components/Navigation.jsx` (line 30)
- **Translations**:
  - English: `src/i18n/locales/en.json` (line 955)
  - Bulgarian: `src/i18n/locales/bg.json` (line 955)

## Security Notes

⚠️ **Important:**
- Never commit EmailJS credentials to public repositories
- Consider environment variables for production:
  ```javascript
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  ```
- Add to `.env`:
  ```
  VITE_EMAILJS_SERVICE_ID=service_abc1234
  VITE_EMAILJS_TEMPLATE_ID=template_xyz5678
  VITE_EMAILJS_PUBLIC_KEY=abc123def456ghi789
  ```

## Best Practices

1. **Moderate all reviews** before publishing
2. **Respond to negative reviews** professionally
3. **Keep reviews recent** (archive old ones)
4. **Encourage reviews** with email follow-ups
5. **Display verification badges** for genuine purchases
6. **Update regularly** to show active engagement

## Support

For EmailJS issues:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Support](https://www.emailjs.com/support/)

For code issues:
- Check browser console
- Review error messages
- Verify file paths and imports
