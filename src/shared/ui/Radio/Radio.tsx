'use client'

import * as React from 'react'

import { cn } from '@/shared/lib/utils'

import { radioIndicatorVariants, radioVariants } from './config'
import type { RadioProps } from './types'

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      className,
      variant,
      size,
      label,
      labelClassName,
      description,
      descriptionClassName,
      id,
      checked,
      disabled,
      ...props
    },
    ref,
  ) => {
    const radioId = React.useId()
    const finalId = id || radioId

    return (
      <label
        htmlFor={finalId}
        className={cn(
          'group bg-muted/20 flex w-full items-center gap-3 rounded-xl border-2 p-3 transition-all duration-200',
          checked
            ? 'border-primary/80 bg-primary/5 shadow-primary/20'
            : 'border-light-gray/20',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
      >
        <span className='relative mt-1 inline-flex items-center'>
          <input
            type='radio'
            id={finalId}
            checked={checked}
            disabled={disabled}
            className='peer sr-only'
            ref={ref}
            {...props}
          />
          <span
            className={cn(
              radioVariants({ variant, size }),
              checked &&
                (variant === 'error'
                  ? 'border-red bg-red/10'
                  : 'border-primary bg-primary/10'),
            )}
          >
            <span
              className={cn(
                radioIndicatorVariants({ size }),
                checked && 'opacity-100',
              )}
            />
          </span>
        </span>
        <div>
          {label && (
            <span className={cn('text-sm font-medium', labelClassName)}>
              {label}
            </span>
          )}
          {description && (
            <p className={cn('text-light-gray text-xs', descriptionClassName)}>
              {description}
            </p>
          )}
        </div>
      </label>
    )
  },
)

Radio.displayName = 'Radio'
