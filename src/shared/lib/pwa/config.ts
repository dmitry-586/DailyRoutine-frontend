import { PWA_CONSTANTS } from './constants'
import type { PWAConfig } from './types'

export const pwaConfig: PWAConfig = {
  manifest: {
    name: PWA_CONSTANTS.APP_NAME,
    short_name: PWA_CONSTANTS.APP_SHORT_NAME,
    description: PWA_CONSTANTS.APP_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    // 🎨 SPLASH SCREEN: Цвет фона экрана загрузки (показывается при запуске приложения)
    background_color: PWA_CONSTANTS.BACKGROUND_COLOR,
    // 🎨 SPLASH SCREEN: Цвет темы и статус-бара на экране загрузки
    theme_color: PWA_CONSTANTS.BACKGROUND_COLOR,
    lang: PWA_CONSTANTS.LANG,
    orientation: 'portrait',
    scope: '/',
    // 📱 ИКОНКА ПРИЛОЖЕНИЯ: Иконки для Android и других платформ (отображаются на рабочем столе)
    // Также используются для генерации splash screen - иконка центрируется на фоне background_color
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
    categories: [...PWA_CONSTANTS.CATEGORIES],
    prefer_related_applications: false,
  },
  metadata: {
    title: PWA_CONSTANTS.APP_NAME,
    description: PWA_CONSTANTS.APP_DESCRIPTION,
    applicationName: PWA_CONSTANTS.APP_NAME,
    manifest: PWA_CONSTANTS.MANIFEST_PATH,
    appleWebApp: {
      title: PWA_CONSTANTS.APP_NAME,
      // 🎨 SPLASH SCREEN iOS: Стиль статус-бара на экране загрузки
      statusBarStyle: 'black-translucent',
      capable: true,
    },
    // 📱 ИКОНКА ПРИЛОЖЕНИЯ: Иконки для браузеров (favicon, вкладка)
    icons: {
      icon: [
        {
          url: PWA_CONSTANTS.ICONS.SMALL,
          sizes: '192x192',
          type: 'image/png',
        },
        {
          url: PWA_CONSTANTS.ICONS.LARGE,
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      // 📱 ИКОНКА ПРИЛОЖЕНИЯ iOS: Apple Touch Icon (отображается на рабочем столе iOS)
      // 🎨 SPLASH SCREEN iOS: Эта иконка также используется для генерации splash screen на iOS
      // (центрируется на фоне background_color)
      apple: [
        {
          url: PWA_CONSTANTS.ICONS.SMALL,
          sizes: '192x192',
          type: 'image/png',
        },
      ],
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
