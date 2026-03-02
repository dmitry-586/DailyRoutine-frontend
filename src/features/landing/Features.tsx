import { LandingLayout } from '@/shared/model/providers'
import { m, Variants } from 'framer-motion'
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function Features() {
  return (
    <LandingLayout>
      <section className='py-20 max-md:py-16 max-sm:py-12'>
        <m.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-16 text-center max-md:mb-12 max-sm:mb-10'
        >
          <h2 className='mb-4 text-4xl font-bold max-md:text-3xl max-sm:text-2xl'>
            Почему Telegram?
          </h2>
          <p className='text-light-gray mx-auto max-w-2xl text-lg max-md:text-base max-sm:text-sm'>
            Преимущества выбора Telegram для трекинга привычек
          </p>
        </m.div>

        <m.div 
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-50px' }}
          className='grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3'
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <m.div
                variants={itemVariants}
                key={feature.title}
                whileHover={{ y: -5 }}
                className='bg-gray group relative rounded-2xl p-6 transition-colors hover:bg-white/5 max-md:p-5 max-sm:p-4'
              >
                <Icon
                  className={`mb-4 size-10 transition-transform group-hover:scale-110 max-md:size-8 max-sm:size-7 ${
                    feature.iconColor === 'primary'
                      ? 'text-primary'
                      : 'text-green'
                  }`}
                />
                <h3 className='mb-3 text-lg leading-tight font-medium transition-colors group-hover:text-primary max-md:text-base max-sm:text-sm'>
                  {feature.title}
                </h3>
                <p className='text-light-gray text-sm max-sm:text-xs'>
                  {feature.description}
                </p>
              </m.div>
            )
          })}
        </m.div>
      </section>
    </LandingLayout>
  )
}
