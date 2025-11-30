import type { ChangeEvent, FocusEvent } from 'react'

export interface TimeInputProps {
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void
  name?: string
  error?: string
  label?: string
  disabled?: boolean
}
