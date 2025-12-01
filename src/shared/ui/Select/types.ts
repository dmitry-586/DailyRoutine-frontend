import type { SelectHTMLAttributes } from 'react'

import type { SelectVariantProps } from './config'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps
  extends
    Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    SelectVariantProps {
  options: SelectOption[]
  label?: string
  labelClassName?: string
  placeholder?: string
}

export type { SelectVariantProps }
