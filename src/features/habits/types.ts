import { Habit } from '@/shared/types/habit.types'
import { TabVariant } from '@/shared/ui/Tabs/types'

export interface AllHabitsProps {
  habits: Habit[]
  onAddHabit: (habit: Habit) => void
  onUpdateHabit: (habit: Habit) => void
  onDeleteHabit: (id: string) => void
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
