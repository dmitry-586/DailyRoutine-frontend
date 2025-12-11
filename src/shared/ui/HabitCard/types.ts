import { Habit, HabitType } from '@/shared/types/habit.types'
import type React from 'react'

export type HabitCardData = Habit

export type HabitCardClick = (
  event: React.MouseEvent<HTMLButtonElement>,
) => void

export interface HabitCardActionHandlers {
  onPrimary: HabitCardClick
  onEdit?: HabitCardClick
  onDelete?: HabitCardClick
}

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
  data: Pick<
    Habit,
    'title' | 'format' | 'value' | 'unit' | 'series' | 'current_value'
  >
}

export interface HabitCardActionsProps {
  type: HabitType
  isCompleted: boolean
  isActive: boolean
  handlers: HabitCardActionHandlers
}

export interface HabitCardDeleteModalProps {
  title: string
  isOpen: boolean
  handlers: {
    onClose: () => void
    onConfirm: () => void
  }
}
