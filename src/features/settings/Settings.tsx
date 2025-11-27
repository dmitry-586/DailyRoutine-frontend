'use client'

import { Button } from '@/shared/ui/Button'
import { Switch } from '@/shared/ui/Switch'
import {
  Bell,
  Camera,
  Save,
  Settings as SettingsIcon,
  User,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

export function Settings() {
  const labelBaseClass = 'font-medium leading-none'
  const [username, setUsername] = useState('Пользователь')
  const [email, setEmail] = useState('user@example.com')
  const [avatar, setAvatar] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Notification settings
  const [notifyHabits, setNotifyHabits] = useState(true)
  const [notifyStreaks, setNotifyStreaks] = useState(true)
  const [notifyRewards, setNotifyRewards] = useState(true)
  const [notifyDaily, setNotifyDaily] = useState(true)
  const [notifyTime, setNotifyTime] = useState('09:00')

  const handleSave = () => {
    toast('Настройки сохранены!', {
      description: 'Ваши изменения успешно применены',
    })
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast('Ошибка', {
          description: 'Размер файла не должен превышать 5 МБ',
        })
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
        toast('Аватар обновлен', {
          description: 'Фото профиля успешно изменено',
        })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='bg-background min-h-screen p-4 sm:p-6'>
      <div className='mx-auto max-w-4xl'>
        {/* Header */}
        <div className='mb-6 sm:mb-8'>
          <div className='mb-2 flex items-center gap-3'>
            <SettingsIcon className='text-primary h-8 w-8' />
            <h1 className='text-white'>Настройки</h1>
          </div>
          <p className='text-light-gray'>
            Управляйте своим профилем и уведомлениями
          </p>
        </div>

        {/* Profile Settings */}
        <div className='bg-gray mb-6 rounded-xl p-6'>
          <div className='mb-6 flex items-center gap-3'>
            <div className='bg-primary/10 rounded-lg p-2'>
              <User className='text-primary h-5 w-5' />
            </div>
            <h3 className='text-white'>Профиль</h3>
          </div>

          <div className='space-y-6'>
            {/* Avatar */}
            <div className='flex items-center gap-4'>
              <div className='group relative cursor-pointer'>
                <div className='border-light-gray/20 bg-background group-hover:border-primary/30 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 transition-all duration-200'>
                  {avatar ? (
                    <img
                      src={avatar}
                      alt='Avatar'
                      className='h-full w-full object-cover'
                    />
                  ) : (
                    <User className='text-light-gray group-hover:text-primary h-10 w-10 transition-colors duration-200' />
                  )}
                </div>
                <button
                  onClick={handleAvatarClick}
                  className='border-gray bg-primary hover:bg-primary/90 absolute right-0 bottom-0 flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all'
                >
                  <Camera className='h-4 w-4 text-white' />
                </button>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  onChange={handleAvatarChange}
                  className='hidden'
                />
              </div>
              <div>
                <p className='mb-1 text-sm font-medium text-white'>
                  Фото профиля
                </p>
                <p className='text-light-gray text-xs'>
                  JPG, PNG или GIF. Максимум 5 МБ
                </p>
              </div>
            </div>

            <div className='space-y-4'>
              <div className='space-y-2'>
                <label
                  className={`${labelBaseClass} text-light-gray text-sm`}
                  htmlFor='settings-username'
                >
                  Имя пользователя
                </label>
                <input
                  id='settings-username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='border-light-gray/20 bg-background hover:border-light-gray/30 focus-visible:ring-primary flex h-9 w-full rounded-md border px-3 py-1 text-sm text-white transition-all focus-visible:ring-1 focus-visible:outline-none'
                />
              </div>

              <div className='space-y-2'>
                <label
                  className={`${labelBaseClass} text-light-gray text-sm`}
                  htmlFor='settings-email'
                >
                  Email
                </label>
                <input
                  id='settings-email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='border-light-gray/20 bg-background hover:border-light-gray/30 focus-visible:ring-primary flex h-9 w-full rounded-md border px-3 py-1 text-sm text-white transition-all focus-visible:ring-1 focus-visible:outline-none'
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className='bg-gray mb-6 rounded-xl p-6'>
          <div className='mb-6 flex items-center gap-3'>
            <div className='bg-primary/10 rounded-lg p-2'>
              <Bell className='text-primary h-5 w-5' />
            </div>
            <h3 className='text-white'>Уведомления</h3>
          </div>

          <div className='space-y-4'>
            <div className='group border-light-gray/10 hover:border-light-gray/20 flex items-center justify-between border-b py-3 transition-colors duration-200'>
              <div className='flex-1'>
                <p className='text-white transition-colors duration-200 group-hover:text-white'>
                  Напоминания о привычках
                </p>
                <p className='text-light-gray group-hover:text-light-gray/80 text-sm transition-colors duration-200'>
                  Ежедневные напоминания выполнить привычки
                </p>
              </div>
              <Switch
                checked={notifyHabits}
                onCheckedChange={setNotifyHabits}
              />
            </div>

            {notifyHabits && (
              <div className='space-y-2 pl-4'>
                <label
                  className={`${labelBaseClass} text-light-gray text-sm`}
                  htmlFor='notify-time'
                >
                  Время напоминания
                </label>
                <input
                  id='notify-time'
                  type='time'
                  value={notifyTime}
                  onChange={(e) => setNotifyTime(e.target.value)}
                  className='border-light-gray/20 bg-background hover:border-light-gray/30 focus-visible:ring-primary flex h-9 w-40 rounded-md border px-3 py-1 text-sm text-white transition-all focus-visible:ring-1 focus-visible:outline-none'
                />
              </div>
            )}

            <div className='group border-light-gray/10 hover:border-light-gray/20 flex items-center justify-between border-b py-3 transition-colors duration-200'>
              <div className='flex-1'>
                <p className='text-white transition-colors duration-200 group-hover:text-white'>
                  Уведомления о сериях
                </p>
                <p className='text-light-gray group-hover:text-light-gray/80 text-sm transition-colors duration-200'>
                  Получать уведомления о достижениях серий
                </p>
              </div>
              <Switch
                checked={notifyStreaks}
                onCheckedChange={setNotifyStreaks}
              />
            </div>

            <div className='group border-light-gray/10 hover:border-light-gray/20 flex items-center justify-between border-b py-3 transition-colors duration-200'>
              <div className='flex-1'>
                <p className='text-white transition-colors duration-200 group-hover:text-white'>
                  Уведомления о наградах
                </p>
                <p className='text-light-gray group-hover:text-light-gray/80 text-sm transition-colors duration-200'>
                  Получать уведомления о заработанных дейликах
                </p>
              </div>
              <Switch
                checked={notifyRewards}
                onCheckedChange={setNotifyRewards}
              />
            </div>

            <div className='group flex items-center justify-between py-3'>
              <div className='flex-1'>
                <p className='text-white transition-colors duration-200 group-hover:text-white'>
                  Ежедневная сводка
                </p>
                <p className='text-light-gray group-hover:text-light-gray/80 text-sm transition-colors duration-200'>
                  Сводка за день вечером
                </p>
              </div>
              <Switch checked={notifyDaily} onCheckedChange={setNotifyDaily} />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className='flex justify-end'>
          <Button
            onClick={handleSave}
            className='bg-primary hover:bg-primary/90 hover:shadow-primary/20 px-8 transition-all duration-200 hover:scale-105 hover:shadow-md'
          >
            <Save className='mr-2 h-4 w-4' />
            Сохранить изменения
          </Button>
        </div>
      </div>
    </div>
  )
}
