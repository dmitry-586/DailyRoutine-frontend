import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DEFAULT_FORM_VALUES } from './config'
import { formDataToCreateRequest } from './helpers'
import { HabitFormData, habitFormSchema } from './schema'
import type { HabitModalProps } from './types'

export const useHabitModal = ({
  open,
  onSave,
}: Omit<HabitModalProps, 'onClose'>) => {
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
      reset(DEFAULT_FORM_VALUES)
    }
  }, [open, reset])

  useEffect(() => {
    if (!isBeneficialValue) {
      setValue('type', 'binary')
      setValue('value', DEFAULT_FORM_VALUES.value)
      setValue('unit', DEFAULT_FORM_VALUES.unit)
    }
  }, [isBeneficialValue, setValue])

  const handleTypeChange = (nextType: string) => {
    if (!isBeneficialValue) {
      setValue('type', 'binary')
      return
    }

    if (nextType === 'count') {
      setValue('value', '')
      setValue('unit', DEFAULT_FORM_VALUES.unit)
    }

    if (nextType === 'time') {
      setValue('unit', undefined)
    }
  }

  const onSubmit = (data: HabitFormData) => {
    onSave(formDataToCreateRequest(data))
  }

  return {
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
  }
}
