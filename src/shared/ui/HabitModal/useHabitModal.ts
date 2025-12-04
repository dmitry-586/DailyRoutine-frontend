import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DEFAULT_FORM_VALUES } from './config'
import {
  formDataToCreateRequest,
  formDataToUpdateRequest,
  habitToFormData,
} from './helpers'
import { HabitFormData, habitFormSchema } from './schema'
import type { HabitModalProps } from './types'

export const useHabitModal = ({
  open,
  habit,
  onClose,
  onSave,
}: HabitModalProps) => {
  const isEditMode = !!habit
  const isActive = habit?.is_active !== false

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<HabitFormData>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: DEFAULT_FORM_VALUES,
    mode: 'onChange',
  })

  const isBeneficialValue = watch('is_beneficial')
  const habitType = watch('type')
  const unitValue = watch('unit')

  useEffect(() => {
    if (open) {
      if (habit) {
        reset(habitToFormData(habit))
      } else {
        reset(DEFAULT_FORM_VALUES)
      }
    }
  }, [habit, open, reset])

  const handleTypeChange = (nextType: string) => {
    if (nextType === 'count') {
      setValue('value', '')
      setValue('unit', DEFAULT_FORM_VALUES.unit)
    }

    if (nextType === 'time') {
      setValue('unit', undefined)
    }
  }

  const onSubmit = (data: HabitFormData) => {
    if (isEditMode) {
      onSave(formDataToUpdateRequest(data))
    } else {
      onSave(formDataToCreateRequest(data))
    }
    onClose()
  }

  const handleToggleActive = () => {
    if (!habit) return
    onSave({ is_active: !isActive })
    onClose()
  }

  return {
    isEditMode,
    isActive,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    habitType,
    unitValue,
    isBeneficialValue,
    control,
    handleTypeChange,
    onSubmit,
    handleToggleActive,
  }
}
