import { Habit } from '@/shared/types/habit.types'
import { Clock, Target } from 'lucide-react'

export const getIcon = (type: Habit['type']) => {
  if (type === 'time') return <Clock className='size-4' />
  if (type === 'count') return <Target className='size-4' />
  return null
}

export const getStreakColorClassName = (hasStreak: boolean): string =>
  hasStreak ? 'text-orange' : 'text-light-gray'

export const formatTimeValue = (totalMinutes: number) => {
  if (!totalMinutes || totalMinutes <= 0) return ''

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours > 0 && minutes > 0) {
    return `${hours} ч ${minutes} мин`
  }

  if (hours > 0) {
    return `${hours} ч`
  }

  return `${minutes} мин`
}
