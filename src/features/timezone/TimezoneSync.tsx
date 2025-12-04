'use client'

import { useMe } from '@/shared/model/hooks/useAuth'
import { useTimezone } from '@/shared/model/hooks/useTimezone'
import { useEffect } from 'react'

export function TimezoneSync() {
  const { sendTimezoneToBackend } = useTimezone()
  const { data: user } = useMe()

  useEffect(() => {
    if (!user) return

    void sendTimezoneToBackend(user.id)
  }, [sendTimezoneToBackend, user])

  return null
}
