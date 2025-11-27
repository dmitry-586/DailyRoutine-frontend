import { cn } from '@/shared/lib/utils/cn'
import { TelegramAuthProps } from '@/shared/types/auth.types'
import { Button } from '@/shared/ui/Button'
import Image from 'next/image'

export default function TelegramAuthButton({
  setIsTelegramModalOpen,
  className,
}: TelegramAuthProps) {
  const handleTelegramClick = () => {
    setIsTelegramModalOpen(true)
  }

  return (
    <Button
      type='button'
      variant='primary'
      onClick={handleTelegramClick}
      className={cn('relative min-w-0 pr-[30px] pl-[60px]', className)}
    >
      <Image
        src='/telegram.svg'
        alt='telegram'
        width={40}
        height={40}
        className='absolute top-[-1px] left-[-1px]'
      />
      Начать в Telegrams
    </Button>
  )
}
