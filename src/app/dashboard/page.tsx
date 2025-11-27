'use client'

import { DashboardHabits } from '@/features/dashboard/DashboardHabits'
import { Stats } from '@/features/dashboard/Stats'
import { WeekCalendar } from '@/features/dashboard/WeekCalendar'
import {
  addHistoryEntry,
  generateHistoryForHabit,
} from '@/shared/lib/utils/habitHistory'
import { Habit } from '@/shared/types/habit.types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const initialHabits: Habit[] = [
  {
    id: '1',
    title: 'Утренняя пробежка',
    type: 'good' as const,
    format: 'time' as const,
    current: 25,
    target: 30,
    unit: 'мин',
    streak: 7,
    completed: false,
  },
  {
    id: '2',
    title: 'Прочитать книгу',
    type: 'good' as const,
    format: 'count' as const,
    current: 15,
    target: 20,
    unit: 'стр',
    streak: 5,
    completed: false,
  },
  {
    id: '3',
    title: 'Медитация',
    type: 'good' as const,
    format: 'binary' as const,
    current: 0,
    target: 1,
    unit: '',
    streak: 12,
    completed: false,
  },
  {
    id: '4',
    title: 'Не курить',
    type: 'bad' as const,
    format: 'binary' as const,
    current: 0,
    target: 1,
    unit: '',
    streak: 30,
    completed: false,
  },
  {
    id: '5',
    title: 'Выпить воды',
    type: 'good' as const,
    format: 'count' as const,
    current: 6,
    target: 8,
    unit: 'стаканов',
    streak: 3,
    completed: false,
  },
  {
    id: '6',
    title: 'Не есть сладкое',
    type: 'bad' as const,
    format: 'binary' as const,
    current: 0,
    target: 1,
    unit: '',
    streak: 14,
    completed: false,
  },
].map((habit) => ({
  ...habit,
  isActive: true,
  history: generateHistoryForHabit(habit),
}))

export default function DashboardPage() {
  const router = useRouter()
  const [habits, setHabits] = useState<Habit[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('habits')
      if (stored) {
        try {
          return JSON.parse(stored)
        } catch {
          return initialHabits
        }
      }
    }
    return initialHabits
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('habits', JSON.stringify(habits))
    }
  }, [habits])

  const handleAddHabit = (habit: Habit) => {
    const habitWithHistory = {
      ...habit,
      history: habit.history || generateHistoryForHabit(habit),
    }
    setHabits([...habits, habitWithHistory])
  }

  const handleUpdateHabit = (updatedHabit: Habit) => {
    setHabits(habits.map((h) => (h.id === updatedHabit.id ? updatedHabit : h)))
  }

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter((h) => h.id !== id))
  }

  const handleCompleteHabit = (habit: Habit) => {
    const updatedHabit = addHistoryEntry(
      habit,
      habit.current,
      habit.completed || false,
    )
    setHabits(habits.map((h) => (h.id === habit.id ? updatedHabit : h)))
  }

  const handleViewHabitDetails = (habit: Habit) => {
    router.push(`/dashboard/habits/${habit.id}`)
  }

  return (
    <>
      <WeekCalendar />
      <div className='mt-6 flex w-full gap-4'>
        <DashboardHabits
          habits={habits}
          onAddHabit={handleAddHabit}
          onUpdateHabit={handleUpdateHabit}
          onDeleteHabit={handleDeleteHabit}
          onCompleteHabit={handleCompleteHabit}
          onHabitClick={handleViewHabitDetails}
        />
        <Stats habits={habits} />
      </div>
    </>
  )
}
