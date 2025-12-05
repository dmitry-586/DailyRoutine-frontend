import type { CreateHabitRequest } from '@/shared/types'
import type { HabitFormData } from './schema'

/**
 * Вычисляет целевое значение в зависимости от типа привычки
 */
const calculateValue = (
  type: HabitFormData['type'],
  value?: string,
): number => {
  if (type === 'binary') {
    return 1
  }

  if (!value) {
    throw new Error(`Значение обязательно для типа ${type}`)
  }

  const parsed = Number.parseInt(value, 10)

  if (Number.isNaN(parsed) || parsed < 0) {
    throw new Error(`Некорректное значение: ${value}`)
  }

  return parsed
}

/**
 * Преобразует данные формы в запрос создания привычки
 */
export const formDataToCreateRequest = (
  data: HabitFormData,
): CreateHabitRequest => {
  const baseRequest = {
    title: data.title,
    is_beneficial: data.is_beneficial,
    type: data.type,
    value: calculateValue(data.type, data.value),
    is_active: true,
  }

  // unit нужен только для count
  if (data.type === 'count') {
    return {
      ...baseRequest,
      unit: data.unit || 'раз',
    }
  }

  return baseRequest
}
