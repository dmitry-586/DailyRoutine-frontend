import { Habit } from '@/shared/types/habit.types'
import { StatsPanel } from './StatsPanel'

interface StatsProps {
  habits: Habit[]
}

export function Stats({ habits }: StatsProps) {
  const completedToday = habits.filter((h) => h.completed).length
  return (
    <div className='w-max shrink-0'>
      <h3 className='mb-4 flex h-9 w-full items-center justify-center text-lg font-semibold text-white'>
        Статистика
      </h3>
      <StatsPanel
        totalHabits={habits.filter((h) => h.isActive !== false).length}
        completedToday={completedToday}
        currentStreak={7}
        dailyCoins={340}
      />

      <div className='bg-gray mt-4 rounded-xl p-6 text-center'>
        <p className='text-light-gray mb-4 text-sm'>
          Продолжайте в том же духе!
        </p>
        <div className='mb-2 text-4xl'>🎯</div>
        <p className='font-semibold text-white'>
          {completedToday} из{' '}
          {habits.filter((h) => h.isActive !== false).length} привычек выполнено
        </p>
      </div>
    </div>
  )
}
