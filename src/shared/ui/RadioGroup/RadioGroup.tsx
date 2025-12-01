'use client'

import { cn } from '@/shared/lib/utils/cn'
import { Radio } from '@/shared/ui/Radio'
import type { ChangeEvent } from 'react'
import { RadioGroupProps } from './types'

export const RadioGroup = ({
  label,
  options,
  value,
  currentValue,
  defaultValue,
  onValueChange,
  register,
  name,
  className,
  groupClassName,
  radioClassName,
}: RadioGroupProps) => {
  const selectedValue =
    currentValue ?? value ?? defaultValue ?? options[0]?.value ?? ''
  const registerResult = register?.()

  const handleChange =
    (optionValue: string) => (event: ChangeEvent<HTMLInputElement>) => {
      registerResult?.onChange(event)
      onValueChange?.(optionValue)
    }

  return (
    <div className={className}>
      {label && <label className='text-sm'>{label}</label>}
      <div className={cn('mt-2 space-y-2', groupClassName)}>
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            label={option.label}
            description={option.description}
            checked={selectedValue === option.value}
            disabled={option.disabled}
            className={cn(
              'hover:border-primary/50 cursor-pointer',
              radioClassName,
            )}
            name={registerResult?.name ?? name}
            onBlur={registerResult?.onBlur}
            onChange={handleChange(option.value)}
            ref={registerResult?.ref}
          />
        ))}
      </div>
    </div>
  )
}
