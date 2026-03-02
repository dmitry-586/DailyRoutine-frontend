import { useAuthButton } from '@/shared/model/hooks'
import { LandingLayout } from '@/shared/model/providers'
import { TelegramAuthProps } from '@/shared/types'
import { Button } from '@/shared/ui'
import { m } from 'framer-motion'
import { ListChecks, Loader2, Rocket, Sparkles } from 'lucide-react'

export function CTA({ setIsTelegramModalOpen }: TelegramAuthProps) {
  const { handleAuthClick, buttonText, isLoading } = useAuthButton(
    setIsTelegramModalOpen,
    'Начать бесплатно',
  )

  return (
    <LandingLayout backgroundColor='primary/20'>
      <m.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className='flex flex-col items-center justify-center pt-12 pb-20 max-md:pb-16 max-sm:pt-8 max-sm:pb-12'
      >
        <m.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className='bg-primary/10 mx-auto mb-8 flex w-fit items-center gap-2 rounded-full px-5 py-2 max-md:mb-6 max-sm:px-3 max-sm:py-1.5'
        >
          <Sparkles className='text-primary size-5 max-sm:size-4' />
          <p className='text-primary text-sm max-sm:text-xs max-sm:leading-tight'>
            Готовы начать?
          </p>
        </m.div>
        <m.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className='mb-10 flex flex-col gap-4 max-md:mb-8 max-sm:mb-6'
        >
          <h2 className='max-w-2xl text-center text-4xl leading-tight font-bold max-md:text-3xl max-sm:text-2xl'>
            Присоединяйтесь к тем, кто уже формирует{' '}
            <span className='text-primary'>полезные привычки</span>
          </h2>
          <p className='text-light-gray mx-auto max-w-xl text-center text-lg max-md:text-base max-sm:text-sm'>
            Бесплатно • 2 минуты настройки • Работает сразу • Без установки
            приложений
          </p>
        </m.div>
        <m.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button
            className='mb-8 p-6 text-base max-md:mb-6 max-md:p-5 max-md:text-sm max-sm:mb-6 max-sm:w-full max-sm:max-w-[360px]'
            variant='primary'
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
        </m.div>
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className='text-light-gray flex items-center gap-6 text-sm max-sm:gap-4 max-sm:text-xs'
        >
          <div className='flex items-center gap-2'>
            <Rocket className='text-primary size-4' />
            <span>Начните за 2 минуты</span>
          </div>
          <div className='flex items-center gap-2'>
            <Rocket className='text-green size-4' />
            <span>Бесплатно навсегда</span>
          </div>
        </m.div>
      </m.section>
    </LandingLayout>
  )
}
