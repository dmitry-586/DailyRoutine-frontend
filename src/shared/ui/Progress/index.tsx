'use client'

import { cn } from '@/shared/lib/utils/cn'
import { progressStyles } from './config'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  indicatorClassName?: string
}

export function Progress({
  className,
  value = 0,
  indicatorClassName,
  ...props
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={cn(progressStyles.root, className)} {...props}>
      <div
        className={cn(progressStyles.indicator, indicatorClassName)}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
