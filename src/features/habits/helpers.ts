import { Habit } from '@/shared/types/habit.types'

export const toggleHabitActive = (habit: Habit): Habit => ({
  ...habit,
  isActive: !habit.isActive,
})
