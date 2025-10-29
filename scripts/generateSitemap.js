// Sitemap Generator Script
import fs from 'fs'
import path from 'path'

// Configuration
const BASE_URL = 'https://xtmedia.com' // Replace with your actual domain
const OUTPUT_DIR = './public'
const SITEMAP_FILE = 'sitemap.xml'

// Static routes with their priorities and change frequencies
const staticRoutes = [
  {
    url: '/',
    priority: 1.0,
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/services',
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/services/laser-engraving',
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/services/sublimation-printing',
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/services/dtg-printing',
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/services/photo-printing',
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/services/brand-products',
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/products',
    priority: 0.9,
    changefreq: 'daily',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/search',
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/about',
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/contact',
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    url: '/reviews',
    priority: 0.6,
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  }
]

// Dynamic product routes (for demo purposes - in production, fetch from Shopify)
const getProductRoutes = () => {
  // In a real implementation, you would fetch products from Shopify API
  // For demo purposes, we'll use some example product handles
  const productHandles = [
    'custom-phone-cases',
    'custom-t-shirts',
    'engraved-mugs',
    'photo-prints',
    'awards-trophies',
    'signage',
    'corporate-gifts',
    'art-prints',
    'brand-tshirt',
    'brand-hoodie',
    '3d-puzzle-logo',
    'decorative-shelf',
    'brand-cap',
    'wall-art',
    'polo-shirt',
    'puzzle-building',
    'desk-organizer',
    'jacket',
    'animal-puzzle',
    'bookshelf'
  ]

  return productHandles.map(handle => ({
    url: `/products/${handle}`,
    priority: 0.6,
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  }))
}

// Generate sitemap XML
function generateSitemapXML(routes) {
  const urls = routes.map(route => `
  <url>
    <loc>${BASE_URL}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

// Generate robots.txt
function generateRobotsTxt() {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml

# Disallow admin and private paths
Disallow: /admin
Disallow: /api
Disallow: /_next
Disallow: /assets

# Allow important paths
Allow: /assets/*.css
Allow: /assets/*.js
Allow: /images

# Crawl delay
Crawl-delay: 1`
}

// Main function
function generateSitemap() {
  try {
    // Combine static and dynamic routes
    const allRoutes = [
      ...staticRoutes,
      ...getProductRoutes()
    ]

    // Generate sitemap XML
    const sitemapXML = generateSitemapXML(allRoutes)
    
    // Generate robots.txt
    const robotsTxt = generateRobotsTxt()

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true })
    }

    // Write sitemap.xml
    const sitemapPath = path.join(OUTPUT_DIR, SITEMAP_FILE)
    fs.writeFileSync(sitemapPath, sitemapXML, 'utf8')
    
    // Write robots.txt
    const robotsPath = path.join(OUTPUT_DIR, 'robots.txt')
    fs.writeFileSync(robotsPath, robotsTxt, 'utf8')

    console.log(`✅ Sitemap generated successfully!`)
    console.log(`   - ${allRoutes.length} URLs included`)
    console.log(`   - Sitemap: ${sitemapPath}`)
    console.log(`   - Robots: ${robotsPath}`)
    console.log(`   - Base URL: ${BASE_URL}`)

  } catch (error) {
    console.error('❌ Error generating sitemap:', error)
    process.exit(1)
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap()
}

export { generateSitemap, staticRoutes, getProductRoutes }