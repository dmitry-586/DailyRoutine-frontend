import type { Habit, HabitUpdate } from '@/shared/types'
import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import type { EditHabitFormData } from './components/editHabitSchema'

export interface EditHabitModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: HabitUpdate) => void | Promise<void>
  habit: Habit
}

export interface EditHabitFormProps {
  habit: Habit
  register: UseFormRegister<EditHabitFormData>
  errors: FieldErrors<EditHabitFormData>
  control: Control<EditHabitFormData>
}
