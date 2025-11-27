'use client'

import { cn } from '@/shared/lib/utils/cn'
import { tabsStyles } from './config'

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TabsList({ className, ...props }: TabsListProps) {
  return (
    <div role='tablist' className={cn(tabsStyles.list, className)} {...props} />
  )
}

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

export function TabsTrigger({
  active = false,
  className,
  ...props
}: TabsTriggerProps) {
  return (
    <button
      type='button'
      role='tab'
      aria-selected={active}
      data-state={active ? 'active' : 'inactive'}
      className={cn(tabsStyles.trigger, className)}
      {...props}
    />
  )
}
