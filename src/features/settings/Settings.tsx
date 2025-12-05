'use client'

import type { Settings } from '@/shared/lib/api/settings'
import {
  useSettings,
  useUpdateSettings,
  useUpdateTimezone,
} from '@/shared/model/hooks/useSettings'
import { Input } from '@/shared/ui/Input'
import { PageHeader } from '@/shared/ui/PageHeader'
import { Switch } from '@/shared/ui/Switch'
import { Settings as SettingsIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

export function Settings() {
  const { data: settings, isLoading } = useSettings()
  const { mutateAsync: updateSettings } = useUpdateSettings()
  const { mutateAsync: updateTimezone } = useUpdateTimezone()

  const [formState, setFormState] = useState<Settings | null>(null)
  const [notifyInput, setNotifyInput] = useState('')

  useEffect(() => {
    if (settings) {
      setFormState(settings)
      setNotifyInput(settings.notify_times.join(', '))
    }
  }, [settings])

  const isDirty = useMemo(() => {
    if (!settings || !formState) return false

    const baseChanged =
      settings.do_not_disturb !== formState.do_not_disturb ||
      settings.notify_times.join(',') !== formState.notify_times.join(',')

    return baseChanged
  }, [formState, settings])

  if (isLoading || !formState) {
    return (
      <>
        <PageHeader title='Настройки' icon={SettingsIcon} />
        <div className='border-light-gray/10 bg-gray rounded-xl border p-12 text-center'>
          <p className='text-light-gray'>Загрузка настроек...</p>
        </div>
      </>
    )
  }

  const handleToggleDnd = (checked: boolean) => {
    setFormState((prev) => (prev ? { ...prev, do_not_disturb: checked } : prev))
  }

  const handleNotifyTimesChange = (value: string) => {
    setNotifyInput(value)

    const times = value
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    setFormState((prev) => (prev ? { ...prev, notify_times: times } : prev))
  }

  const handleTimezoneChange = async (timezone: string) => {
    try {
      const updated = await updateTimezone(timezone)
      setFormState(updated)
      toast.success('Часовой пояс обновлён')
    } catch (error) {
      console.error('Ошибка при обновлении часового пояса', error)
      toast.error('Не удалось обновить часовой пояс')
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!formState || !isDirty) return

    try {
      const updated = await updateSettings({
        do_not_disturb: formState.do_not_disturb,
        notify_times: formState.notify_times,
      })
      setFormState(updated)
      setNotifyInput(updated.notify_times.join(', '))
      toast.success('Настройки сохранены')
    } catch (error) {
      console.error('Ошибка при сохранении настроек', error)
      toast.error('Не удалось сохранить настройки')
    }
  }

  return (
    <>
      <PageHeader title='Настройки' icon={SettingsIcon} />
      <form
        onSubmit={handleSubmit}
        className='border-light-gray/10 bg-gray max-w-2xl space-y-8 rounded-xl border p-6 sm:p-8'
      >
        <div className='flex items-center justify-between gap-4'>
          <div>
            <p className='text-base font-medium text-white'>Не беспокоить</p>
            <p className='text-light-gray text-sm'>
              Отключить все уведомления в Telegram
            </p>
          </div>

          <Switch
            checked={formState.do_not_disturb}
            onCheckedChange={handleToggleDnd}
          />
        </div>

        <div className='space-y-3'>
          <p className='text-base font-medium text-white'>Время уведомлений</p>
          <p className='text-light-gray text-sm'>
            Укажите время в формате HH:MM через запятую. Например:
            <span className='ml-1 font-mono text-xs text-white/80'>
              09:00, 18:30
            </span>
          </p>

          <Input
            value={notifyInput}
            onChange={(e) => handleNotifyTimesChange(e.target.value)}
            placeholder='09:00, 18:00'
          />
        </div>

        <div className='space-y-3'>
          <p className='text-base font-medium text-white'>Часовой пояс</p>
          <p className='text-light-gray text-sm'>
            Используется для корректного времени уведомлений
          </p>

          <select
            className='bg-dark-gray border-light-gray/40 focus:border-primary rounded-lg border px-3 py-2 text-sm text-white outline-none'
            value={formState.timezone}
            onChange={(e) => void handleTimezoneChange(e.target.value)}
          >
            <option value='UTC'>UTC</option>
            <option value='Europe/Moscow'>Europe/Moscow</option>
            <option value='America/New_York'>America/New_York</option>
          </select>
        </div>

        <div className='flex justify-end'>
          <button
            type='submit'
            disabled={!isDirty}
            className='bg-primary text-dark-gray hover:bg-primary/90 disabled:bg-light-gray/40 disabled:text-light-gray/80 rounded-full px-6 py-2 text-sm font-medium transition-colors'
          >
            Сохранить изменения
          </button>
        </div>
      </form>
    </>
  )
}
