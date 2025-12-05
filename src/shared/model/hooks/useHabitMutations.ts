import type {
  CreateHabitRequest,
  UpdateHabitRequest,
} from '@/shared/types/habit.types'
import { toast } from 'sonner'
import { useCreateHabit, useDeleteHabit, useUpdateHabit } from './useHabits'

export function useHabitMutations() {
  const { mutateAsync: createHabit } = useCreateHabit()
  const { mutateAsync: updateHabit } = useUpdateHabit()
  const { mutateAsync: deleteHabit } = useDeleteHabit()

  const handleCreate = async (data: CreateHabitRequest) => {
    try {
      await createHabit(data)
      toast.success('Привычка создана')
    } catch (error) {
      console.error('Ошибка при создании привычки', error)
      toast.error('Не удалось создать привычку')
      throw error
    }
  }

  const handleUpdate = async (id: number, data: UpdateHabitRequest) => {
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
