'use client'

import type { Habit } from '@/shared/types'
import { useMemo, useState } from 'react'
import { HABIT_TABS } from '../config/habits'
import type { FilterType } from '../types'

export function useAllHabits(habits: Habit[]) {
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
    activeTab,
    filteredHabits,
    tabCounts,
  }
}
