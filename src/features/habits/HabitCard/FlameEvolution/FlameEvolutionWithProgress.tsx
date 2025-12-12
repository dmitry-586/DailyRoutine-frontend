'use client'

import { cn } from '@/shared/lib'
import { FLAME_STAGES } from './config'
import type { FlameEvolutionProps } from './types'
import { getCurrentStage, getProgressToNextStage } from './utils'

interface FlameEvolutionWithProgressProps extends FlameEvolutionProps {
  /** Показывать ли прогресс-бар до следующего этапа */
  showProgress?: boolean
  /** Показывать ли название текущего этапа */
  showStageName?: boolean
}

export function FlameEvolutionWithProgress({
  streak,
  className,
  size = 48,
  showProgress = true,
  showStageName = false,
}: FlameEvolutionWithProgressProps) {
  const currentStage = getCurrentStage(streak, FLAME_STAGES)
  const progressToNext = getProgressToNextStage(
    streak,
    currentStage,
    FLAME_STAGES,
  )

  const currentIndex = FLAME_STAGES.findIndex((s) => s.id === currentStage.id)
  const isMaxStage = currentIndex === FLAME_STAGES.length - 1
  const nextStage = !isMaxStage ? FLAME_STAGES[currentIndex + 1] : null

  const daysToNext = nextStage ? nextStage.threshold - streak : 0

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className='flex items-center justify-center'>
        <img
          src={currentStage.iconPath}
          alt={`Огонек ${currentStage.name || currentStage.id}`}
          width={size}
          height={size}
          className='object-contain'
          style={{ width: size, height: size }}
        />
      </div>

      {showStageName && currentStage.name && (
        <span className='text-sm font-medium text-white'>
          {currentStage.name}
        </span>
      )}

      {showProgress && !isMaxStage && nextStage && (
        <div className='w-full max-w-[200px]'>
          <div className='mb-1 flex items-center justify-between text-xs text-gray-400'>
            <span>Прогресс</span>
            <span>{progressToNext}%</span>
          </div>
          <div className='bg-gray/30 h-2 w-full overflow-hidden rounded-full'>
            <div
              className='bg-primary h-full transition-all duration-300'
              style={{ width: `${progressToNext}%` }}
            />
          </div>
          <div className='mt-1 text-xs text-gray-500'>
            До следующего этапа: {daysToNext}{' '}
            {daysToNext === 1 ? 'день' : daysToNext < 5 ? 'дня' : 'дней'}
          </div>
        </div>
      )}

      {showProgress && isMaxStage && (
        <div className='text-primary text-xs font-medium'>
          Максимальный уровень достигнут! 🔥
        </div>
      )}
    </div>
  )
}
