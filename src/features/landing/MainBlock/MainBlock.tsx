import { useAuthButton } from '@/shared/model/hooks'
import { TelegramAuthProps } from '@/shared/types'
import { Button } from '@/shared/ui'
import { ArrowDown, ListChecks, Loader2, Rocket } from 'lucide-react'
import BlockCard from './BlockCard'
import { steps } from './config'

export default function MainBlock({
  setIsTelegramModalOpen,
}: TelegramAuthProps) {
  const { handleAuthClick, buttonText, isLoading } = useAuthButton(
    setIsTelegramModalOpen,
    'Начать бесплатно',
  )

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className='mt-8 text-center max-sm:mt-4'>
      <div className='bg-primary/10 mx-auto mb-8 flex w-fit items-center gap-2 rounded-full px-5 py-2 max-md:mb-6 max-sm:px-3 max-sm:py-1.5'>
        <Rocket className='text-primary size-5 max-sm:size-4' />
        <p className='text-primary text-sm max-sm:text-xs max-sm:leading-tight'>
          PWA • Telegram интеграция • Работает везде
        </p>
      </div>
      <div className='mb-10 flex flex-col gap-4 max-md:mb-8 max-sm:mb-6'>
        <h2 className='text-4xl leading-tight font-bold max-md:text-3xl max-sm:text-2xl'>
          Привычки, которые <span className='text-primary'>работают!</span>
        </h2>
        <p className='text-light-gray mx-auto max-w-2xl text-center text-lg max-md:text-base max-sm:text-sm'>
          Умный трекер привычек, который не мешает жить. Настройте привычки один
          раз в веб-интерфейсе, а дальше получайте напоминания и отмечайте
          выполнение прямо в Telegram - без лишних приложений.
        </p>
      </div>

      <div className='mb-12 flex items-center justify-center gap-3 max-md:mb-10 max-sm:mb-8 max-sm:flex-col'>
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
      </div>

      <div className='flex items-center justify-center gap-5 max-md:flex-wrap max-md:gap-4 max-sm:flex-col max-sm:gap-3'>
        {steps.map((step) => (
          <BlockCard key={step.title} {...step} />
        ))}
      </div>
    </section>
  )
}
