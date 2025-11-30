import { UseFormRegisterReturn } from 'react-hook-form'

export interface RadioGroupOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  label?: string
  options: readonly RadioGroupOption[]
  value?: string
  currentValue?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  register?: () => UseFormRegisterReturn
  name?: string
  className?: string
  groupClassName?: string
  radioClassName?: string
}