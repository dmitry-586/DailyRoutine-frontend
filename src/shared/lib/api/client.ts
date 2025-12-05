import type { AxiosRequestConfig } from 'axios'
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios'
import { getCookie, removeAllCookies, setCookie } from '../utils/cookies'
import { isTokenExpiringSoon } from '../utils/token'
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
        removeAllCookies()
        if (window.location.pathname.startsWith('/dashboard')) {
          window.location.href = '/'
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

      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const shouldRotateRefreshToken = isTokenExpiringSoon(
              refreshToken,
              2 * 24 * 60 * 60 * 1000,
            )

            const baseUrl = ensureApiBaseUrl()
            const response = await axios.post<{
              access_token: string
              refresh_token?: string
            }>(`${baseUrl}/auth/getrefreshtoken`, {
              refresh_token: refreshToken,
            })

            const { access_token, refresh_token } = response.data
            if (!access_token) {
              throw new Error('Access token не получен')
            }

            const isSecure = location.protocol === 'https:'
            setCookie('access_token', access_token, 7 * 24 * 60 * 60, isSecure)

            if (refresh_token && shouldRotateRefreshToken) {
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

      const { _retry, ...retryConfig } = originalRequest

      if (retryConfig.headers) {
        retryConfig.headers.Authorization = `Bearer ${newToken}`
      }

      return apiClient(retryConfig)
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
