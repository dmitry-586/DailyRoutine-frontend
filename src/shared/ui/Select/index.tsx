'use client'

import { cn } from '@/shared/lib/utils/cn'
import { ChevronDown } from 'lucide-react'
import { selectStyles } from './config'

interface SelectOption {
  label: string
  value: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
  onValueChange?: (value: string) => void
  wrapperClassName?: string
}

export function Select({
  className,
  options,
  onValueChange,
  wrapperClassName,
  disabled,
  ...props
}: SelectProps) {
  return (
    <div className={cn(selectStyles.wrapper, wrapperClassName)}>
      <select
        className={cn(
          selectStyles.base,
          disabled && selectStyles.disabled,
          className,
        )}
        disabled={disabled}
        onChange={(e) => {
          props.onChange?.(e)
          onValueChange?.(e.target.value)
        }}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className={selectStyles.icon} aria-hidden />
    </div>
  )
}
