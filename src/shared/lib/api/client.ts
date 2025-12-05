import type { AxiosRequestConfig } from 'axios'
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios'
import { getCookie, removeAllCookies, setCookie } from '../utils/cookies'
import { isTokenExpired, isTokenExpiringSoon } from '../utils/token'
import { ApiError, handleApiError } from './errors'

const ensureApiBaseUrl = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.trim()

  if (!baseUrl) {
    throw new ApiError('API URL не задан (NEXT_PUBLIC_API_URL)', 500)
  }

  return baseUrl
}

export const apiClient: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

let refreshPromise: Promise<string> | null = null

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.baseURL = config.baseURL ?? ensureApiBaseUrl()

  if (typeof window !== 'undefined') {
    const token = getCookie('access_token')
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    const isRefreshRequest = originalRequest.url?.includes(
      '/auth/getrefreshtoken',
    )
    const is401 = error.response?.status === 401

    if (isRefreshRequest || !is401) {
      return Promise.reject(error)
    }

    if (originalRequest._retry) {
      if (typeof window !== 'undefined') {
        const refreshToken = getCookie('refresh_token')
        const isRefreshTokenValid =
          refreshToken && !isTokenExpired(refreshToken)

        if (!isRefreshTokenValid) {
          removeAllCookies()
          if (window.location.pathname.startsWith('/dashboard')) {
            window.location.href = '/'
          }
        }
      }
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      const refreshToken = getCookie('refresh_token')
      if (!refreshToken || typeof window === 'undefined') {
        throw new Error('Refresh token не найден')
      }

      if (isTokenExpired(refreshToken)) {
        throw new Error('Refresh token истек')
      }

      // Если осталось <= 2 дней до истечения, обновляем refresh_token
      const shouldRefreshRefreshToken = isTokenExpiringSoon(
        refreshToken,
        2 * 24 * 60 * 60 * 1000,
      )

      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const baseUrl = ensureApiBaseUrl()
            const response = await axios.post<{
              access_token: string
              refresh_token: string
            }>(`${baseUrl}/auth/getrefreshtoken`, {
              refresh_token: refreshToken,
            })

            const { access_token, refresh_token } = response.data
            if (!access_token || !refresh_token) {
              throw new Error('Токены не получены')
            }

            const isSecure = location.protocol === 'https:'
            setCookie('access_token', access_token, 7 * 24 * 60 * 60, isSecure)
            if (shouldRefreshRefreshToken) {
              setCookie(
                'refresh_token',
                refresh_token,
                7 * 24 * 60 * 60,
                isSecure,
              )
            }

            return access_token
          } finally {
            refreshPromise = null
          }
        })()
      }

      const newToken = await refreshPromise
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`
      }
      return apiClient(originalRequest)
    } catch {
      refreshPromise = null
      if (typeof window !== 'undefined') {
        removeAllCookies()
        if (window.location.pathname.startsWith('/dashboard')) {
          window.location.href = '/'
        }
      }
      return Promise.reject(error)
    }
  },
)

export async function apiFetch<TResponse = unknown>(
  path: string,
  config?: AxiosRequestConfig,
): Promise<TResponse> {
  try {
    const response = await apiClient.request<TResponse>({
      url: path,
      ...config,
    })
    return response.data
  } catch (error) {
    throw handleApiError(error)
  }
}
