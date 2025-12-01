import type { Habit } from '@/shared/types'
import type { HabitFormData } from './schema'

/**
 * Преобразует данные привычки в формат формы для редактирования
 */
export const habitToFormData = (habit: Habit): HabitFormData => ({
  title: habit.title,
  type: habit.type,
  format: habit.format,
  target: habit.format === 'binary' ? '1' : habit.target.toString(),
  unit: habit.format === 'time' ? undefined : habit.unit || 'раз',
})

/**
 * Вычисляет целевое значение в зависимости от формата привычки
 */
const calculateTarget = (format: string, target?: string): number => {
  if (format === 'binary') return 1
  if (format === 'time') return parseInt(target || '0', 10) || 0

  return parseInt(target || '1', 10)
}

/**
 * Преобразует данные формы в объект привычки для сохранения
 */
export const formDataToHabit = (
  data: HabitFormData,
  existingHabit?: Habit | null,
): Habit => {
  const target = calculateTarget(data.format, data.target)

  return {
    id: existingHabit?.id || Date.now().toString(),
    title: data.title,
    type: data.type,
    format: data.format,
    current: existingHabit?.current || 0,
    target,
    unit:
      data.format === 'binary' || data.format === 'time'
        ? ''
        : data.unit || 'раз',
    streak: existingHabit?.streak || 0,
    completed: existingHabit?.completed || false,
    isActive: existingHabit?.isActive ?? true,
  }
}
