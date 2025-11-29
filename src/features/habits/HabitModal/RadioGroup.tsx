'use client'

import { Radio } from '@/shared/ui/Radio'
import { UseFormRegisterReturn } from 'react-hook-form'

interface RadioOption {
  value: string
  label: string
  description?: string
}

interface RadioGroupProps {
  label: string
  options: readonly RadioOption[]
  currentValue?: string
  defaultValue?: string
  register: () => UseFormRegisterReturn
  className?: string
}

export function RadioGroup({
  label,
  options,
  currentValue,
  defaultValue,
  register,
  className,
}: RadioGroupProps) {
  const value = currentValue ?? defaultValue ?? options[0]?.value ?? ''

  return (
    <div className={className}>
      <label className='text-sm'>{label}</label>
      <div className='mt-2 space-y-2'>
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            label={option.label}
            description={option.description}
            checked={value === option.value}
            className='hover:border-primary/50'
            {...register()}
          />
        ))}
      </div>
    </div>
  )
}
