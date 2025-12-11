interface UserBase {
  id: number
  username?: string
  first_name: string
  photo_url?: string
  auth_date: string
}

export interface TelegramUser extends UserBase {
  last_name?: string
  hash: string
}

export interface TelegramAuthProps {
  setIsTelegramModalOpen: (isOpen: boolean) => void
  title?: string
  className?: string
}

export interface User extends UserBase {}

export interface UserSettingsBase {
  do_not_disturb?: boolean
  notify_times?: string[]
}

export interface UpdateUserRequest extends Partial<
  Pick<UserBase, 'username' | 'photo_url' | 'first_name'>
> {}

export interface UserSettings extends UserSettingsBase {
  userId: number
  timezone: string
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
