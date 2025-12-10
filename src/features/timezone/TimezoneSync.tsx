'use client'

import { useMe, useTimezone } from '@/shared/model/hooks'
import { useEffect } from 'react'

export function TimezoneSync() {
  const { sendTimezoneToBackend } = useTimezone()
  const { data: user } = useMe()

  useEffect(() => {
    if (!user) return

    void sendTimezoneToBackend()
  }, [sendTimezoneToBackend, user])

  return null
}
