export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

export interface TelegramAuthProps {
  setIsTelegramModalOpen: (isOpen: boolean) => void
  title?: string
  className?: string
}

export interface User {
  id: number
  firstName: string
  lastName?: string
  username?: string
  photoUrl?: string
  telegramId: number
}

export interface AuthTokens {
  access_token: string
  refresh_token?: string
}

export interface AuthResponse {
  tokens: AuthTokens
  user: User
  message?: string
}
