'use client'

import { cn } from '@/shared/lib/utils'
import { tabsStyles } from './config'
import type { TabsTriggerProps } from './types'

export const TabsTrigger = ({
  active = false,
  variant = 'default',
  className,
  ...props
}: TabsTriggerProps) => (
  <button
    type='button'
    role='tab'
    aria-selected={active}
    data-state={active ? 'active' : 'inactive'}
    className={cn(
      tabsStyles.trigger.base,
      tabsStyles.trigger.variants[variant],
      className,
    )}
    {...props}
  />
)
