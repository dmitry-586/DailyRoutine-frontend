import { Input } from '@/shared/ui'
import type { ProfileEditState } from '../types'
import { UserAvatar } from './UserAvatar'

interface ProfileContentProps {
  state: ProfileEditState
}

export function ProfileContent({ state }: ProfileContentProps) {
  const { isEditing, isPending, formData, viewData, handlers } = state

  return (
    <div className='flex items-center gap-4'>
      <UserAvatar
        src={viewData.avatarSrc}
        alt={viewData.displayName}
        size={80}
        isEditing={isEditing}
        onPhotoChange={handlers.onChangePhoto}
      />
      <div className='min-w-0 flex-1 space-y-2'>
        {isEditing ? (
          <Input
            label='Измените имя'
            value={formData.firstName}
            onChange={(e) => handlers.onChangeName(e.target.value)}
            placeholder='Введите новое имя'
            disabled={isPending}
          />
        ) : (
          <>
            <h3 className='truncate text-lg font-semibold text-white'>
              {viewData.displayName}
            </h3>
            <p className='text-light-gray truncate text-sm'>
              {viewData.usernameLabel}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
