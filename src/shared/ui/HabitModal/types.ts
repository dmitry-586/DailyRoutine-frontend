import type {
  CreateHabitRequest,
  Habit,
  UpdateHabitRequest,
} from '@/shared/types'
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import type { HabitFormData } from './schema'

export interface HabitModalProps {
  open: boolean
  habit?: Habit | null
  onClose: () => void
  onSave: (data: CreateHabitRequest | UpdateHabitRequest) => void
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
