import type { Habit } from '@/shared/types/habit.types'
import { ListChecks } from 'lucide-react'
import type { FilterType } from './types'

export interface HabitTab {
  value: FilterType
  label: string
  icon: typeof ListChecks
  filter: (habit: Habit) => boolean
  emptyMessage: string
}

export const HABIT_TABS: HabitTab[] = [
  {
    value: 'all',
    label: 'Все',
    icon: ListChecks,
    filter: () => true,
    emptyMessage: 'У вас пока нет привычек',
  },
  {
    value: 'active',
    label: 'Активные',
    icon: ListChecks,
    filter: (habit) => habit.is_active !== false,
    emptyMessage: 'У вас нет активных привычек',
  },
  {
    value: 'inactive',
    label: 'Неактивные',
    icon: ListChecks,
    filter: (habit) => habit.is_active === false,
    emptyMessage: 'У вас нет неактивных привычек',
  },
]
