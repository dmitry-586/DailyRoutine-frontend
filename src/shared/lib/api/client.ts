import type { AxiosRequestConfig } from 'axios'
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios'
import { getCookie, isTokenExpiringSoon, logout, setCookie } from '../utils'
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

let isRefreshing = false
let refreshSubscribers: Array<(token: string) => void> = []

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token))
  refreshSubscribers = []
}

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback)
}

const handleLogout = () => {
  isRefreshing = false
  refreshSubscribers = []
  logout()
}

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
    const originalRequest = error.config as InternalAxiosRequestConfig
    const is401 = error.response?.status === 401

    if (!is401) {
      return Promise.reject(error)
    }

    const isRefreshRequest =
      originalRequest.url?.includes('/auth/getaccesstoken') ||
      originalRequest.url?.includes('/auth/getrefreshtoken')

    // Если это запрос на обновление токена вернул 401 - refresh token протух
    if (isRefreshRequest) {
      handleLogout()
      return Promise.reject(error)
    }

    // Если уже идет обновление токена - добавляем запрос в очередь
    if (isRefreshing) {
      return new Promise((resolve) => {
        addRefreshSubscriber((token: string) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`
          }
          resolve(apiClient(originalRequest))
        })
      })
    }

    isRefreshing = true

    try {
      const refreshToken = getCookie('refresh_token')
      if (!refreshToken || typeof window === 'undefined') {
        throw new Error('Refresh token не найден')
      }

      const baseUrl = ensureApiBaseUrl()

      const shouldRotateRefreshToken = isTokenExpiringSoon(
        refreshToken,
        2 * 24 * 60 * 60 * 1000,
      )

      // Если refresh token скоро истечет - используем /auth/getrefreshtoken (обновляет оба)
      // Иначе используем /auth/getaccesstoken (обновляет только access)
      const endpoint = shouldRotateRefreshToken
        ? '/auth/getrefreshtoken'
        : '/auth/getaccesstoken'

      const response = await axios.post<{
        access_token: string
        refresh_token?: string
      }>(`${baseUrl}${endpoint}`, {
        refresh_token: refreshToken,
      })

      const { access_token, refresh_token } = response.data
      if (!access_token) {
        throw new Error('Access token не получен')
      }

      const isSecure = location.protocol === 'https:'
      setCookie('access_token', access_token, 7 * 24 * 60 * 60, isSecure)

      // Если бэк вернул новый refresh_token (при использовании /auth/getrefreshtoken), сохраняем его
      if (refresh_token) {
        setCookie('refresh_token', refresh_token, 7 * 24 * 60 * 60, isSecure)
      }

      // Обновляем токен в оригинальном запросе
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${access_token}`
      }

      // Уведомляем все запросы в очереди о новом токене
      onRefreshed(access_token)

      isRefreshing = false

      // Повторяем оригинальный запрос с новым токеном
      return apiClient(originalRequest)
    } catch (refreshError) {
      isRefreshing = false
      handleLogout()
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
