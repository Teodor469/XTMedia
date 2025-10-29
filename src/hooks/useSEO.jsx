import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import React from 'react'
import SEOService from '../services/seo'

export const useSEO = (config = {}) => {
  const {
    title,
    description,
    keywords,
    canonical,
    image,
    type = 'website',
    structuredData,
    breadcrumbs
  } = config

  useEffect(() => {
    // Inject structured data if provided
    if (structuredData) {
      SEOService.injectStructuredData(structuredData)
    }

    // Inject breadcrumb structured data if provided
    if (breadcrumbs && breadcrumbs.length > 0) {
      const breadcrumbData = SEOService.generateBreadcrumbStructuredData(breadcrumbs)
      SEOService.injectStructuredData(breadcrumbData)
    }

    // Always inject organization data on every page
    const orgData = SEOService.generateOrganizationStructuredData()
    SEOService.injectStructuredData(orgData)

    // Inject website data for home page
    if (type === 'website') {
      const websiteData = SEOService.generateWebsiteStructuredData()
      SEOService.injectStructuredData(websiteData)
    }
  }, [structuredData, breadcrumbs, type])

  const SEOHelmet = ({ children }) => (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="XT Media" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Additional meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="XT Media" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {children}
    </Helmet>
  )

  return { SEOHelmet }
}

export const useProductSEO = (product) => {
  const metaTags = SEOService.getProductMetaTags(product)
  const structuredData = SEOService.generateProductStructuredData(product)

  return useSEO({
    ...metaTags,
    type: 'product',
    structuredData
  })
}

export const usePageSEO = (pageName) => {
  const metaTags = SEOService.getDefaultMetaTags(pageName)
  
  return useSEO(metaTags)
}