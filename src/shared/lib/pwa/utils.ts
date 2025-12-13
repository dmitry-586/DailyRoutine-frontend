export const isStandalone = (): boolean => {
  if (typeof window === 'undefined') return false
  return (
    (window.navigator as { standalone?: boolean }).standalone === true ||
    window.matchMedia('(display-mode: standalone)').matches
  )
}

export const isSafari = (): boolean => {
  if (typeof window === 'undefined') return false
  const ua = window.navigator.userAgent.toLowerCase()
  return (
    /iphone|ipad|ipod|macintosh/.test(ua) &&
    /safari/.test(ua) &&
    !/chrome|crios|fxios/.test(ua)
  )
}

export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false
  return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())
}
