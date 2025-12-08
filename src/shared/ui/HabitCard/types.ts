import { Habit } from '@/shared/types/habit.types'

export type HabitCardData = Habit

export interface HabitCardHandlers {
  onComplete?: (habit: HabitCardData) => void
  onEdit?: (habit: HabitCardData) => void
  onDelete?: (id: number) => void
  onToggleActive?: (habit: HabitCardData) => void
}

export interface HabitCardProps {
  data: HabitCardData
  handlers: HabitCardHandlers
}

export interface HabitCardHeaderProps {
  data: Pick<Habit, 'title' | 'type' | 'value' | 'unit' | 'series'>
}

export interface HabitCardActionsProps {
  isBeneficial: boolean
  isCompleted: boolean
  isActive: boolean
  handlers: {
    onComplete: (e: React.MouseEvent) => void
    onRelapse: (e: React.MouseEvent) => void
    onEdit?: (e: React.MouseEvent) => void
    onDelete?: (e: React.MouseEvent) => void
    onToggleActive?: () => void
  }
}

export interface HabitCardDeleteModalProps {
  title: string
  isOpen: boolean
  handlers: {
    onClose: () => void
    onConfirm: () => void
  }
}
