import type { AxiosRequestConfig } from 'axios'
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_BASE_URL) {
	throw new Error('API URL не задан (NEXT_PUBLIC_API_URL)')
}

export const apiClient: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
	timeout: 30000,
})

apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('access_token')
			if (token && config.headers) {
				config.headers.Authorization = `Bearer ${token}`
			}
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

apiClient.interceptors.response.use(
	response => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean
		}

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				const refreshToken = localStorage.getItem('refresh_token')
				if (refreshToken && typeof window !== 'undefined') {
					const response = await axios.post(
						`${API_BASE_URL}/auth/refresh`,
						{ refresh_token: refreshToken }
					)

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
	}
)

export class ApiError extends Error {
	status: number
	payload?: unknown

	constructor(message: string, status: number, payload?: unknown) {
		super(message)
		this.name = 'ApiError'
		this.status = status
		this.payload = payload
	}
}

function handleApiError(error: unknown): ApiError {
	if (axios.isAxiosError(error)) {
		const status = error.response?.status ?? 500
		const message =
			error.response?.data?.message ||
			error.message ||
			`HTTP ${status}`
		const payload = error.response?.data

		return new ApiError(message, status, payload)
	}

	if (error instanceof Error) {
		return new ApiError(error.message, 500)
	}

	return new ApiError('Неизвестная ошибка', 500)
}

export async function apiFetch<TResponse = unknown>(
	path: string,
	config?: AxiosRequestConfig
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
