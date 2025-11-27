import type { AxiosRequestConfig } from 'axios'
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios'
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
      const token = localStorage.getItem('access_token')
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
        const refreshToken = localStorage.getItem('refresh_token')
        if (refreshToken && typeof window !== 'undefined') {
          const baseUrl = ensureApiBaseUrl()
          const response = await axios.post(`${baseUrl}/auth/refresh`, {
            refresh_token: refreshToken,
          })

          const { access_token, refresh_token } = response.data

          if (access_token) {
            localStorage.setItem('access_token', access_token)
            if (refresh_token) {
              localStorage.setItem('refresh_token', refresh_token)
            }

            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${access_token}`
            }
            return apiClient(originalRequest)
          }
        }
      } catch (refreshError) {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
        }
        return Promise.reject(refreshError)
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
