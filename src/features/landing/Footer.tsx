'use client'

import { LandingLayout } from '@/shared/model/providers'
import { Logo } from '@/shared/ui'
import { Variants, m } from 'framer-motion'
import { ExternalLink, MessageCircle } from 'lucide-react'

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

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className='border-light-gray/20 bg-gray/50 border-t'>
      <LandingLayout>
        <m.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-50px' }}
          className='flex flex-col gap-8 py-10 max-md:py-6 max-sm:py-5'
        >
          <div className='flex flex-col gap-8 lg:flex-row lg:justify-between'>
            <m.div variants={itemVariants} className='flex max-w-lg flex-col gap-4'>
              <Logo title='Daily Routine' />
              <p className='text-light-gray text-sm leading-relaxed'>
                Умный трекер привычек с&nbsp;интеграцией Telegram. Настройте
                привычки один раз, а&nbsp;дальше получайте напоминания прямо
                в&nbsp;Telegram.
              </p>
            </m.div>

            <div className='flex gap-8 max-sm:justify-between sm:gap-12 lg:gap-16'>
              <m.nav variants={itemVariants} className='flex flex-col gap-4'>
                <h3 className='text-base font-semibold'>Навигация</h3>
                <div className='flex flex-col gap-3'>
                  <button
                    onClick={() => scrollToSection('features')}
                    className='text-light-gray hover:text-primary cursor-pointer text-left text-sm transition-colors duration-200'
                  >
                    Возможности
                  </button>
                  <button
                    onClick={() => scrollToSection('how-it-works')}
                    className='text-light-gray hover:text-primary cursor-pointer text-left text-sm transition-colors duration-200'
                  >
                    Как это работает
                  </button>
                </div>
              </m.nav>

              <m.div variants={itemVariants} className='flex flex-col gap-4'>
                <h3 className='text-base font-semibold'>Контакты</h3>
                <a
                  href='https://t.me/Da1lyRoutine_bot'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-light-gray hover:text-primary group flex items-center gap-2 text-sm transition-colors duration-200'
                >
                  <MessageCircle className='text-primary size-4 transition-transform duration-200 group-hover:scale-110' />
                  <span>Telegram бот</span>
                  <ExternalLink className='size-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
                </a>
              </m.div>
            </div>
          </div>

          <m.div variants={itemVariants} className='border-light-gray/20 border-t' />

          <m.div
            variants={itemVariants}
            className='flex flex-col items-center justify-between gap-4 max-sm:text-center sm:flex-row'
          >
            <p className='text-light-gray text-sm'>
              © {currentYear} Daily Routine. Все права защищены.
            </p>
            <p className='text-light-gray text-xs'>
              Сделано с ❤️ для ваших привычек
            </p>
          </m.div>
        </m.div>
      </LandingLayout>
    </footer>
  )
}
