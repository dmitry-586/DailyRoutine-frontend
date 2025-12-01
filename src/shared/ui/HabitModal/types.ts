import type { Habit } from '@/shared/types'
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import type { HabitFormData } from './schema'

export interface HabitModalProps {
  open: boolean
  habit?: Habit | null
  onClose: () => void
  onSave: (habit: Habit) => void
}

export interface HabitFormFieldsProps {
  typeValue: string
  habitFormat: string
  unitValue?: string
  register: UseFormRegister<HabitFormData>
  errors: FieldErrors<HabitFormData>
  control: Control<HabitFormData>
  onFormatChange: (value: string) => void
}

export interface UseHabitModalProps {
  open: boolean
  habit?: Habit | null
  onClose: () => void
  onSave: (habit: Habit) => void
}
