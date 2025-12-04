import { cn } from '@/shared/lib/utils/cn'
import { useMe } from '@/shared/model/hooks/useAuth'
import { TelegramAuthProps } from '@/shared/types/auth.types'
import { Button } from '@/shared/ui/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function TelegramAuthButton({
  setIsTelegramModalOpen,
  className,
  title,
}: TelegramAuthProps) {
  const { data: user, isLoading } = useMe()
  const router = useRouter()

  const handleTelegramClick = () => {
    if (user) {
      router.push('/dashboard')
      return
    }

    setIsTelegramModalOpen(true)
  }

  const buttonText = user
    ? 'Перейти в приложение'
    : title || 'Войти через Telegram'

  return (
    <Button
      type='button'
      variant='primary'
      onClick={handleTelegramClick}
      disabled={isLoading}
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
