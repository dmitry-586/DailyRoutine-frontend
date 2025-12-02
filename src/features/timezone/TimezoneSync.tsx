'use client'

import { useTimezone } from '@/shared/model/hooks/useTimezone'
import { useEffect } from 'react'

export function TimezoneSync() {
  const { sendTimezoneToBackend } = useTimezone()

  useEffect(() => {
    sendTimezoneToBackend()
  }, [sendTimezoneToBackend])

  return null
}
