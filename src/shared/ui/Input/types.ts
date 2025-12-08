import type { InputHTMLAttributes } from 'react'
import type { InputVariantProps } from './config'

export interface InputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<InputVariantProps, 'inputSize'> {
  error?: string
  label?: string
  labelClassName?: string
  errorClassName?: string
  wrapperClassName?: string
  inputSize?: InputVariantProps['inputSize']
}

export type { InputVariantProps }
