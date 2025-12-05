'use client'

import { cn } from '@/shared/lib/utils'

import { switchStyles } from './config'
import type { SwitchProps } from './types'

export const Switch = ({
  className,
  checked = false,
  onCheckedChange,
  disabled,
  ...props
}: SwitchProps) => (
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
