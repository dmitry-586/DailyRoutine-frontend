'use client'

import { cn } from '@/shared/lib/utils/cn'
import * as React from 'react'
import { inputVariants, type InputVariantProps } from './config'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<InputVariantProps, 'size'> {
  error?: string
  label?: string
  labelClassName?: string
  errorClassName?: string
  inputSize?: InputVariantProps['inputSize']
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
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
    const hasError = !!error
    const inputId = React.useId()
    const finalId = id || inputId
    const errorId = `${finalId}-error`

    return (
      <div className='w-full space-y-2'>
        {label && (
          <label
            htmlFor={finalId}
            className={cn(
              'block text-sm text-white',
              labelClassName,
            )}
          >
            {label}
          </label>
        )}
        <input
          id={finalId}
          className={cn(
            inputVariants({
              variant: hasError ? 'error' : variant,
              inputSize,
              className,
            }),
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p
            id={errorId}
            className={cn('text-red text-xs', errorClassName)}
            role='alert'
          >
            {error}
          </p>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input, inputVariants }
export type { InputVariantProps }
