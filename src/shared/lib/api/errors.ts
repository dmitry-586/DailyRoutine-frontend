import axios from 'axios'

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

export function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 500
    const message =
      error.response?.data?.message || error.message || `HTTP ${status}`
    const payload = error.response?.data

    return new ApiError(message, status, payload)
  }

  if (error instanceof Error) {
    return new ApiError(error.message, 500)
  }

  return new ApiError('Неизвестная ошибка', 500)
}
