'use client'

import { cn } from '@/shared/lib/utils/cn'
import { switchStyles } from './config'

interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function Switch({
  className,
  checked = false,
  onCheckedChange,
  disabled,
  ...props
}: SwitchProps) {
  return (
    <button
      type='button'
      role='switch'
      aria-checked={checked}
      data-state={checked ? 'checked' : 'unchecked'}
      disabled={disabled}
      className={cn(
        switchStyles.base,
        checked ? switchStyles.checked : switchStyles.unchecked,
        disabled && switchStyles.disabled,
        className,
      )}
      onClick={() => onCheckedChange?.(!checked)}
      {...props}
    >
      <span
        className={cn(
          switchStyles.thumb,
          checked ? switchStyles.thumbChecked : switchStyles.thumbUnchecked,
        )}
      />
    </button>
  )
}
