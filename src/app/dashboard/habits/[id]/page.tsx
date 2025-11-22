'use client'

import { HabitDetails } from '@/components/features/habits/HabitDetails'
import type { Habit } from '@/components/features/habits/HabitModal'
import { generateHistoryForHabit } from '@/lib/utils/habitHistory'
import { useParams, useRouter } from 'next/navigation'
import { useMemo } from 'react'

export default function HabitDetailsPage() {
  const router = useRouter()
  const params = useParams()

  // Получаем привычку из localStorage или генерируем mock данные
  const habit = useMemo(() => {
    // Пытаемся получить из localStorage
    if (typeof window !== 'undefined') {
      const storedHabits = localStorage.getItem('habits')
      if (storedHabits) {
        try {
          const habits: Habit[] = JSON.parse(storedHabits)
          const foundHabit = habits.find((h) => h.id === params.id)
          if (foundHabit) {
            // Если истории нет, генерируем её
            if (!foundHabit.history || foundHabit.history.length === 0) {
              foundHabit.history = generateHistoryForHabit(foundHabit)
            }
            return foundHabit
          }
        } catch (e) {
          console.error('Error parsing habits from localStorage:', e)
        }
      }
    }

    // Fallback: генерируем mock привычку на основе ID
    const mockHabit: Habit = {
      id: params.id as string,
      title: `Привычка ${params.id}`,
      type: parseInt(params.id as string) % 2 === 0 ? 'good' : 'bad',
      format: ['time', 'count', 'binary'][parseInt(params.id as string) % 3] as
        | 'time'
        | 'count'
        | 'binary',
      current: 25,
      target: 30,
      unit: 'мин',
      streak: 7,
      completed: false,
    }

    mockHabit.history = generateHistoryForHabit(mockHabit)
    return mockHabit
  }, [params.id])

  const handleBack = () => {
    router.push('/dashboard/habits')
  }

  return <HabitDetails habit={habit} onBack={handleBack} />
}
