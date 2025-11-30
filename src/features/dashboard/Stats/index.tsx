import { useHabits } from '@/shared/lib/hooks/useHabits'
import { StatsPanel } from './StatsPanel'

export function Stats() {
  const { habits } = useHabits()
  const completedToday = habits.filter((h) => h.completed).length
  const activeHabits = habits.filter((h) => h.isActive !== false)

  return (
    <div className='w-max shrink-0 max-md:w-full'>
      <h3 className='mb-4 flex h-9 w-full items-center justify-center text-lg font-semibold text-white max-md:justify-start'>
        Статистика
      </h3>
      <div className='gap-4 max-md:flex max-sm:flex-col'>
        <StatsPanel
          totalHabits={activeHabits.length}
          completedToday={completedToday}
          currentStreak={7}
          dailyCoins={340}
        />

        <div className='bg-gray mt-4 rounded-xl p-6 text-center max-md:mt-0'>
          <p className='text-light-gray mb-4 text-sm'>
            Продолжайте в том же духе!
          </p>
          <div className='mb-2 text-4xl'>🎯</div>
          <p className='font-semibold text-white'>
            {completedToday} из {activeHabits.length} привычек выполнено
          </p>
        </div>
      </div>
    </div>
  )
}
