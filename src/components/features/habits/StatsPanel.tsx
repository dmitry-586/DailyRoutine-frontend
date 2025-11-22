'use client'

import { Card } from '@/components/ui/Card'
import { Award, Flame, Target, TrendingUp } from 'lucide-react'

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
    <div className='space-y-4'>
      <Card className='bg-gray border-none p-4'>
        <div className='space-y-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='bg-primary/10 rounded-lg p-2'>
                <Target className='text-primary h-4 w-4' />
              </div>
              <span className='text-light-gray text-sm'>Выполнено сегодня</span>
            </div>
            <span className='font-semibold text-white'>
              {completedToday}/{totalHabits}
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='bg-orange/10 rounded-lg p-2'>
                <Flame className='text-orange h-4 w-4' />
              </div>
              <span className='text-light-gray text-sm'>Текущая серия</span>
            </div>
            <span className='font-semibold text-white'>
              {currentStreak} дней
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='bg-green/10 rounded-lg p-2'>
                <TrendingUp className='text-green h-4 w-4' />
              </div>
              <span className='text-light-gray text-sm'>Общий прогресс</span>
            </div>
            <span className='font-semibold text-white'>{completionRate}%</span>
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='bg-primary/10 rounded-lg p-2'>
                <Award className='text-primary h-4 w-4' />
              </div>
              <span className='text-light-gray text-sm'>Дейлики</span>
            </div>
            <span className='text-primary font-semibold'>{dailyCoins}</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
