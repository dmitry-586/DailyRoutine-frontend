import { getCookie } from '@/shared/lib/utils/cookies'
import {
  getStoredTimezone,
  getUserTimezone,
  saveLastSentTimezone,
  saveTimezone,
  shouldSendTimezoneToBackend,
} from '@/shared/lib/utils/timezone'
import { useUpdateTimezone } from '@/shared/model/hooks/useAuth'
import { useCallback, useEffect, useState } from 'react'

export function useTimezone() {
  const [timezone, setTimezone] = useState<string>(() => {
    if (typeof window === 'undefined') return 'UTC'
    return getStoredTimezone()
  })
  const updateTimezoneMutation = useUpdateTimezone()

  useEffect(() => {
    const currentTimezone = getUserTimezone()
    setTimezone(currentTimezone)
    saveTimezone(currentTimezone)
  }, [])

  const updateTimezone = (newTimezone: string) => {
    setTimezone(newTimezone)
    saveTimezone(newTimezone)
  }

  const sendTimezoneToBackend = useCallback(async () => {
    if (typeof window === 'undefined' || !shouldSendTimezoneToBackend()) return

    const token = getCookie('access_token')
    if (!token) return

    const currentTimezone = getUserTimezone()
    try {
      await updateTimezoneMutation.mutateAsync(currentTimezone)
      saveLastSentTimezone(currentTimezone)
    } catch (error) {
      console.warn('Не удалось отправить часовой пояс на бэкенд:', error)
    }
  }, [updateTimezoneMutation])

  return {
    timezone,
    updateTimezone,
    sendTimezoneToBackend,
    isUpdating: updateTimezoneMutation.isPending,
  }
}
