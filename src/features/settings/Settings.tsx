'use client'

import type { Settings } from '@/shared/lib/api/settings'
import {
  useSettings,
  useUpdateSettings,
} from '@/shared/model/hooks/useSettings'
import { PageHeader } from '@/shared/ui/PageHeader'
import { Settings as SettingsIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { LogoutButton } from './LogoutButton/LogoutButton'
import { PWAInstallCard } from './PWAInstall/PWAInstallCard'
import { DoNotDisturbSection } from './SettingsForm/DoNotDisturbSection'
import { NotificationTimes } from './SettingsForm/NotificationTimes'
import { UserProfile } from './UserProfile/UserProfile'

export function Settings() {
  const { data: settings, isLoading } = useSettings()
  const { mutateAsync: updateSettings, isPending } = useUpdateSettings()
  const [formState, setFormState] = useState<Settings | null>(null)

  useEffect(() => {
    if (settings) {
      setFormState(settings)
    }
  }, [settings])

  const isDirty = useMemo(() => {
    if (!settings || !formState) return false

    return (
      settings.do_not_disturb !== formState.do_not_disturb ||
      JSON.stringify([...settings.notify_times].sort()) !==
        JSON.stringify([...formState.notify_times].sort())
    )
  }, [formState, settings])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formState || !isDirty || isPending) return

    try {
      const updated = await updateSettings({
        do_not_disturb: formState.do_not_disturb,
        notify_times: formState.notify_times,
      })
      setFormState(updated)
      toast.success('Настройки сохранены')
    } catch (error) {
      console.error('Ошибка при сохранении настроек', error)
      toast.error('Не удалось сохранить настройки')
    }
  }

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

  return (
    <>
      <PageHeader title='Настройки' icon={SettingsIcon} />
      <div className='max-w-2xl space-y-6'>
        <UserProfile />

        <form
          onSubmit={handleSubmit}
          className='border-light-gray/10 bg-gray space-y-8 rounded-xl border p-6 sm:p-8'
        >
          <DoNotDisturbSection
            enabled={formState.do_not_disturb}
            onChange={(enabled) =>
              setFormState((prev) =>
                prev ? { ...prev, do_not_disturb: enabled } : prev,
              )
            }
            disabled={isPending}
          />

          <div className='border-light-gray/10 border-t pt-6'>
            <NotificationTimes
              times={formState.notify_times}
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

        <PWAInstallCard />
        <LogoutButton />
      </div>
    </>
  )
}
