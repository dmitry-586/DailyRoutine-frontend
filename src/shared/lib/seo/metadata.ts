import type { Metadata } from 'next'

import { SEO_CONSTANTS } from './constants'
import type { SEOConfig } from './types'

export const generateLandingMetadata = (config?: SEOConfig): Metadata => {
  const title = config?.title || SEO_CONSTANTS.SITE_NAME
  const description = config?.description || SEO_CONSTANTS.SITE_DESCRIPTION
  const keywords = config?.keywords || SEO_CONSTANTS.SITE_KEYWORDS
  const canonical = config?.canonical || SEO_CONSTANTS.SITE_URL
  const ogImage =
    config?.ogImage || `${SEO_CONSTANTS.SITE_URL}${SEO_CONSTANTS.OG_IMAGE}`

  const metadata: Metadata = {
    title: {
      default: title,
      template: `%s | ${SEO_CONSTANTS.SITE_NAME}`,
    },
    description,
    keywords: keywords.join(', '),
    metadataBase: new URL(SEO_CONSTANTS.SITE_URL),
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'website',
      locale: SEO_CONSTANTS.LOCALE,
      url: canonical,
      siteName: SEO_CONSTANTS.SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: SEO_CONSTANTS.OG_IMAGE_WIDTH,
          height: SEO_CONSTANTS.OG_IMAGE_HEIGHT,
          alt: SEO_CONSTANTS.SITE_NAME,
        },
      ],
    },
    robots: {
      index: !config?.noindex,
      follow: !config?.nofollow,
    },
  }

  return metadata
}
