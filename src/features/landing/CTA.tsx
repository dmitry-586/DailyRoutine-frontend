import { useAuthButton } from '@/shared/model/hooks/useAuth'
import LandingLayout from '@/shared/model/providers/LandingLayout'
import { TelegramAuthProps } from '@/shared/types'
import { Button } from '@/shared/ui/Button'
import { ListChecks, Loader2, Rocket, Sparkles } from 'lucide-react'

export default function CTA({ setIsTelegramModalOpen }: TelegramAuthProps) {
  const { handleAuthClick, buttonText, isLoading } = useAuthButton(
    setIsTelegramModalOpen,
    'Начать бесплатно',
  )

  return (
    <LandingLayout backgroundColor='primary/20'>
      <section className='flex flex-col items-center justify-center pt-12 pb-20 max-md:pb-16 max-sm:pt-8 max-sm:pb-12'>
        <div className='bg-primary/10 mx-auto mb-8 flex w-fit items-center gap-2 rounded-full px-5 py-2 max-md:mb-6 max-sm:px-3 max-sm:py-1.5'>
          <Sparkles className='text-primary size-5 max-sm:size-4' />
          <p className='text-primary text-sm max-sm:text-xs max-sm:leading-tight'>
            Готовы начать?
          </p>
        </div>
        <div className='mb-10 flex flex-col gap-4 max-md:mb-8 max-sm:mb-6'>
          <h2 className='max-w-2xl text-center text-4xl leading-tight font-bold max-md:text-3xl max-sm:text-2xl'>
            Присоединяйтесь к тем, кто уже формирует{' '}
            <span className='text-primary'>полезные привычки</span>
          </h2>
          <p className='text-light-gray mx-auto max-w-xl text-center text-lg max-md:text-base max-sm:text-sm'>
            Бесплатно • 2 минуты настройки • Работает сразу • Без установки
            приложений
          </p>
        </div>
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
        <div className='text-light-gray flex items-center gap-6 text-sm max-sm:gap-4 max-sm:text-xs'>
          <div className='flex items-center gap-2'>
            <Rocket className='text-primary size-4' />
            <span>Начните за 2 минуты</span>
          </div>
          <div className='flex items-center gap-2'>
            <Rocket className='text-green size-4' />
            <span>Бесплатно навсегда</span>
          </div>
        </div>
      </section>
    </LandingLayout>
  )
}
