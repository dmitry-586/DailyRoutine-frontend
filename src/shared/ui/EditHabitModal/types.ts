import type { Habit, HabitUpdate } from '@/shared/types'
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import type { EditHabitFormData } from './components/schema'

interface EditHabitModalBase {
  open: boolean
  habit: Habit
  onSave: (data: HabitUpdate) => void | Promise<void>
}

export interface EditHabitModalProps extends EditHabitModalBase {
  onClose: () => void
}

export interface EditHabitFormProps {
  habit: Habit
  register: UseFormRegister<EditHabitFormData>
  errors: FieldErrors<EditHabitFormData>
  control: Control<EditHabitFormData>
}

export interface UseEditHabitModalProps extends EditHabitModalBase {}
