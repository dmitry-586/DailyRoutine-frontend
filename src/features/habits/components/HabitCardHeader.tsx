'use client'

import Image from 'next/image'
import { FLAME_STAGES } from '../config/flame'
import type { HabitCardHeaderProps } from '../types'
import {
  getCurrentStage,
  getFlameScale,
  getFlameStageStyles,
} from '../utils/flame'
import { formatTimeValue, getIcon } from '../utils/formatters'

export const HabitCardHeader = ({ data }: HabitCardHeaderProps) => {
  const { title, format, value, current_value, unit = '', series } = data
  const hasProgress = format !== 'binary'
  const streak = series || 0
  const currentStage = getCurrentStage(streak, FLAME_STAGES)
  const { bgClassName, borderClassName, textClassName } = getFlameStageStyles(
    currentStage.id,
  )
  const scale = getFlameScale(streak)

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

      <div
        className={`${bgClassName} ${borderClassName} ml-2 flex flex-shrink-0 items-center gap-1.5 rounded border px-2 py-1`}
      >
        <Image
          src={currentStage.iconPath}
          alt={`Огонек ${currentStage.name || currentStage.id}`}
          width={16}
          height={16}
          className='shrink-0 object-contain transition-transform duration-300 ease-out'
          style={{ transform: `scale(${scale})` }}
        />
        <span
          className={`text-xs font-medium transition-transform duration-300 ease-out ${textClassName}`}
          style={{ transform: `scale(${scale})` }}
        >
          {series}
        </span>
      </div>
    </div>
  )
}
