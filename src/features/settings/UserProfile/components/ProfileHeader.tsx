import { Button } from '@/shared/ui'
import { Edit2, Save, X } from 'lucide-react'
import type { ProfileEditState } from '../types'

interface ProfileHeaderProps {
  state: ProfileEditState
}

export function ProfileHeader({ state }: ProfileHeaderProps) {
  const { isEditing, isPending, handlers } = state

  return (
    <div className='mb-4 flex items-center justify-between gap-4'>
      <h2 className='text-lg font-semibold text-white'>Профиль</h2>
      {isEditing ? (
        <div className='flex gap-2'>
          <Button
            type='button'
            onClick={handlers.onCancel}
            variant='primary'
            size='sm'
            disabled={isPending}
            className='shrink-0'
          >
            <X className='h-4 w-4' />
          </Button>
          <Button
            type='button'
            onClick={handlers.onSave}
            variant='primary'
            size='sm'
            disabled={isPending}
            className='shrink-0'
          >
            <Save className='h-4 w-4' />
          </Button>
        </div>
      ) : (
        <Button
          type='button'
          onClick={handlers.onEdit}
          variant='primary'
          size='sm'
          className='shrink-0'
        >
          <Edit2 className='h-4 w-4' />
          Редактировать
        </Button>
      )}
    </div>
  )
}
