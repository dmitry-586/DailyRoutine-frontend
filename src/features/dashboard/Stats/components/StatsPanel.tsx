'use client'

import { Award, Flame, Target, TrendingUp } from 'lucide-react'
import { StatsField } from './StatsField'

interface StatsPanelProps {
  totalHabits: number
  completedToday: number
  currentStreak: number
  dailyCoins: number
}

export function StatsPanel({
  totalHabits,
  completedToday,
  currentStreak,
  dailyCoins,
}: StatsPanelProps) {
  const completionRate =
    totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0

  return (
    <div className='bg-gray grid shrink-0 gap-3 rounded-lg p-4 max-xl:grid-cols-2 max-xl:gap-x-6 max-sm:grid-cols-1'>
      <StatsField
        title='Текущая серия'
        icon={<Flame className='text-orange h-4 w-4' />}
        value={`${currentStreak} дней`}
        iconColor='bg-orange/10'
      />
      <StatsField
        title='Выполнено сегодня'
        icon={<Target className='text-primary h-4 w-4' />}
        value={`${completedToday}/${totalHabits}`}
        iconColor='bg-primary/10'
      />
      <StatsField
        title='Общий прогресс'
        icon={<TrendingUp className='text-green h-4 w-4' />}
        value={`${completionRate}%`}
        iconColor='bg-green/10'
      />
      <StatsField
        title='Дейлики'
        icon={<Award className='text-primary h-4 w-4' />}
        value={`${dailyCoins}`}
        valueClassName='text-primary'
        iconColor='bg-primary/10'
      />
    </div>
  )
}
