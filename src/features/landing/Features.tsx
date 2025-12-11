import LandingLayout from '@/shared/model/providers/LandingLayout'
import {
  Bell,
  MessageSquare,
  PackageX,
  Shield,
  Smartphone,
  Zap,
  type LucideIcon,
} from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
  iconColor: 'primary' | 'green'
}

const features: Feature[] = [
  {
    icon: PackageX,
    title: 'Без установки приложений',
    description:
      'Не нужно скачивать и устанавливать отдельное приложение. Telegram уже есть на вашем устройстве — просто начните использовать бота.',
    iconColor: 'primary',
  },
  {
    icon: Zap,
    title: 'Мгновенное взаимодействие',
    description:
      'Отметить выполнение привычки — один клик в чате с ботом. Никаких переходов между приложениями, всё происходит там, где вы уже общаетесь.',
    iconColor: 'green',
  },
  {
    icon: Bell,
    title: 'Надёжные уведомления',
    description:
      'Telegram гарантирует доставку напоминаний. Они приходят вовремя, даже если приложение закрыто, и не теряются среди других уведомлений.',
    iconColor: 'primary',
  },
  {
    icon: Smartphone,
    title: 'Работает везде',
    description:
      'Один аккаунт на всех устройствах. Отмечайте привычки с телефона, планшета или компьютера — данные синхронизируются автоматически.',
    iconColor: 'green',
  },
  {
    icon: Shield,
    title: 'Безопасность и приватность',
    description:
      'Используйте уже существующий аккаунт Telegram. Не нужно создавать новый профиль или передавать лишние данные — всё защищено шифрованием.',
    iconColor: 'primary',
  },
  {
    icon: MessageSquare,
    title: 'Уже знакомый интерфейс',
    description:
      'Не нужно изучать новое приложение. Интерфейс Telegram вам уже знаком, поэтому работа с ботом интуитивно понятна с первого раза.',
    iconColor: 'green',
  },
]

export default function Features() {
  return (
    <LandingLayout>
      <section id='features' className='py-20 max-md:py-16 max-sm:py-12'>
        <div className='mb-16 text-center max-md:mb-12 max-sm:mb-10'>
          <h2 className='mb-4 text-4xl font-bold max-md:text-3xl max-sm:text-2xl'>
            Почему Telegram?
          </h2>
          <p className='text-light-gray mx-auto max-w-2xl text-lg max-md:text-base max-sm:text-sm'>
            Преимущества выбора Telegram для трекинга привычек
          </p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3'>
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className='bg-gray rounded-2xl p-6 max-md:p-5 max-sm:p-4'
              >
                <Icon
                  className={`mb-4 size-10 max-md:size-8 max-sm:size-7 ${
                    feature.iconColor === 'primary'
                      ? 'text-primary'
                      : 'text-green'
                  }`}
                />
                <h3 className='mb-3 text-lg leading-tight font-medium max-md:text-base max-sm:text-sm'>
                  {feature.title}
                </h3>
                <p className='text-light-gray text-sm max-sm:text-xs'>
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    </LandingLayout>
  )
}
