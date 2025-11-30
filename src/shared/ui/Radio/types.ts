import type { InputHTMLAttributes, ReactNode } from 'react'

import type { RadioVariantProps } from './config'

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
    RadioVariantProps {
  label?: ReactNode
  labelClassName?: string
  description?: ReactNode
  descriptionClassName?: string
}

export type { RadioVariantProps }
