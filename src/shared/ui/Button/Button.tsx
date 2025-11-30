'use client'

import * as React from 'react'

import { cn } from '@/shared/lib/utils/cn'

import { buttonVariants } from './config'
import type { ButtonProps } from './types'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  ),
)

Button.displayName = 'Button'
