export function getUserTimezone(): string {
  if (typeof window === 'undefined') {
    return 'UTC'
  }

  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return timezone || 'UTC'
  } catch (error) {
    console.warn('Не удалось определить часовой пояс:', error)
    return 'UTC'
  }
}

export function saveTimezone(timezone: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('user_timezone', timezone)
}

export function getStoredTimezone(): string {
  if (typeof window === 'undefined') return 'UTC'

  const stored = localStorage.getItem('user_timezone')
  if (stored) {
    return stored
  }

  const current = getUserTimezone()
  saveTimezone(current)
  return current
}

export function saveLastSentTimezone(timezone: string): void {
  if (typeof window === 'undefined') return
  localStorage.setItem('last_sent_timezone', timezone)
  localStorage.setItem('last_sent_timezone_timestamp', String(Date.now()))
}

export function getLastSentTimezone(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('last_sent_timezone')
}

export function getLastSentTimezoneTimestamp(): number | null {
  if (typeof window === 'undefined') return null
  const timestamp = localStorage.getItem('last_sent_timezone_timestamp')
  return timestamp ? Number(timestamp) : null
}

export function shouldSendTimezoneToBackend(): boolean {
  if (typeof window === 'undefined') return false

  const currentTimezone = getUserTimezone()
  const lastSentTimezone = getLastSentTimezone()
  const lastSentTimestamp = getLastSentTimezoneTimestamp()

  if (lastSentTimezone && lastSentTimezone !== currentTimezone) {
    return true
  }

  if (!lastSentTimezone || !lastSentTimestamp) {
    return true
  }

  const ONE_HOUR_MS = 60 * 60 * 1000
  const timeSinceLastSend = Date.now() - lastSentTimestamp
  return timeSinceLastSend > ONE_HOUR_MS
}
