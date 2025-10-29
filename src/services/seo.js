// SEO Service for Meta Tags and Structured Data
export class SEOService {
  static generateProductStructuredData(product) {
    return {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.title,
      "description": product.description,
      "sku": product.id,
      "brand": {
        "@type": "Brand",
        "name": product.vendor || "XT Media"
      },
      "offers": {
        "@type": "Offer",
        "url": `${window.location.origin}/products/${product.handle}`,
        "priceCurrency": "USD",
        "price": product.price,
        "availability": product.variants?.[0]?.availableForSale 
          ? "https://schema.org/InStock" 
          : "https://schema.org/OutOfStock",
        "seller": {
          "@type": "Organization",
          "name": "XT Media"
        }
      }
    }
  }

  static generateBreadcrumbStructuredData(breadcrumbs) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": breadcrumb.name,
        "item": breadcrumb.url
      }))
    }
  }

  static generateOrganizationStructuredData() {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "XT Media",
      "description": "Precision crafted custom laser engraving, sublimation printing, and DTG solutions.",
      "url": window.location.origin,
      "logo": `${window.location.origin}/logo.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-123-4567",
        "contactType": "customer service",
        "availableLanguage": ["English", "Bulgarian"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Business Street",
        "addressLocality": "Your City",
        "addressRegion": "State",
        "postalCode": "12345",
        "addressCountry": "US"
      },
      "sameAs": [
        "https://www.facebook.com/xtmedia",
        "https://www.instagram.com/xtmedia",
        "https://www.linkedin.com/company/xtmedia"
      ]
    }
  }

  static generateWebsiteStructuredData() {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "XT Media",
      "description": "Custom laser engraving, sublimation printing, and DTG services",
      "url": window.location.origin,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${window.location.origin}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    }
  }

  static generateServiceStructuredData(serviceName, description, category) {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": serviceName,
      "description": description,
      "category": category,
      "provider": {
        "@type": "Organization",
        "name": "XT Media"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      }
    }
  }

  static generateFAQStructuredData(faqs) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
  }

  static injectStructuredData(data) {
    // Remove existing structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }

    // Create new script element
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  }

  static getDefaultMetaTags(page = 'home') {
    const baseUrl = window.location.origin
    const siteName = "XT Media"
    
    const pages = {
      home: {
        title: "XT Media - Precision Laser Engraving & Custom Printing Services",
        description: "Transform your vision into reality with our cutting-edge laser engraving, sublimation printing, and DTG solutions. Professional custom manufacturing services.",
        keywords: "laser engraving, sublimation printing, DTG printing, custom manufacturing, personalized gifts, business signage",
        canonical: baseUrl,
        image: `${baseUrl}/images/og-home.jpg`
      },
      products: {
        title: "Custom Products - XT Media",
        description: "Browse our extensive catalog of custom printing and engraving solutions. From personalized gifts to business branding.",
        keywords: "custom products, personalized items, laser engraved gifts, custom apparel, business materials",
        canonical: `${baseUrl}/products`,
        image: `${baseUrl}/images/og-products.jpg`
      },
      services: {
        title: "Our Services - Professional Custom Manufacturing | XT Media",
        description: "Comprehensive custom manufacturing services including laser engraving, sublimation printing, DTG printing, and photo printing.",
        keywords: "manufacturing services, laser engraving services, printing services, custom fabrication",
        canonical: `${baseUrl}/services`,
        image: `${baseUrl}/images/og-services.jpg`
      },
      contact: {
        title: "Contact Us - Get Your Custom Quote | XT Media",
        description: "Ready to start your custom project? Contact XT Media for professional laser engraving and printing services. Get your quote today.",
        keywords: "contact, quote, custom project, laser engraving quote, printing services quote",
        canonical: `${baseUrl}/contact`,
        image: `${baseUrl}/images/og-contact.jpg`
      },
      about: {
        title: "About XT Media - Your Custom Manufacturing Partner",
        description: "Learn about XT Media's expertise in laser engraving, sublimation printing, and custom manufacturing. Quality craftsmanship since day one.",
        keywords: "about xt media, custom manufacturing expertise, laser engraving company, printing company",
        canonical: `${baseUrl}/about`,
        image: `${baseUrl}/images/og-about.jpg`
      }
    }

    const pageData = pages[page] || pages.home

    return {
      title: pageData.title,
      description: pageData.description,
      keywords: pageData.keywords,
      canonical: pageData.canonical,
      openGraph: {
        title: pageData.title,
        description: pageData.description,
        image: pageData.image,
        url: pageData.canonical,
        type: 'website',
        siteName: siteName
      },
      twitter: {
        card: 'summary_large_image',
        title: pageData.title,
        description: pageData.description,
        image: pageData.image
      }
    }
  }

  static getProductMetaTags(product) {
    const baseUrl = window.location.origin
    const productUrl = `${baseUrl}/products/${product.handle}`
    
    return {
      title: `${product.title} - Custom ${product.productType || 'Product'} | XT Media`,
      description: product.description || `Custom ${product.title} available for personalization. Professional quality guaranteed.`,
      keywords: `${product.title}, custom ${product.productType}, personalized ${product.productType}, laser engraving`,
      canonical: productUrl,
      openGraph: {
        title: product.title,
        description: product.description,
        image: product.featuredImage?.url || `${baseUrl}/images/og-product-default.jpg`,
        url: productUrl,
        type: 'product',
        siteName: "XT Media",
        product: {
          price: product.price,
          currency: 'USD',
          availability: product.variants?.[0]?.availableForSale ? 'in stock' : 'out of stock'
        }
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title,
        description: product.description,
        image: product.featuredImage?.url || `${baseUrl}/images/twitter-product-default.jpg`
      }
    }
  }
}

export default SEOService