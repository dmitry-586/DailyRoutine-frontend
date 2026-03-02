'use client'

import { LandingLayout } from '@/shared/model/providers'
import { AnimatePresence, m, Variants } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: 'Нужно ли устанавливать приложение?',
    answer:
      'Нет, все управление привычками происходит через наш веб-интерфейс (PWA) и Telegram-бота. Вам не нужно ничего скачивать из App Store или Google Play.',
  },
  {
    question: 'Это платно?',
    answer:
      'У нас есть бесплатный тариф, который включает в себя все базовые функции для формирования привычек. Также есть Premium-подписка с расширенной статистикой и ИИ-аналитикой.',
  },
  {
    question: 'Как работают уведомления?',
    answer:
      'Бот присылает вам сообщение в Telegram в заданное время. Вы можете отметить выполнение привычки прямо в чате, нажав на кнопку под сообщением.',
  },
  {
    question: 'Могу ли я использовать сервис без Telegram?',
    answer:
      'Основная фишка нашего сервиса — интеграция с Telegram для удобства. Однако вы можете управлять своими привычками и через веб-интерфейс.',
  },
  {
    question: 'Как часто приходят напоминания?',
    answer:
      'Вы сами настраиваете расписание для каждой привычки. Это может быть ежедневное напоминание, в определенные дни недели или даже несколько раз в день.',
  },
  {
    question: 'Мои данные в безопасности?',
    answer:
      'Да, мы серьезно относимся к конфиденциальности. Мы используем безопасные протоколы передачи данных и не передаем вашу информацию третьим лицам.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const cardVariants: Variants = {
    hiddenLeft: { opacity: 0, x: -100 },
    hiddenRight: { opacity: 0, x: 100    },
    visible: {
      opacity: 1,
      x: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  }

  return (
    <LandingLayout>
      <section className='py-20 max-md:py-16 max-sm:py-12'>
        <m.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring' }}
          className='mb-16 text-center max-md:mb-12 max-sm:mb-10'
        >
          <h2 className='mb-4 text-4xl font-bold max-md:text-3xl max-sm:text-2xl'>
            Частые <span className='text-primary'>вопросы</span>
          </h2>
          <p className='text-light-gray mx-auto max-w-2xl text-lg max-md:text-base max-sm:text-sm'>
            Все, что вы хотели знать о Daily Routine
          </p>
        </m.div>

        <div className='mx-auto max-w-3xl space-y-6'>
          {faqs.map((faq, index) => (
            <m.div
              key={index}
              initial={index % 2 === 0 ? 'hiddenLeft' : 'hiddenRight'}
              whileInView='visible'
              variants={cardVariants}
              viewport={{ once: true, margin: '-50px' }}
              className='group relative'
            >
              <m.div
                layout
                className={`bg-gray relative overflow-hidden rounded-3xl border border-white/5 transition-all duration-500 ${
                  openIndex === index
                    ? 'ring-primary/40 shadow-primary/10 ring-2 shadow-2xl'
                    : 'hover:border-primary/30 shadow-none'
                }`}
              >
                <AnimatePresence>
                  {openIndex === index && (
                    <m.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='bg-primary/5 absolute inset-0 pointer-events-none'
                    />
                  )}
                </AnimatePresence>

                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className='relative flex w-full items-center justify-between p-7 text-left max-md:p-4'
                >
                  <span
                    className={`text-lg font-semibold transition-all duration-300 max-md:text-sm ${
                      openIndex === index
                        ? 'text-primary translate-x-2'
                        : 'group-hover:text-primary'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <m.div
                    animate={{
                      rotate: openIndex === index ? 180 : 0,
                      backgroundColor:
                        openIndex === index
                          ? 'var(--color-primary)'
                          : 'rgba(255,255,255,0.05)',
                      color: openIndex === index ? '#000' : '#fff',
                    }}
                    className='flex size-10 max-sm:size-8 shrink-0 items-center justify-center rounded-full transition-shadow group-hover:shadow-lg'
                  >
                    <ChevronDown className='size-6 max-sm:size-5' />
                  </m.div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <m.div
                      key='content'
                      initial='collapsed'
                      animate='open'
                      exit='collapsed'
                      variants={{
                        open: { opacity: 1, height: 'auto', marginBottom: 0 },
                        collapsed: { opacity: 0, height: 0, marginBottom: 0 },
                      }}
                      transition={{
                        duration: 0.4,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <div className='text-light-gray relative px-7 pb-7 text-base leading-relaxed max-md:px-6 max-md:pb-6 max-md:text-sm'>
                        <m.div
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className='border-primary/20 border-l-2 pl-6'
                        >
                          {faq.answer}
                        </m.div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            </m.div>
          ))}
        </div>
      </section>
    </LandingLayout>
  )
}
