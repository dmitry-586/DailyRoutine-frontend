import {
  getSettings,
  settingsKeys,
  updateSettings,
  updateTimezone,
} from '@/shared/lib/api'
import type { Settings } from '@/shared/lib/api/settings'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useSettings() {
  return useQuery<Settings>({
    queryKey: settingsKeys.settings(),
    queryFn: getSettings,
    staleTime: 5 * 60_000, // 5 минут
  })
}

export function useUpdateSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.settings() })
    },
  })
}

export function useUpdateTimezone() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateTimezone,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.settings() })
      queryClient.invalidateQueries({ queryKey: settingsKeys.timezone() })
    },
  })
}
