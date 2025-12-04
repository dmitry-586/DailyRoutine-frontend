import type {
  CreateHabitRequest,
  Habit,
  UpdateHabitRequest,
} from '@/shared/types'
import type { HabitFormData } from './schema'

/**
 * Преобразует данные привычки в формат формы для редактирования
 */
export const habitToFormData = (habit: Habit): HabitFormData => ({
  title: habit.title,
  is_beneficial: habit.is_beneficial,
  type: habit.type,
  value: habit.type === 'binary' ? '1' : habit.value.toString(),
  unit: habit.type === 'time' ? undefined : habit.unit || 'раз',
})

/**
 * Вычисляет целевое значение в зависимости от типа привычки
 */
const calculateValue = (
  type: 'binary' | 'count' | 'time',
  value?: string,
): number => {
  if (type === 'binary') return 1
  return parseInt(value || '1', 10) || 1
}

/**
 * Преобразует данные формы в базовый объект запроса
 */
const formDataToBaseRequest = (data: HabitFormData) => {
  const value = calculateValue(data.type, data.value)
  const baseRequest = {
    title: data.title,
    is_beneficial: data.is_beneficial,
    type: data.type,
    value,
  }

  // unit нужен только для count
  if (data.type === 'count') {
    return { ...baseRequest, unit: data.unit || 'раз' }
  }

  return baseRequest
}

/**
 * Преобразует данные формы в запрос создания привычки
 */
export const formDataToCreateRequest = (
  data: HabitFormData,
): CreateHabitRequest => {
  return {
    ...formDataToBaseRequest(data),
    is_active: true,
  } as CreateHabitRequest
}

/**
 * Преобразует данные формы в запрос обновления привычки
 */
export const formDataToUpdateRequest = (
  data: HabitFormData,
): UpdateHabitRequest => {
  return formDataToBaseRequest(data) as UpdateHabitRequest
}
