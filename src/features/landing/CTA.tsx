import TelegramAuthButton from '@/features/auth/TelegramAuthButton'
import { TelegramAuthProps } from '@/shared/types/auth.types'

export default function CTA({ setIsTelegramModalOpen }: TelegramAuthProps) {
  return (
    <section className='bg-gray flex flex-col items-center justify-center px-5 py-16 max-sm:py-12'>
      <h2 className='max-w-md text-center text-3xl leading-tight font-semibold max-sm:text-2xl'>
        Начните формировать привычки сегодня
      </h2>
      <p className='text-light-gray mt-3 text-center text-lg max-sm:text-base'>
        Бесплатно • 2 минуты настройки • Работает сразу
      </p>
      <TelegramAuthButton
        setIsTelegramModalOpen={setIsTelegramModalOpen}
        className='mt-8 max-sm:w-full'
      />
    </section>
  )
}
