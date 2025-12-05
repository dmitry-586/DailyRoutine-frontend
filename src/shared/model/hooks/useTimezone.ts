import { updateTimezone } from '@/shared/lib/api'
import {
  getUserTimezone,
  saveLastSentTimezone,
  saveTimezone,
  shouldSendTimezoneToBackend,
} from '@/shared/lib/utils'
import { useCallback } from 'react'

export function useTimezone() {
  const sendTimezoneToBackend = useCallback(async () => {
    if (typeof window === 'undefined') return

    if (!shouldSendTimezoneToBackend()) {
      return
    }

    const timezone = getUserTimezone()

    try {
      await updateTimezone(timezone)
      saveTimezone(timezone)
      saveLastSentTimezone(timezone)
    } catch (error) {
      // Логируем, но не ломаем UI — часовой пояс не критичен для работы приложения
      console.error('Не удалось отправить часовой пояс на бэкенд', error)
    }
  }, [])

  return { sendTimezoneToBackend }
}
