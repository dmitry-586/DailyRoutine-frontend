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
  headers: { 'Content-Type': 'application/json' },
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

const resetRefreshState = () => {
  isRefreshing = false
  refreshSubscribers = []
}

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.baseURL = config.baseURL ?? ensureApiBaseUrl()

  const token = getCookie('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | InternalAxiosRequestConfig
      | undefined

    if (!originalRequest || error.response?.status !== 401) {
      return Promise.reject(error)
    }

    const isRefreshRequest =
      originalRequest.url?.includes('/auth/getaccesstoken') ||
      originalRequest.url?.includes('/auth/getrefreshtoken')

    if (isRefreshRequest) {
      resetRefreshState()
      logout()
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        addRefreshSubscriber((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          resolve(apiClient(originalRequest))
        })
      })
    }

    isRefreshing = true

    try {
      const refreshToken = getCookie('refresh_token')
      if (!refreshToken) {
        resetRefreshState()
        return Promise.reject(error)
      }

      const endpoint = isTokenExpiringSoon(
        refreshToken,
        2 * 24 * 60 * 60 * 1000,
      )
        ? '/auth/getrefreshtoken'
        : '/auth/getaccesstoken'

      const response = await axios.post<{
        access_token: string
        refresh_token?: string
      }>(`${ensureApiBaseUrl()}${endpoint}`, {
        refresh_token: refreshToken,
      })

      const { access_token, refresh_token } = response.data
      const isSecure = location.protocol === 'https:'

      setCookie('access_token', access_token, 7 * 24 * 60 * 60, isSecure)
      if (refresh_token) {
        setCookie('refresh_token', refresh_token, 7 * 24 * 60 * 60, isSecure)
      }

      originalRequest.headers.Authorization = `Bearer ${access_token}`
      onRefreshed(access_token)
      resetRefreshState()

      return apiClient(originalRequest)
    } catch (refreshError) {
      resetRefreshState()

      const isAuthError =
        axios.isAxiosError(refreshError) &&
        (refreshError.response?.status === 401 ||
          refreshError.response?.status === 403)

      if (isAuthError) {
        logout()
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
