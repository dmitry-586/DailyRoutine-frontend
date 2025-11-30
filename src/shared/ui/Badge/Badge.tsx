'use client'

import { cn } from '@/shared/lib/utils/cn'

import { badgeVariants } from './config'
import type { BadgeProps } from './types'

export const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props} />
)
