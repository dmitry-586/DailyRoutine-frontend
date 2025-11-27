'use client'

import { cn } from '@/shared/lib/utils/cn'
import { radioGroupStyles } from './config'

interface RadioGroupItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export function RadioGroupItem({
  className,
  disabled,
  checked,
  ...props
}: RadioGroupItemProps) {
  return (
    <span className={radioGroupStyles.wrapper}>
      <input
        type='radio'
        checked={checked}
        disabled={disabled}
        className={radioGroupStyles.input}
        {...props}
      />
      <span
        aria-hidden
        data-state={checked ? 'checked' : 'unchecked'}
        className={cn(
          radioGroupStyles.item,
          checked && radioGroupStyles.checked,
          disabled && radioGroupStyles.disabled,
          className,
        )}
      >
        <span
          className={cn(
            radioGroupStyles.indicator,
            checked && radioGroupStyles.indicatorChecked,
          )}
        />
      </span>
    </span>
  )
}
