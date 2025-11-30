'use client'

import { cn } from '@/shared/lib/utils/cn'
import { forwardRef, useId } from 'react'
import { inputVariants } from './config'
import type { InputProps } from './types'

export const InputField = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      error,
      errorClassName,
      label,
      labelClassName,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const finalId = id ?? generatedId
    const errorId = `${finalId}-error`
    const hasError = Boolean(error)

    return (
      <div className='w-full space-y-2'>
        {label && (
          <label
            htmlFor={finalId}
            className={cn('text-sm text-white', labelClassName)}
          >
            {label}
          </label>
        )}
        <input
          id={finalId}
          ref={ref}
          className={cn(
            inputVariants({
              variant: hasError ? 'error' : variant,
              inputSize,
              className,
            }),
          )}
          {...props}
        />
        {hasError && (
          <p id={errorId} className={cn('text-red text-xs', errorClassName)}>
            {error}
          </p>
        )}
      </div>
    )
  },
)
