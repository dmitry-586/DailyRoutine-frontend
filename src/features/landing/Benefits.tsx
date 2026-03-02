import { LandingLayout } from '@/shared/model/providers'
import { m, Variants } from 'framer-motion'
import { CheckCircle2, Layout, Sparkles, Zap } from 'lucide-react'

const benefits = [
  {
    title: 'Никаких лишних приложений',
    description: 'Все привычки живут в вашем Telegram, где вы и так проводите время.',
    icon: Layout,
    color: 'text-primary',
  },
  {
    title: 'Минимальные усилия',
    description: 'Отмечайте выполнение привычки в один клик прямо в чате с ботом.',
    icon: Zap,
    color: 'text-green',
  },
  {
    title: 'Умные уведомления',
    description: 'Бот напомнит вам в самое подходящее время, основываясь на вашем ритме.',
    icon: Sparkles,
    color: 'text-primary',
  },
  {
    title: 'Наглядный прогресс',
    description: 'Удобные графики и статистика помогут вам видеть реальный результат.',
    icon: CheckCircle2,
    color: 'text-green',
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

export function Benefits() {
  return (
    <LandingLayout>
      <section className='relative py-20 max-md:py-16 max-sm:py-12'>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-16 text-center max-md:mb-12 max-sm:mb-10'
        >
          <h2 className='mb-4 text-4xl font-bold max-md:text-3xl max-sm:text-2xl'>
            Почему это <span className='text-primary'>работает?</span>
          </h2>
          <p className='text-light-gray mx-auto max-w-2xl text-lg max-md:text-base max-sm:text-sm'>
            Мы создали систему, которая помогает вам строить привычки, а не бороться с интерфейсом
          </p>
        </m.div>

        <m.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-50px' }}
          className='grid gap-6 md:grid-cols-2 lg:gap-8'
        >
          {benefits.map((benefit) => (
            <m.div
              key={benefit.title}
              variants={itemVariants}
              className='bg-gray group relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-transparent p-8 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 max-md:p-6 max-sm:p-5'
            >
              <div className={`${benefit.color} bg-white/5 flex size-14 items-center justify-center rounded-2xl transition-all duration-500 ease-out group-hover:scale-110 max-md:size-12`}>
                <benefit.icon className='size-7 max-md:size-6' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='text-xl font-semibold transition-colors duration-500 group-hover:text-primary max-md:text-lg'>
                  {benefit.title}
                </h3>
                <p className='text-light-gray/80 text-base transition-colors duration-500 group-hover:text-white/90 max-md:text-sm'>
                  {benefit.description}
                </p>
              </div>

              <m.div
                className={`absolute -right-10 -bottom-10 size-40 blur-3xl opacity-10 transition-opacity duration-700 group-hover:opacity-20 ${benefit.color.replace('text-', 'bg-')}`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.05, 0.1, 0.05],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className='bg-primary absolute bottom-0 left-0 h-1 w-0 transition-all duration-700 ease-in-out group-hover:w-full' />
            </m.div>
          ))}
        </m.div>
      </section>
    </LandingLayout>
  )
}

