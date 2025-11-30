'use client'

import { cn } from '@/shared/lib/utils/cn'

import { tabsStyles } from './config'
import type { TabsListProps } from './types'

export const TabsList = ({ className, ...props }: TabsListProps) => (
  <div role='tablist' className={cn(tabsStyles.list, className)} {...props} />
)
