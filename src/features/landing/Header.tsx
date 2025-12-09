import TelegramAuthButton from '@/features/auth/TelegramAuthButton'
import { TelegramAuthProps } from '@/shared/types/auth.types'
import Logo from '@/shared/ui/Logo'
import LandingLayout from '../../shared/model/providers/LandingLayout'

export default function Header({ setIsTelegramModalOpen }: TelegramAuthProps) {
  return (
    <header className='flex flex-col'>
      <div className='border-light-gray/20 border-b'>
        <LandingLayout className='flex w-full items-center py-4 max-sm:py-3'>
          <Logo title='Daily Routine' />
          <TelegramAuthButton
            setIsTelegramModalOpen={setIsTelegramModalOpen}
            className='ml-auto max-sm:hidden'
          />
        </LandingLayout>
      </div>
    </header>
  )
}
