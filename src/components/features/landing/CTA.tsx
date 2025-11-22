import { TelegramAuthProps } from '@/types/auth.types'
import TelegramAuthButton from '@/components/features/auth/TelegramAuthButton'

export default function CTA({ setIsTelegramModalOpen }: TelegramAuthProps) {
  return (
    <section className="bg-gray flex flex-col items-center justify-center px-3 py-[30px]">
      <h2 className="max-w-[250px] text-center text-xl sm:max-w-[350px] sm:text-2xl">
        Начните формировать привычки сегодня
      </h2>
      <p className="text-light-gray mt-2 text-center sm:text-lg">
        Бесплатно • 2 минуты настройки • Работает сразу
      </p>
      <TelegramAuthButton
        setIsTelegramModalOpen={setIsTelegramModalOpen}
        className="mt-[30px]"
      />
    </section>
  )
}
