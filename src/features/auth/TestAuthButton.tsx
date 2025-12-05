'use client'

import { useTestAuth } from '@/shared/model/hooks/useAuth'
import { useTimezone } from '@/shared/model/hooks/useTimezone'
import { Button } from '@/shared/ui/Button'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface TestAuthButtonProps {
  onSuccess?: () => void
}

export default function TestAuthButton({ onSuccess }: TestAuthButtonProps) {
  const { sendTimezoneToBackend } = useTimezone()
  const { mutate: testAuth, isPending } = useTestAuth()
  const router = useRouter()

  const handleTestAuth = () => {
    testAuth(undefined, {
      onSuccess: () => {
        setTimeout(() => {
          void sendTimezoneToBackend()
        }, 100)

        onSuccess?.()
        router.push('/dashboard')
        toast.success('Тестовая авторизация выполнена успешно')
      },
      onError: (error) => {
        toast.error(error.message || 'Ошибка при тестовой авторизации')
      },
    })
  }

  return (
    <div className='border-foreground/10 border-t pt-6'>
      <p className='text-foreground/60 mb-4 text-center text-sm'>
        ⚠️ Тестовый режим активен
      </p>
      <Button
        type='button'
        onClick={handleTestAuth}
        disabled={isPending}
        className='w-full'
      >
        {isPending ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            Вход...
          </>
        ) : (
          'Войти в тестовом режиме'
        )}
      </Button>
    </div>
  )
}
