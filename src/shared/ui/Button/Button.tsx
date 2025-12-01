'use client'

import { forwardRef } from 'react'
import { cn } from '@/shared/lib/utils/cn'
import { buttonVariants } from './config'
import type { ButtonProps } from './types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
)

Button.displayName = 'Button'
