import { Flame } from 'lucide-react'
import { formatTimeValue, getIcon, getStreakColorClassName } from '../helpers'
import type { HabitCardHeaderProps } from '../types'

export const HabitCardHeader = ({ data }: HabitCardHeaderProps) => {
  const { title, format, value, current_value, unit = '', series } = data
  const streakColorClassName = getStreakColorClassName(series > 0)
  const hasProgress = format !== 'binary'

  return (
    <div className='mb-3 flex items-start justify-between'>
      <div className='min-w-0 flex-1'>
        <h3 className='mb-1 truncate text-base font-medium text-white'>
          {title}
        </h3>
        {hasProgress && (
          <div className='text-light-gray flex items-center gap-2 text-xs'>
            {getIcon(format)}
            <span>
              {current_value}/
              {format === 'time'
                ? formatTimeValue(value)
                : `${value} ${unit ?? ''}`}
            </span>
          </div>
        )}
      </div>

      <div className='border-orange/20 bg-orange/10 ml-2 flex flex-shrink-0 items-center gap-1 rounded border px-2 py-1'>
        <Flame className={`size-3.5 ${streakColorClassName}`} />
        <span className={`text-xs font-medium ${streakColorClassName}`}>
          {series}
        </span>
      </div>
    </div>
  )
}
