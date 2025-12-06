export const PWA_CONSTANTS = {
  // Пути
  MANIFEST_PATH: '/pwa/manifest.json',
  SERVICE_WORKER_PATH: '/pwa/sw.js',

  // 📱 ИКОНКИ ПРИЛОЖЕНИЯ
  // Используются для отображения на рабочем столе устройства
  ICONS: {
    SMALL: '/icons/PWA-icon-192.png', // 192x192 - минимальный размер для Android
    LARGE: '/icons/PWA-icon-512.png', // 512x512 - рекомендуемый размер для Android
  },

  // 🎨 ЦВЕТА ДЛЯ SPLASH SCREEN (Экран загрузки)
  // background_color - цвет фона экрана загрузки
  // theme_color - цвет темы и статус-бара на экране загрузки
  BACKGROUND_COLOR: '#32373a',

  // Название приложения
  APP_NAME: 'Daily Routine',
  APP_SHORT_NAME: 'DailyRoutine',
  APP_DESCRIPTION: 'Daily Routine - управляйте своими ежедневными задачами',

  // Язык
  LANG: 'ru',

  // Категории
  CATEGORIES: ['productivity', 'utilities'],

  // Кэш
  CACHE_NAME_PREFIX: 'daily-routine',
  CACHE_VERSION: 'v1',
} as const
