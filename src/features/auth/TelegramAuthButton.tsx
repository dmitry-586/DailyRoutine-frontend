import { cn } from '@/shared/lib/utils'
import { useAuthButton } from '@/shared/model/hooks'
import { TelegramAuthProps } from '@/shared/types'
import { Button } from '@/shared/ui'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

export function TelegramAuthButton({
  setIsTelegramModalOpen,
  className,
  title,
}: TelegramAuthProps) {
  const { handleAuthClick, buttonText, isLoading } = useAuthButton(
    setIsTelegramModalOpen,
    title,
  )

  return (
    <Button
      type='button'
      variant='primary'
      onClick={handleAuthClick}
      disabled={isLoading}
      className={cn(
        isLoading ? 'pl-12' : 'pl-[60px]',
        'relative h-10 min-w-0 rounded-full pr-[30px]',
        className,
      )}
    >
      <div className='absolute top-[-1px] left-[-1px] flex size-[39px] items-center justify-center'>
        {isLoading ? (
          <Loader2 className='ml-5 animate-spin' />
        ) : (
          <Image
            src='/telegram.svg'
            alt='telegram'
            width={39}
            height={39}
            className='h-full w-full'
          />
        )}
      </div>
      <span>{buttonText}</span>
    </Button>
  )
}
