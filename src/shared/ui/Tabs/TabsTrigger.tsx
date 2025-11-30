'use client'

import { cn } from '@/shared/lib/utils/cn'

import { tabsStyles } from './config'
import type { TabsTriggerProps } from './types'

export const TabsTrigger = ({
  active = false,
  className,
  ...props
}: TabsTriggerProps) => (
  <button
    type='button'
    role='tab'
    aria-selected={active}
    data-state={active ? 'active' : 'inactive'}
    className={cn(tabsStyles.trigger, className)}
    {...props}
  />
)
