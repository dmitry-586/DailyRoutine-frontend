import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DEFAULT_FORM_VALUES } from './config'
import { formDataToHabit, habitToFormData } from './helpers'
import { HabitFormData, habitFormSchema } from './schema'
import { UseHabitModalProps } from './types'

export const useHabitModal = ({
  open,
  habit,
  onClose,
  onSave,
}: UseHabitModalProps) => {
  const isEditMode = !!habit
  const isActive = habit?.isActive !== false

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

  const typeValue = watch('type')
  const habitFormat = watch('format')
  const unitValue = watch('unit')

  useEffect(() => {
    if (open && habit) {
      reset(habitToFormData(habit))
    } else if (!open) {
      reset(DEFAULT_FORM_VALUES)
    }
  }, [habit, open, reset])

  const handleFormatChange = (nextFormat: string) => {
    if (nextFormat === 'count') {
      setValue('target', '')
      setValue('unit', DEFAULT_FORM_VALUES.unit)
    }

    if (nextFormat === 'time') {
      setValue('unit', undefined as never)
    }
  }

  const onSubmit = (data: HabitFormData) => {
    const habitData = formDataToHabit(data, habit)
    onSave(habitData)
    onClose()
  }

  const handleToggleActive = () => {
    if (!habit) return

    const updatedHabit = {
      ...habit,
      isActive: !isActive,
    }

    onSave(updatedHabit)
    onClose()
  }

  return {
    isEditMode,
    isActive,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    typeValue,
    habitFormat,
    unitValue,
    control,
    handleFormatChange,
    onSubmit,
    handleToggleActive,
  }
}
