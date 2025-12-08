import { MetadataRoute } from 'next'

import { SEO_CONSTANTS } from '@/shared/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONSTANTS.SITE_URL

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
