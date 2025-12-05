import type { Habit, UpdateHabitRequest } from '@/shared/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  binaryEditSchema,
  countEditSchema,
  timeEditSchema,
  type EditHabitFormData,
} from './editHabitSchema'

const habitToFormData = (habit: Habit): EditHabitFormData => {
  const base = {
    title: habit.title,
  }

  switch (habit.type) {
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
  habitType: Habit['type'],
): UpdateHabitRequest => {
  const baseRequest: UpdateHabitRequest = {
    title: data.title,
  }

  if (habitType === 'binary') {
    return baseRequest
  }

  if (habitType === 'count') {
    const value = data.value ? Number.parseInt(data.value, 10) : 0
    const unit = data.unit || 'раз'
    return {
      ...baseRequest,
      value,
      unit,
    }
  }

  if (habitType === 'time') {
    const value = data.value ? Number.parseInt(data.value, 10) : 0
    return {
      ...baseRequest,
      value,
    }
  }

  return baseRequest
}

const getSchemaForHabitType = (type: Habit['type']) => {
  switch (type) {
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

interface UseEditHabitModalProps {
  open: boolean
  habit: Habit
  onSave: (data: UpdateHabitRequest) => void | Promise<void>
}

export const useEditHabitModal = ({
  open,
  habit,
  onSave,
}: UseEditHabitModalProps) => {
  const isActive = habit?.is_active !== false

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditHabitFormData>({
    resolver: zodResolver(getSchemaForHabitType(habit.type)),
    defaultValues: habitToFormData(habit),
    mode: 'onChange',
  })

  useEffect(() => {
    if (open) {
      reset(habitToFormData(habit))
    }
  }, [habit, open, reset])

  const onSubmit = (data: EditHabitFormData) => {
    const updateRequest = formDataToUpdateRequest(data, habit.type)
    onSave(updateRequest)
  }

  const handleToggleActive = () => {
    onSave({ is_active: !isActive })
  }

  return {
    isActive,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    control,
    onSubmit,
    handleToggleActive,
  }
}
