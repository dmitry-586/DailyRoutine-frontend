import {
  getSprintProgress,
  getSprints,
  sprintKeys,
  type Sprint,
  type UserSprintProgress,
} from '@/shared/lib/api'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'

export function useSprints<TData = Sprint[]>(
  options?: Omit<
    UseQueryOptions<Sprint[], Error, TData>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery<Sprint[], Error, TData>({
    queryKey: sprintKeys.list(),
    queryFn: getSprints,
    staleTime: 5 * 60 * 1000, // 5 минут
    ...options,
  })
}

export function useSprintProgress<TData = UserSprintProgress[]>(
  options?: Omit<
    UseQueryOptions<UserSprintProgress[], Error, TData>,
    'queryKey' | 'queryFn'
  >,
) {
  return useQuery<UserSprintProgress[], Error, TData>({
    queryKey: sprintKeys.progress(),
    queryFn: getSprintProgress,
    staleTime: 5 * 60 * 1000, // 5 минут
    ...options,
  })
}
