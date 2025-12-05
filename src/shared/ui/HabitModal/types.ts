import type { CreateHabitRequest } from '@/shared/types'
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import type { HabitFormData } from './schema'

export interface HabitModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: CreateHabitRequest) => void | Promise<void>
}

export interface HabitFormFieldsProps {
  habitType: string
  unitValue?: string
  isBeneficialValue: boolean
  register: UseFormRegister<HabitFormData>
  errors: FieldErrors<HabitFormData>
  control: Control<HabitFormData>
  onTypeChange: (value: string) => void
}
