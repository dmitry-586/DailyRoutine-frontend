'use client'

import { cn } from '@/shared/lib/utils/cn'
import { ChevronDown } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'
import type { SelectVariantProps } from '../config'
import { selectStyles, selectVariants } from '../config'

interface SelectTriggerProps extends ComponentPropsWithoutRef<'button'> {
  isOpen: boolean
  hasValue: boolean
  placeholder?: string
  selectedLabel?: string
  variant?: SelectVariantProps['variant']
  size?: SelectVariantProps['size']
}

export const SelectTrigger = ({
  className,
  isOpen,
  hasValue,
  placeholder = 'Выберите...',
  selectedLabel,
  variant,
  size,
  disabled,
  ...props
}: SelectTriggerProps) => (
  <button
    type='button'
    disabled={disabled}
    className={cn(
      selectVariants({ variant, size }),
      selectStyles.trigger,
      className,
    )}
    {...props}
  >
    <span className={hasValue ? selectStyles.value : selectStyles.placeholder}>
      {selectedLabel || placeholder}
    </span>
    <ChevronDown className={cn(selectStyles.chevron, isOpen && 'rotate-180')} />
  </button>
)
