import { Habit, HabitUpdate } from '@/shared/types'
import {
  EditHabitFormData,
  binaryEditSchema,
  countEditSchema,
  timeEditSchema,
} from './components/schema'

const habitToFormData = (habit: Habit): EditHabitFormData => {
  const base = {
    title: habit.title,
  }

  switch (habit.format) {
    case 'binary':
      return {
        ...base,
        value: undefined,
        unit: undefined,
      } as EditHabitFormData

    case 'count':
      return {
        ...base,
        value: habit.value.toString(),
        unit: habit.unit && habit.unit.trim() !== '' ? habit.unit : 'раз',
      } as EditHabitFormData

    case 'time':
      return {
        ...base,
        value: habit.value.toString(),
        unit: undefined,
      } as EditHabitFormData

    default:
      return {
        ...base,
        value: undefined,
        unit: undefined,
      } as EditHabitFormData
  }
}

const formDataToUpdateRequest = (
  data: EditHabitFormData,
  habitFormat: Habit['format'],
): HabitUpdate => {
  const baseRequest: HabitUpdate = {
    title: data.title,
  }

  if (habitFormat === 'binary') {
    return baseRequest
  }

  if (habitFormat === 'count') {
    const value = data.value ? Number.parseInt(data.value, 10) : 0
    const unit = data.unit || 'раз'
    return {
      ...baseRequest,
      value,
      unit,
    }
  }

  if (habitFormat === 'time') {
    const value = data.value ? Number.parseInt(data.value, 10) : 0
    return {
      ...baseRequest,
      value,
    }
  }

  return baseRequest
}

const getSchemaForHabitType = (format: Habit['format']) => {
  switch (format) {
    case 'binary':
      return binaryEditSchema
    case 'count':
      return countEditSchema
    case 'time':
      return timeEditSchema
    default:
      return binaryEditSchema
  }
}

export { formDataToUpdateRequest, getSchemaForHabitType, habitToFormData }
