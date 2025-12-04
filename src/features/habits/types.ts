import type {
  CreateHabitRequest,
  Habit,
  UpdateHabitRequest,
} from '@/shared/types/habit.types'
import { TabVariant } from '@/shared/ui/Tabs/types'

export interface AllHabitsProps {
  habits: Habit[]
  onAddHabit: (data: CreateHabitRequest) => void
  onUpdateHabit: (id: number, data: UpdateHabitRequest) => void
  onDeleteHabit: (id: number) => void
  onCompleteHabit?: (habit: Habit) => void
}

export type FilterType = 'all' | 'good' | 'bad' | 'inactive'

export interface TabConfig {
  value: FilterType
  label: string
  variant: TabVariant
  emptyMessage: string
  filter: (habit: Habit) => boolean
}
