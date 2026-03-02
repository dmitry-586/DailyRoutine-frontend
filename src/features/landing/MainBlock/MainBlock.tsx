import { useAuthButton } from '@/shared/model/hooks'
import { TelegramAuthProps } from '@/shared/types'
import { Button } from '@/shared/ui'
import { Variants, m, useMotionValue, useTransform, animate } from 'framer-motion'
import { ArrowDown, ListChecks, Loader2, Rocket } from 'lucide-react'
import { useEffect, useState } from 'react'
import BlockCard from './BlockCard'
import { steps } from './config'

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
      ease: 'easeOut',
    },
  },
}

export function MainBlock({ setIsTelegramModalOpen }: TelegramAuthProps) {
  const { handleAuthClick, buttonText, isLoading } = useAuthButton(
    setIsTelegramModalOpen,
    'Начать бесплатно',
  )

  const [isTypingDone, setIsTypingDone] = useState(false)
  const baseText = 'Привычки, которые '
  const highlightText = 'работают!'
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const displayText = useTransform(rounded, (latest) => 
    highlightText.slice(0, latest)
  )

  useEffect(() => {
    const controls = animate(count, highlightText.length, {
      type: 'tween',
      duration: 1.5,
      ease: 'linear',
      delay: 0.5,
      onComplete: () => setIsTypingDone(true)
    })
    return controls.stop
  }, [count, highlightText.length])

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <m.section
      initial='hidden'
      animate='visible'
      variants={containerVariants}
      className='mt-8 text-center max-sm:mt-4'
    >
      <m.div
        variants={itemVariants}
        className='bg-primary/10 mx-auto mb-8 flex w-fit items-center gap-2 rounded-full px-5 py-2 max-md:mb-6 max-sm:px-3 max-sm:py-1.5'
      >
        <Rocket className='text-primary size-5 max-sm:size-4' />
        <p className='text-primary text-sm max-sm:text-xs max-sm:leading-tight'>
          PWA • Telegram интеграция • Работает везде
        </p>
      </m.div>
      <m.div
        variants={itemVariants}
        className='mb-10 flex flex-col gap-4 max-md:mb-8 max-sm:mb-6'
      >
        <h2 className='text-4xl leading-tight font-bold max-md:text-3xl max-sm:text-2xl min-h-[1.2em]'>
          {baseText}
          <span className='text-primary relative inline-block'>
            <m.span>{displayText}</m.span>
            {!isTypingDone && (
              <m.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
                className='bg-primary absolute -right-1 top-1 bottom-1 w-[2px]'
              />
            )}
          </span>
        </h2>
        <p className='text-light-gray mx-auto max-w-2xl text-center text-lg max-md:text-base max-sm:text-sm'>
          Умный трекер привычек, который не мешает жить. Настройте привычки один
          раз в веб-интерфейсе, а дальше получайте напоминания и отмечайте
          выполнение прямо в Telegram - без лишних приложений.
        </p>
      </m.div>

      <m.div
        variants={itemVariants}
        className='mb-12 flex items-center justify-center gap-3 max-md:mb-10 max-sm:mb-8 max-sm:flex-col'
      >
        <Button
          className='p-6 text-base max-md:p-5 max-md:text-sm max-sm:w-full max-sm:max-w-[360px]'
          onClick={handleAuthClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className='size-5 animate-spin max-sm:size-4' />
          ) : (
            <ListChecks className='size-5 max-sm:size-4' />
          )}
          {buttonText}
        </Button>
        <Button
          className='p-6 text-base max-md:p-5 max-md:text-sm max-sm:w-full max-sm:max-w-[360px]'
          variant='primary'
          onClick={scrollToHowItWorks}
        >
          <ArrowDown className='size-5 max-sm:size-4' />
          Как это работает?
        </Button>
      </m.div>

      <m.div
        variants={itemVariants}
        className='flex items-center justify-center gap-5 max-md:flex-wrap max-md:gap-4 max-sm:flex-col max-sm:gap-3'
      >
        {steps.map((step) => (
          <BlockCard key={step.title} {...step} />
        ))}
      </m.div>
    </m.section>
  )
}
