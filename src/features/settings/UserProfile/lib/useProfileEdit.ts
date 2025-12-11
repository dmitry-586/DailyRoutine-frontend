import { useMe, useUpdateUser } from '@/shared/model/hooks'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { readFileAsDataURL, validatePhotoFile } from '../../utils/photo'
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
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '')
      setPhotoFile(null)
      setPhotoPreview(null)
    }
  }, [user])

  const handleEdit = useCallback(() => {
    setIsEditing(true)
  }, [])

  const handleCancel = useCallback(() => {
    setFirstName(user?.first_name || '')
    setPhotoFile(null)
    setPhotoPreview(null)
    setIsEditing(false)
  }, [user?.first_name])

  const handleSave = useCallback(async () => {
    if (!user) return

    const hasNameChangedValue = hasNameChanged(firstName, user.first_name)
    const hasPhotoChanged = photoFile !== null

    if (!hasNameChangedValue && !hasPhotoChanged) {
      setIsEditing(false)
      return
    }

    if (hasNameChangedValue) {
      const validation = validateFirstName(firstName, user.first_name)

      if (!validation.isValid) {
        toast.error(validation.error)
        return
      }
    }

    try {
      const updateData: { first_name?: string; photo_url?: string } = {}

      if (hasNameChangedValue) {
        updateData.first_name = firstName.trim()
      }

      if (hasPhotoChanged && photoFile) {
        const photoDataURL = await readFileAsDataURL(photoFile)
        updateData.photo_url = photoDataURL
      }

      await updateUser(updateData)
      setPhotoFile(null)
      setPhotoPreview(null)
      setIsEditing(false)
      toast.success('Профиль обновлен')
    } catch (error) {
      console.error('Ошибка при обновлении профиля', error)
      toast.error('Не удалось обновить профиль')
    }
  }, [user, firstName, photoFile, updateUser])

  const handleChangeName = useCallback((value: string) => {
    setFirstName(value)
  }, [])

  const handleChangePhoto = useCallback(async (file: File | null) => {
    if (!file) {
      setPhotoFile(null)
      setPhotoPreview(null)
      return
    }

    const validationError = validatePhotoFile(file)
    if (validationError) {
      toast.error(validationError)
      return
    }

    try {
      const preview = await readFileAsDataURL(file)
      setPhotoFile(file)
      setPhotoPreview(preview)
    } catch (error) {
      console.error('Ошибка при чтении файла', error)
      toast.error('Не удалось загрузить изображение')
    }
  }, [])

  if (!user) {
    return null
  }

  return {
    isEditing,
    isPending,
    formData: {
      firstName,
      photoFile,
      photoPreview,
    },
    viewData: {
      displayName: formatDisplayName(firstName),
      usernameLabel: formatUsernameLabel(user.username),
      avatarSrc: photoPreview || user.photo_url,
    },
    handlers: {
      onEdit: handleEdit,
      onCancel: handleCancel,
      onSave: handleSave,
      onChangeName: handleChangeName,
      onChangePhoto: handleChangePhoto,
    },
  }
}
