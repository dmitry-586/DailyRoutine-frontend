import type {
  UpdateSettingsRequest,
  UserSettings,
} from '@/shared/types/auth.types'
import { apiFetch } from './client'

export type Settings = UserSettings

export async function getSettings(): Promise<Settings> {
  return apiFetch<Settings>('/user/me/settings', {
    method: 'GET',
  })
}

export async function updateSettings(
  data: UpdateSettingsRequest,
): Promise<Settings> {
  return apiFetch<Settings>('/user/me/settings', {
    method: 'PATCH',
    data,
  })
}

export async function updateTimezone(timezone: string): Promise<Settings> {
  return apiFetch<Settings>('/user/me/settings/timezone', {
    method: 'PUT',
    data: { timezone },
  })
}
