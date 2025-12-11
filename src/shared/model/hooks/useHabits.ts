import {
  deleteHabit as apiDeleteHabit,
  updateHabit as apiUpdateHabit,
  createHabit,
  getHabits,
  habitKeys,
} from '@/shared/lib/api'
import type { Habit, HabitCreate, HabitUpdate } from '@/shared/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useHabits() {
  return useQuery<Habit[]>({
    queryKey: habitKeys.all(),
    queryFn: getHabits,
  })
}

function useCreateHabit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: HabitCreate) => createHabit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all() })
    },
  })
}

function useUpdateHabit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: HabitUpdate }) =>
      apiUpdateHabit(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all() })
    },
  })
}

function useDeleteHabit() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => apiDeleteHabit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: habitKeys.all() })
    },
  })
}

export function useHabitMutations() {
  const { mutateAsync: createHabit } = useCreateHabit()
  const { mutateAsync: updateHabit } = useUpdateHabit()
  const { mutateAsync: deleteHabit } = useDeleteHabit()

  const handleCreate = async (data: HabitCreate) => {
    try {
      await createHabit(data)
      toast.success('Привычка создана')
    } catch (error) {
      console.error('Ошибка при создании привычки', error)
      toast.error('Не удалось создать привычку')
      throw error
    }
  }

  const handleUpdate = async (id: number, data: HabitUpdate) => {
    try {
      await updateHabit({ id, data })
      toast.success('Привычка обновлена')
    } catch (error) {
      console.error('Ошибка при обновлении привычки', error)
      toast.error('Не удалось обновить привычку')
      throw error
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteHabit(id)
      toast.success('Привычка удалена')
    } catch (error) {
      console.error('Ошибка при удалении привычки', error)
      toast.error('Не удалось удалить привычку')
      throw error
    }
  }

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
  }
}
