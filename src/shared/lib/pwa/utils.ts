/**
 * Утилиты для определения окружения PWA
 */

export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false

  if ((window.navigator as { standalone?: boolean }).standalone === true) {
    return true
  }

  return window.matchMedia('(display-mode: standalone)').matches
}

export function isSafari(): boolean {
  if (typeof window === 'undefined') return false

  const ua = window.navigator.userAgent.toLowerCase()
  const isIOSDevice = /iphone|ipad|ipod/.test(ua)
  const isSafariUA = /safari/.test(ua) && !/chrome|crios|fxios/.test(ua)
  const isMacSafari = /macintosh/.test(ua) && isSafariUA

  return isIOSDevice || isMacSafari
}

export function isIOS(): boolean {
  if (typeof window === 'undefined') return false
  return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())
}
