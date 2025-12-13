'use client'

import { cn } from '@/shared/lib/utils'
import { ProgressProps } from './types'

export const Progress = ({
  className,
  value = 0,
  indicatorClassName,
  ...props
}: ProgressProps) => {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div
      className={cn(
        'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'bg-primary h-full w-full flex-1 transition-all',
          indicatorClassName,
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
