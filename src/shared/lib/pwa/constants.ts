export const PWA_CONSTANTS = {
  MANIFEST_PATH: '/pwa/manifest.json',
  SERVICE_WORKER_PATH: '/pwa/sw.js',
  ICONS: {
    SMALL: '/icons/PWA-icon-192.png',
    LARGE: '/icons/PWA-icon-512.png',
  },
  BACKGROUND_COLOR: '#32373a',
  APP_NAME: 'Daily Routine',
  APP_SHORT_NAME: 'DailyRoutine',
  APP_DESCRIPTION: 'Daily Routine - управляйте своими ежедневными задачами',
  LANG: 'ru',
  CATEGORIES: ['productivity', 'utilities'],
  CACHE_NAME_PREFIX: 'daily-routine',
  CACHE_VERSION: 'v2',
} as const
