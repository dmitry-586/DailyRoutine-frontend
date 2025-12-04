import {
  deleteHabit as apiDeleteHabit,
  updateHabit as apiUpdateHabit,
  createHabit,
  getHabits,
  habitKeys,
} from '@/shared/lib/api'
import type {
  CreateHabitRequest,
  Habit,
  UpdateHabitRequest,
} from '@/shared/types/habit.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useHabits() {
  return useQuery<Habit[]>({
    queryKey: habitKeys.all(),
    queryFn: getHabits,
    staleTime: 1 * 60_000, // 1 минута
  })
}

export function useCreateHabit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateHabitRequest) => createHabit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all() })
    },
  })
}

export function useUpdateHabit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateHabitRequest }) =>
      apiUpdateHabit(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all() })
      queryClient.invalidateQueries({
        queryKey: habitKeys.detail(String(variables.id)),
      })
    },
  })
}

export function useDeleteHabit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => apiDeleteHabit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all() })
    },
  })
}
