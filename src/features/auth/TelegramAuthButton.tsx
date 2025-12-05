import { cn } from '@/shared/lib/utils/cn'
import { getCookie } from '@/shared/lib/utils/cookies'
import { isTokenExpired } from '@/shared/lib/utils/token'
import { TelegramAuthProps } from '@/shared/types/auth.types'
import { Button } from '@/shared/ui/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function TelegramAuthButton({
  setIsTelegramModalOpen,
  className,
  title,
}: TelegramAuthProps) {
  const router = useRouter()

  const isAuthenticated = (() => {
    if (typeof window === 'undefined') return false

    const accessToken = getCookie('access_token')
    if (!accessToken) return false

    return !isTokenExpired(accessToken)
  })()

  const handleTelegramClick = () => {
    if (isAuthenticated) {
      router.push('/dashboard')
      return
    }

    setIsTelegramModalOpen(true)
  }

  const buttonText = isAuthenticated
    ? 'Перейти в приложение'
    : title || 'Войти через Telegram'

  return (
    <Button
      type='button'
      variant='primary'
      onClick={handleTelegramClick}
      className={cn(
        'relative h-10 min-w-0 rounded-full pr-[30px] pl-[60px]',
        className,
      )}
    >
      <Image
        src='/telegram.svg'
        alt='telegram'
        width={39}
        height={39}
        className='absolute top-[-1px] left-[-1px]'
      />
      {buttonText}
    </Button>
  )
}
