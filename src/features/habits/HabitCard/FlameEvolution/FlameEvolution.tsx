'use client'

import { cn } from '@/shared/lib'
import { FLAME_STAGES } from './config'
import type { FlameEvolutionProps } from './types'
import { getCurrentStage, getFlameScale } from './utils'

export function FlameEvolution({
  streak,
  className,
  size = 48,
}: FlameEvolutionProps) {
  const currentStage = getCurrentStage(streak, FLAME_STAGES)
  const scale = getFlameScale(streak)

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <img
        src={currentStage.iconPath}
        alt={`Огонек ${currentStage.name || currentStage.id}`}
        width={size}
        height={size}
        className='object-contain transition-transform duration-300 ease-out'
        style={{
          width: size,
          height: size,
          transform: `scale(${scale})`,
        }}
      />
    </div>
  )
}
