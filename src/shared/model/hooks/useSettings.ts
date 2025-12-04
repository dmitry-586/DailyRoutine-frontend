import {
  updateSettings as apiUpdateSettings,
  updateTimezone as apiUpdateTimezone,
  getSettings,
  settingsKeys,
} from '@/shared/lib/api'
import type {
  UpdateSettingsRequest,
  UserSettings,
} from '@/shared/types/auth.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useSettings() {
  return useQuery<UserSettings>({
    queryKey: settingsKeys.settings(),
    queryFn: getSettings,
    staleTime: 5 * 60_000,
  })
}

export function useUpdateSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateSettingsRequest) => apiUpdateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.settings() })
    },
  })
}

export function useUpdateTimezone() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (timezone: string) => apiUpdateTimezone(timezone),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.settings() })
    },
  })
}
