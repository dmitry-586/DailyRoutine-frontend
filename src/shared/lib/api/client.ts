import type { AxiosRequestConfig } from 'axios'
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios'
import { getCookie, removeAllCookies, setCookie } from '../utils/cookies'
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
  withCredentials: true,
  timeout: 30000,
})

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.baseURL = config.baseURL ?? ensureApiBaseUrl()

    if (typeof window !== 'undefined') {
      const token = getCookie('access_token')
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = getCookie('refresh_token')

        if (refreshToken && typeof window !== 'undefined') {
          const baseUrl = ensureApiBaseUrl()
          const response = await axios.post(
            `${baseUrl}/auth/refresh`,
            {
              refresh_token: refreshToken,
            },
            { withCredentials: true },
          )

          const { access_token, refresh_token } = response.data

          if (access_token) {
            const isSecure = location.protocol === 'https:'
            setCookie('access_token', access_token, 7 * 24 * 60 * 60, isSecure)
            if (refresh_token) {
              setCookie(
                'refresh_token',
                refresh_token,
                30 * 24 * 60 * 60,
                isSecure,
              )
            }

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${access_token}`
            }
            return apiClient(originalRequest)
          }
        }
      } catch (refreshError) {
        if (typeof window !== 'undefined') {
          removeAllCookies()

          if (window.location.pathname.startsWith('/dashboard')) {
            window.location.href = '/'
          }
        }
        return Promise.reject(refreshError)
      }
    }

    if (error.response?.status === 401 && typeof window !== 'undefined') {
      if (window.location.pathname.startsWith('/dashboard')) {
        removeAllCookies()
        window.location.href = '/'
      }
    }

    return Promise.reject(error)
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
