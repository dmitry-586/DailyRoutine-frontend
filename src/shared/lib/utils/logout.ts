import { removeCookie } from './cookies'

/**
 * Удаляет только токены авторизации, не трогая другие куки
 * Это предотвращает случайную очистку других важных данных
 */
export function logout() {
  if (typeof window === 'undefined') return

  // Удаляем только токены авторизации
  removeCookie('access_token')
  removeCookie('refresh_token')

  if (window.location.pathname.startsWith('/dashboard')) {
    window.location.href = '/'
  }
}
