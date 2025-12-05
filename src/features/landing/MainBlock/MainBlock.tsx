import { useAuthButton } from '@/shared/model/hooks/useAuth'
import { TelegramAuthProps } from '@/shared/types'
import { Button } from '@/shared/ui/Button'
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
    <section className='mx-auto mt-8 w-full text-center max-sm:mt-4'>
      <div className='bg-primary/10 mx-auto flex w-fit items-center gap-2 rounded-full px-5 py-2 max-sm:px-3 max-sm:py-1.5'>
        <Rocket className='text-primary size-5 max-sm:size-4' />
        <p className='text-primary text-sm max-sm:text-xs max-sm:leading-tight'>
          PWA • Telegram интеграция • Работает везде
        </p>
      </div>
      <div className='flex flex-col gap-4 px-3 max-sm:gap-3'>
        <h2 className='mt-8 text-5xl leading-tight font-bold max-lg:text-4xl max-sm:mt-5 max-sm:text-[28px]'>
          Привычки, которые <span className='text-primary'>работают!</span>
        </h2>
        <p className='text-light-gray mx-auto max-w-2xl text-center max-lg:max-w-xl max-lg:text-sm'>
          Умный трекер привычек, который не мешает жить. Настройте привычки один
          раз в веб-интерфейсе, а дальше получайте напоминания и отмечайте
          выполнение прямо в Telegram - без лишних приложений.
        </p>
      </div>

      <div className='mt-10 flex items-center justify-center gap-3 max-sm:mt-6 max-sm:flex-col'>
        <Button
          className='p-6 text-base max-lg:p-5 max-lg:text-sm max-sm:w-full max-sm:max-w-[360px]'
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
          className='p-6 text-base max-lg:p-5 max-lg:text-sm max-sm:w-full max-sm:max-w-[360px]'
          variant='primary'
          onClick={scrollToHowItWorks}
        >
          <ArrowDown className='size-5 max-sm:size-4' />
          Как это работает?
        </Button>
      </div>

      <div className='mt-12 flex items-center justify-center gap-5 max-lg:mt-10 max-lg:flex-wrap max-sm:mt-8 max-sm:flex-col max-sm:gap-3'>
        {steps.map((step) => (
          <BlockCard key={step.title} {...step} />
        ))}
      </div>
    </section>
  )
}
