import { useMe, useUpdateUser } from '@/shared/model/hooks'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import type { ProfileEditState } from '../types'
import {
  formatDisplayName,
  formatUsernameLabel,
  hasNameChanged,
  validateFirstName,
} from './utils'

export function useProfileEdit(): ProfileEditState | null {
  const { data: user } = useMe()
  const { mutateAsync: updateUser, isPending } = useUpdateUser()
  const [isEditing, setIsEditing] = useState(false)
  const [firstName, setFirstName] = useState('')

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '')
    }
  }, [user])

  const handleEdit = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleCancel = useCallback(() => {
    setFirstName(user?.first_name || '')
    setIsEditing(false)
  }, [user?.first_name])

  const handleSave = useCallback(async () => {
    if (!user) return

    if (!hasNameChanged(firstName, user.first_name)) {
      setIsEditing(false)
      return
    }

    const validation = validateFirstName(firstName, user.first_name)

    if (!validation.isValid) {
      toast.error(validation.error)
      return
    }

    try {
      await updateUser({ first_name: firstName.trim() })
      setIsEditing(false)
      toast.success('Профиль обновлен')
    } catch (error) {
      console.error('Ошибка при обновлении профиля', error)
      toast.error('Не удалось обновить профиль')
    }
  }, [user, firstName, updateUser])

  const handleChangeName = useCallback((value: string) => {
    setFirstName(value)
  }, [])

  if (!user) {
    return null
  }

  return {
    isEditing,
    isPending,
    formData: {
      firstName,
    },
    viewData: {
      displayName: formatDisplayName(firstName),
      usernameLabel: formatUsernameLabel(user.username),
      avatarSrc: user.photo_url,
    },
    handlers: {
      onEdit: handleEdit,
      onCancel: handleCancel,
      onSave: handleSave,
      onChangeName: handleChangeName,
    },
  }
}
