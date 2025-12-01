import { Target } from 'lucide-react'
import { getDailyFocusMessage } from './config'

interface DailyFocusCardProps {
  totalHabits: number
  completedToday: number
}

export function DailyFocusCard({
  totalHabits,
  completedToday,
}: DailyFocusCardProps) {
  const hasHabits = totalHabits > 0
  const completionRate = hasHabits
    ? Math.round((completedToday / totalHabits) * 100)
    : 0

  const message = getDailyFocusMessage(totalHabits, completedToday)

  return (
    <div className='bg-gray/80 flex flex-col gap-3 rounded-xl p-5'>
      <div className='flex gap-3'>
        <div className='flex size-11 shrink-0 items-center justify-center rounded-full bg-purple-500/10'>
          <Target className='size-6 text-purple-400' />
        </div>
        <div className='flex flex-col text-left'>
          <span className='text-light-gray text-xs font-medium tracking-wide uppercase'>
            Ежедневный фокус
          </span>
          <span className='text-sm text-gray-100'>{message}</span>
        </div>
      </div>

      {hasHabits && (
        <div className='flex items-center justify-between text-xs'>
          <span className='text-light-gray'>
            Сегодня выполнено{' '}
            <span className='font-semibold text-gray-100'>
              {completedToday}/{totalHabits}
            </span>
          </span>
          <span className='rounded-full bg-purple-500/10 px-2 py-1 font-medium text-purple-300'>
            {completionRate}% сегодня
          </span>
        </div>
      )}
    </div>
  )
}
