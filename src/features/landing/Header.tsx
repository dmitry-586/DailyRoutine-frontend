import { TelegramAuthButton } from '@/features/auth'
import { LandingLayout } from '@/shared/model/providers'
import { TelegramAuthProps } from '@/shared/types/auth.types'
import { Logo } from '@/shared/ui'
import { m } from 'framer-motion'

export function Header({ setIsTelegramModalOpen }: TelegramAuthProps) {
  return (
    <m.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' as const }}
      className='flex flex-col'
    >
      <div className='border-light-gray/20 border-b'>
        <LandingLayout className='flex w-full items-center py-4 max-sm:py-3'>
          <Logo title='Daily Routine' />
          <TelegramAuthButton
            setIsTelegramModalOpen={setIsTelegramModalOpen}
            className='ml-auto max-sm:hidden'
          />
        </LandingLayout>
      </div>
    </m.header>
  )
}
