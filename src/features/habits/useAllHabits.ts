import type {
  CreateHabitRequest,
  Habit,
  UpdateHabitRequest,
} from '@/shared/types/habit.types'
import { useMemo, useState } from 'react'
import { HABIT_TABS } from './config'
import type { FilterType } from './types'

interface UseAllHabitsProps {
  habits: Habit[]
  onAddHabit: (data: CreateHabitRequest) => void
  onUpdateHabit: (id: number, data: UpdateHabitRequest) => void
}

export const useAllHabits = ({
  habits,
  onAddHabit,
  onUpdateHabit,
}: UseAllHabitsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
  const [filter, setFilter] = useState<FilterType>('all')

  const activeTab = useMemo(
    () => HABIT_TABS.find((tab) => tab.value === filter)!,
    [filter],
  )

  const tabCounts = useMemo(
    () =>
      HABIT_TABS.reduce(
        (acc, tab) => {
          acc[tab.value] = habits.filter(tab.filter).length
          return acc
        },
        {} as Record<FilterType, number>,
      ),
    [habits],
  )

  const filteredHabits = useMemo(
    () => habits.filter(activeTab.filter),
    [habits, activeTab],
  )

  return {
    filter,
    setFilter,
    isModalOpen,
    editingHabit,
    activeTab,
    filteredHabits,
    tabCounts,
    handleModal: (habit?: Habit) => {
      setEditingHabit(habit ?? null)
      setIsModalOpen(true)
    },
    handleClose: () => {
      setIsModalOpen(false)
      setEditingHabit(null)
    },
    handleSave: (data: CreateHabitRequest | UpdateHabitRequest) => {
      if (editingHabit) {
        onUpdateHabit(editingHabit.id, data as UpdateHabitRequest)
      } else {
        onAddHabit(data as CreateHabitRequest)
      }
      setEditingHabit(null)
    },
    handleToggleActive: (habit: Habit) => {
      onUpdateHabit(habit.id, { is_active: !habit.is_active })
    },
  }
}
