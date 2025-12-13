import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { type EditHabitFormData } from './components/schema'
import {
  formDataToUpdateRequest,
  getSchemaForHabitType,
  habitToFormData,
} from './helpers'
import { UseEditHabitModalProps } from './types'

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
    resolver: zodResolver(getSchemaForHabitType(habit.format)),
    defaultValues: habitToFormData(habit),
    mode: 'onChange',
  })

  useEffect(() => {
    if (open) {
      reset(habitToFormData(habit))
    }
  }, [habit, open, reset])

  const onSubmit = (data: EditHabitFormData) => {
    const updateRequest = formDataToUpdateRequest(data, habit.format)
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
