import {
  getSprintProgress,
  getSprints,
  sprintKeys,
  type Sprint,
  type UserSprintProgress,
} from '@/shared/lib/api'
import { useQuery } from '@tanstack/react-query'

export function useSprints() {
  return useQuery<Sprint[]>({
    queryKey: sprintKeys.all(),
    queryFn: getSprints,
    staleTime: 5 * 60 * 1000, // 5 минут
  })
}

export function useSprintProgress() {
  return useQuery<UserSprintProgress[]>({
    queryKey: sprintKeys.progress(),
    queryFn: getSprintProgress,
    staleTime: 5 * 60 * 1000, // 5 минут
  })
}
