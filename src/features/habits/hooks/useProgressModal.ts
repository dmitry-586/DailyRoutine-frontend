'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { createProgressSchema, type ProgressFormData } from '../config/schema'

const MIN_PROGRESS_STEP = 1

interface UseProgressModalProps {
  isOpen: boolean
  initialValue: number
  remaining: number
  onSave: (value: number) => void
}

export const useProgressModal = ({
  isOpen,
  initialValue,
  remaining,
  onSave,
}: UseProgressModalProps) => {
  const schema = createProgressSchema(remaining)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProgressFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: initialValue.toString(),
    },
    mode: 'onChange',
  })

  useEffect(() => {
    if (isOpen) {
      const defaultValue = remaining > 0 ? remaining : MIN_PROGRESS_STEP
      reset({ value: defaultValue.toString() })
    }
  }, [isOpen, remaining, reset])

  const onSubmit = (data: ProgressFormData) => {
    const numValue = Number.parseInt(data.value, 10)
    onSave(numValue)
  }

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
  }
}
