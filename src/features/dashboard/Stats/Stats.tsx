import { useHabits } from '@/shared/model/hooks/useHabits'
import { DailyFocusCard } from './components/DailyFocusCard'
import { StatsPanel } from './components/StatsPanel'

export function Stats() {
  const { data: habits = [] } = useHabits()
  const completedToday = habits.filter((h) => h.is_done).length
  const activeHabits = habits.filter((h) => h.is_active !== false)

  return (
    <div className='max-w-[300px] shrink-0 max-xl:max-w-full max-md:w-full'>
      <h3 className='mb-4 flex h-9 w-full items-center justify-center text-lg font-semibold text-white max-xl:justify-start'>
        Статистика
      </h3>
      <div className='flex flex-col gap-4 max-xl:w-fit max-sm:w-full'>
        <StatsPanel
          totalHabits={activeHabits.length}
          completedToday={completedToday}
          currentStreak={7}
          dailyCoins={340}
        />

        <DailyFocusCard
          totalHabits={activeHabits.length}
          completedToday={completedToday}
        />
      </div>
    </div>
  )
}
