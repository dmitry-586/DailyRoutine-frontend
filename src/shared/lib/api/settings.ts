import type {
  UpdateSettingsRequest,
  UserSettings,
} from '@/shared/types/auth.types'
import { apiFetch } from './client'

export async function getSettings(): Promise<UserSettings> {
  return await apiFetch<UserSettings>('/user/me/settings')
}

export async function updateSettings(
  data: UpdateSettingsRequest,
): Promise<UserSettings> {
  return await apiFetch<UserSettings>('/user/me/settings', {
    method: 'PUT',
    data,
  })
}

export async function updateTimezone(timezone: string): Promise<UserSettings> {
  return await apiFetch<UserSettings>('/user/me/settings/timezone', {
    method: 'PUT',
    data: { timezone },
  })
}
