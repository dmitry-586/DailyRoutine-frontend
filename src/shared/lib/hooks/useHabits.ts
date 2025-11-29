import {
  addHistoryEntry,
  generateHistoryForHabit,
} from '@/shared/lib/utils/habitHistory'
import { Habit } from '@/shared/types/habit.types'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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
    streak: 30,
    completed: false,
  },
].map((habit) => ({
  ...habit,
  isActive: true,
  history: generateHistoryForHabit(habit),
}))

export function useHabits() {
  const router = useRouter()
  const [habits, setHabits] = useState<Habit[]>(initialHabits)

  const addHabit = (habit: Habit) => {
    const habitWithHistory = {
      ...habit,
      history: habit.history || generateHistoryForHabit(habit),
    }
    setHabits([...habits, habitWithHistory])
  }

  const updateHabit = (updatedHabit: Habit) => {
    setHabits(habits.map((h) => (h.id === updatedHabit.id ? updatedHabit : h)))
  }

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((h) => h.id !== id))
  }

  const completeHabit = (habit: Habit) => {
    const updatedHabit = addHistoryEntry(
      habit,
      habit.current,
      habit.completed || false,
    )
    setHabits(habits.map((h) => (h.id === habit.id ? updatedHabit : h)))
  }

  const viewHabitDetails = (habit: Habit) => {
    router.push(`/dashboard/habits/${habit.id}`)
  }

  return {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    completeHabit,
    viewHabitDetails,
  }
}
