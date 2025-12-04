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
  username?: string
  photo_url?: string
  auth_date: string
  tokentg?: string
}

export interface UserSettings {
  user_id: number
  timezone: string
  do_not_disturb: boolean
  notify_times: string[]
}

export interface UpdateSettingsRequest {
  do_not_disturb?: boolean
  notify_times?: string[]
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
