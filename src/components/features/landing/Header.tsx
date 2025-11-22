import { TelegramAuthProps } from '@/types/auth.types'
import TelegramAuthButton from '@/components/features/auth/TelegramAuthButton'
import Logo from '@/components/ui/Logo'

export default function Header({ setIsTelegramModalOpen }: TelegramAuthProps) {
  return (
    <header className="flex flex-col">
      <div className="flex items-center">
        <Logo title="Daily Routine" />
        <TelegramAuthButton
          setIsTelegramModalOpen={setIsTelegramModalOpen}
          className="ml-auto max-sm:hidden"
        />
      </div>
      <section className="mx-auto mt-5 w-fit sm:w-full">
        <h2 className="text-xl sm:text-center sm:text-2xl">
          Привычки, которые работают!
        </h2>
        <div className="text-light-gray mt-2 sm:flex sm:justify-center sm:text-lg">
          <p>Планируйте на сайте -</p>
          <p className="text-right">выполняйте в Telegram</p>
        </div>
      </section>
      <TelegramAuthButton
        setIsTelegramModalOpen={setIsTelegramModalOpen}
        className="mx-auto mt-3 sm:hidden"
      />
    </header>
  )
}
