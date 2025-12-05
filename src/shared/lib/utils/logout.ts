import { removeAllCookies } from './cookies'

export function logout() {
  if (typeof window === 'undefined') return

  removeAllCookies()

  if (window.location.pathname.startsWith('/dashboard')) {
    window.location.href = '/'
  }
}
