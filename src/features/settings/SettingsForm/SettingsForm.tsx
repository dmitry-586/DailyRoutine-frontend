'use client'

import type { Settings } from '@/shared/lib/api'
import {
  useMounted,
  useSettings,
  useUpdateSettings,
} from '@/shared/model/hooks'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { DoNotDisturbSection } from './DoNotDisturbSection'
import { NotificationTimes } from './NotificationTimes'

export function SettingsForm() {
  const { data: settings, isLoading } = useSettings()
  const { mutateAsync: updateSettings, isPending } = useUpdateSettings()
  const [formState, setFormState] = useState<Settings | null>(null)
  const isMounted = useMounted()

  useEffect(() => {
    if (settings) {
      setFormState({
        ...settings,
        do_not_disturb: settings.do_not_disturb ?? false,
        notify_times: settings.notify_times ?? [],
      })
    }
  }, [settings])

  const isDirty = useMemo(() => {
    if (!settings || !formState) return false

    const settingsTimes = settings.notify_times ?? []
    const formTimes = formState.notify_times ?? []

    return (
      settings.do_not_disturb !== formState.do_not_disturb ||
      JSON.stringify([...settingsTimes].sort()) !==
        JSON.stringify([...formTimes].sort())
    )
  }, [formState, settings])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState || !isDirty || isPending) return

    try {
      const updated = await updateSettings({
        do_not_disturb: formState.do_not_disturb ?? false,
        notify_times: formState.notify_times ?? [],
      })
      setFormState({
        ...updated,
        do_not_disturb: updated.do_not_disturb ?? false,
        notify_times: updated.notify_times ?? [],
      })
      toast.success('Настройки сохранены')
    } catch (error) {
      console.error('Ошибка при сохранении настроек', error)
      toast.error('Не удалось сохранить настройки')
    }
  }

  // Показываем скелетон загрузки до монтирования или во время загрузки
  if (!isMounted || isLoading || !formState) {
    return (
      <div className='border-light-gray/10 bg-gray rounded-xl border p-12 text-center'>
        <p className='text-light-gray'>Загрузка настроек...</p>
      </div>
    )
  }

  const doNotDisturb = formState.do_not_disturb ?? false
  const notifyTimes = formState.notify_times ?? []

  return (
    <form
      onSubmit={handleSubmit}
      className='border-light-gray/10 bg-gray space-y-8 rounded-xl border p-6 sm:p-8'
    >
      <DoNotDisturbSection
        enabled={doNotDisturb}
        onChange={(enabled) =>
          setFormState((prev) =>
            prev ? { ...prev, do_not_disturb: enabled } : prev,
          )
        }
        disabled={isPending}
      />

      <div className='border-light-gray/10 border-t pt-6'>
        <NotificationTimes
          times={notifyTimes}
          onChange={(times) =>
            setFormState((prev) =>
              prev ? { ...prev, notify_times: times } : prev,
            )
          }
          disabled={isPending}
        />
      </div>

      <div className='flex justify-end pt-4'>
        <button
          type='submit'
          disabled={!isDirty || isPending}
          className='bg-primary text-dark-gray hover:bg-primary/90 disabled:bg-light-gray/40 disabled:text-light-gray/80 rounded-full px-6 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed'
        >
          {isPending ? 'Сохранение...' : 'Сохранить изменения'}
        </button>
      </div>
    </form>
  )
}
