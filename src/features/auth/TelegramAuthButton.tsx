import { cn } from '@/shared/lib/utils/cn'
import { TelegramAuthProps } from '@/shared/types/auth.types'
import { Button } from '@/shared/ui/Button'
import Image from 'next/image'

export default function TelegramAuthButton({
  setIsTelegramModalOpen,
  className,
  title,
}: TelegramAuthProps) {
  const handleTelegramClick = () => {
    setIsTelegramModalOpen(true)
  }

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
        width={38}
        height={38}
        className='absolute top-[-1px] left-[-1px]'
      />
      {title || 'Войти через Telegram'}
    </Button>
  )
}
