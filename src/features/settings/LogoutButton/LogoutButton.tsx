'use client'

import { useLogout } from '@/shared/model/hooks'
import { Button, Modal } from '@/shared/ui'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

export function LogoutButton() {
  const router = useRouter()
  const { mutateAsync: logout, isPending } = useLogout()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Вы вышли из аккаунта')
      router.push('/')
    } catch (error) {
      console.error('Ошибка при выходе', error)
      toast.error('Не удалось выйти из аккаунта')
    }
  }

  return (
    <>
      <Button
        type='button'
        onClick={() => setIsModalOpen(true)}
        variant='primary'
        className='border-red/50 text-red hover:bg-red/10'
      >
        <LogOut className='size-4' />
        Выйти
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Выход из аккаунта'
        className='max-w-md max-sm:max-w-[90vw]'
      >
        <div className='space-y-4'>
          <p className='text-light-gray text-sm'>
            Вы уверены, что хотите выйти из аккаунта?
          </p>
          <div className='flex gap-3'>
            <Button
              type='button'
              onClick={() => setIsModalOpen(false)}
              variant='primary'
              className='flex-1'
              disabled={isPending}
            >
              Отмена
            </Button>
            <Button
              type='button'
              onClick={handleLogout}
              className='bg-red hover:bg-red/80 border-red flex-1 text-white'
              disabled={isPending}
            >
              {isPending ? 'Выход...' : 'Выйти'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
