'use client'

import { cn } from '@/shared/lib/utils/cn'
import { type VariantProps } from 'class-variance-authority'
import { badgeVariants } from './config'

interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}
