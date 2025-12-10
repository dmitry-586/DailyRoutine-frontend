'use client'

import { useMe, useUpdateUser } from '@/shared/model/hooks'
import { Button, Input } from '@/shared/ui'
import { Edit2, Save, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { readFileAsDataURL, validatePhotoFile } from '../utils/photo'
import { UserAvatar } from './UserAvatar'

export function UserProfile() {
  const { data: user, isLoading } = useMe()
  const { mutateAsync: updateUser, isPending } = useUpdateUser()
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState('')
  const [photoUrl, setPhotoUrl] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (user) {
      setUsername(user.username || '')
      setPhotoUrl(user.photo_url || '')
    }
  }, [user])

  const resetForm = () => {
    if (user) {
      setUsername(user.username || '')
      setPhotoUrl(user.photo_url || '')
    }
  }

  const handleEdit = () => setIsEditing(true)

  const handleCancel = () => {
    resetForm()
    setIsEditing(false)
  }

  const handleSave = async () => {
    if (!user) return

    try {
      await updateUser({
        username: username.trim() || undefined,
        photo_url: photoUrl.trim() || undefined,
      })
      setIsEditing(false)
      toast.success('Профиль обновлен')
    } catch (error) {
      console.error('Ошибка при обновлении профиля', error)
      toast.error('Не удалось обновить профиль')
    }
  }

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const error = validatePhotoFile(file)
    if (error) {
      toast.error(error)
      return
    }

    try {
      const dataUrl = await readFileAsDataURL(file)
      setPhotoUrl(dataUrl)
    } catch (error) {
      toast.error('Ошибка при чтении файла')
    }
  }

  // Показываем скелетон загрузки до монтирования или во время загрузки
  if (!isMounted || isLoading) {
    return (
      <div className='border-light-gray/10 bg-gray flex items-center gap-4 rounded-xl border p-6'>
        <div className='bg-light-gray/20 h-16 w-16 animate-pulse rounded-full' />
        <div className='flex-1 space-y-2'>
          <div className='bg-light-gray/20 h-5 w-32 animate-pulse rounded' />
          <div className='bg-light-gray/20 h-4 w-24 animate-pulse rounded' />
        </div>
      </div>
    )
  }

  if (!user) return null

  const displayName = username || `Пользователь #${user.id}`

  return (
    <div className='border-light-gray/10 bg-gray rounded-xl border p-6'>
      <div className='mb-4 flex items-start justify-between gap-4'>
        <h2 className='text-lg font-semibold text-white'>Профиль</h2>
        {!isEditing ? (
          <Button
            type='button'
            onClick={handleEdit}
            variant='primary'
            size='sm'
            className='shrink-0'
          >
            <Edit2 className='h-4 w-4' />
            Редактировать
          </Button>
        ) : (
          <div className='flex gap-2'>
            <Button
              type='button'
              onClick={handleCancel}
              variant='primary'
              size='sm'
              disabled={isPending}
              className='shrink-0'
            >
              <X className='h-4 w-4' />
            </Button>
            <Button
              type='button'
              onClick={handleSave}
              variant='primary'
              size='sm'
              disabled={isPending}
              className='shrink-0'
            >
              <Save className='h-4 w-4' />
            </Button>
          </div>
        )}
      </div>

      <div className='flex items-start gap-4'>
        <div className='relative shrink-0'>
          <UserAvatar src={photoUrl} alt={displayName} size={80} />
          {isEditing && (
            <>
              <button
                type='button'
                onClick={() => fileInputRef.current?.click()}
                className='bg-primary text-dark-gray hover:bg-primary/90 absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full transition-colors'
                aria-label='Изменить фото'
              >
                <Edit2 className='h-3.5 w-3.5' />
              </button>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handlePhotoChange}
                className='hidden'
                aria-label='Загрузить фото'
              />
            </>
          )}
        </div>

        <div className='min-w-0 flex-1'>
          {isEditing ? (
            <Input
              label='Имя пользователя'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Введите имя пользователя'
              disabled={isPending}
            />
          ) : (
            <div>
              <h3 className='truncate text-lg font-semibold text-white'>
                {displayName}
              </h3>
              {username && (
                <p className='text-light-gray text-sm'>@{username}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
