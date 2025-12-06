import { PWA_CONSTANTS } from './constants'
import type { PWAConfig } from './types'

const iconSmall = {
  url: PWA_CONSTANTS.ICONS.SMALL,
  sizes: '192x192',
  type: 'image/png',
}

const iconLarge = {
  url: PWA_CONSTANTS.ICONS.LARGE,
  sizes: '512x512',
  type: 'image/png',
}

export const pwaConfig: PWAConfig = {
  manifest: {
    name: PWA_CONSTANTS.APP_NAME,
    short_name: PWA_CONSTANTS.APP_SHORT_NAME,
    description: PWA_CONSTANTS.APP_DESCRIPTION,
    start_url: '/dashboard',
    display: 'standalone',
    background_color: PWA_CONSTANTS.BACKGROUND_COLOR,
    theme_color: PWA_CONSTANTS.BACKGROUND_COLOR,
    lang: PWA_CONSTANTS.LANG,
    orientation: 'portrait',
    scope: '/',
    icons: [
      {
        src: PWA_CONSTANTS.ICONS.SMALL,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: PWA_CONSTANTS.ICONS.LARGE,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    categories: PWA_CONSTANTS.CATEGORIES,
    prefer_related_applications: false,
  },
  metadata: {
    title: PWA_CONSTANTS.APP_NAME,
    description: PWA_CONSTANTS.APP_DESCRIPTION,
    applicationName: PWA_CONSTANTS.APP_NAME,
    manifest: PWA_CONSTANTS.MANIFEST_PATH,
    appleWebApp: {
      title: PWA_CONSTANTS.APP_NAME,
      statusBarStyle: 'black-translucent',
      capable: true,
    },
    icons: {
      icon: [iconSmall, iconLarge],
      apple: [iconSmall],
    },
    other: {
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
    themeColor: PWA_CONSTANTS.BACKGROUND_COLOR,
  },
  serviceWorker: {
    cacheName: `${PWA_CONSTANTS.CACHE_NAME_PREFIX}-${PWA_CONSTANTS.CACHE_VERSION}`,
    urlsToCache: [
      '/',
      PWA_CONSTANTS.MANIFEST_PATH,
      PWA_CONSTANTS.ICONS.SMALL,
      PWA_CONSTANTS.ICONS.LARGE,
    ],
    swPath: PWA_CONSTANTS.SERVICE_WORKER_PATH,
  },
}
