import { SEO_CONSTANTS } from './constants'

export interface SoftwareApplicationSchema {
  '@context': string
  '@type': string
  name: string
  applicationCategory: string
  operatingSystem: string
  offers: {
    '@type': string
    price: string
    priceCurrency: string
  }
  description: string
  url: string
}

export interface FAQPageSchema {
  '@context': string
  '@type': string
  mainEntity: Array<{
    '@type': string
    name: string
    acceptedAnswer: {
      '@type': string
      text: string
    }
  }>
}

export const generateSoftwareApplicationSchema =
  (): SoftwareApplicationSchema => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SEO_CONSTANTS.SITE_NAME,
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Web, PWA',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'RUB',
    },
    description: SEO_CONSTANTS.SITE_DESCRIPTION,
    url: SEO_CONSTANTS.SITE_URL,
  })

export const generateFAQSchema = (): FAQPageSchema => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Что такое Daily Routine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Daily Routine - это умный трекер привычек с интеграцией Telegram. Вы настраиваете привычки один раз в веб-интерфейсе, а дальше получаете напоминания и отмечаете выполнение прямо в Telegram.',
      },
    },
    {
      '@type': 'Question',
      name: 'Как работает Daily Routine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Вы создаете привычки в веб-интерфейсе, настраиваете расписание и время напоминаний. Telegram бот отправляет вам уведомления в нужное время, и вы можете отмечать выполнение прямо в чате.',
      },
    },
    {
      '@type': 'Question',
      name: 'Сколько стоит Daily Routine?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Daily Routine полностью бесплатен. Вы можете использовать все функции без ограничений.',
      },
    },
    {
      '@type': 'Question',
      name: 'Нужно ли устанавливать приложение?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Daily Routine работает как PWA (Progressive Web App), что означает, что вы можете установить его на главный экран вашего устройства, но это не обязательно. Приложение работает в браузере и через Telegram бота.',
      },
    },
    {
      '@type': 'Question',
      name: 'Какие типы привычек можно отслеживать?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Вы можете отслеживать полезные и вредные привычки в трех форматах: да/нет (выполнено/не выполнено), количество (например, стаканов воды) и время (например, минут медитации).',
      },
    },
    {
      '@type': 'Question',
      name: 'Как настроить напоминания?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'При создании привычки вы можете указать дни недели, когда она должна выполняться, и время напоминания. Telegram бот будет отправлять вам уведомления в указанное время.',
      },
    },
  ],
})
