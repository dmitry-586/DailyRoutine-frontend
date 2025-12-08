import { MetadataRoute } from 'next'

import { SEO_CONSTANTS } from '@/shared/lib/seo'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SEO_CONSTANTS.SITE_URL

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/_next/'],
      },
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
