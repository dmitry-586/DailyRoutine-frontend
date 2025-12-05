'use client'

import { cn } from '@/shared/lib/utils'

import { selectStyles } from '../config'

interface SelectLabelProps {
  htmlFor: string
  label?: string
  className?: string
}

export const SelectLabel = ({
  htmlFor,
  label,
  className,
}: SelectLabelProps) => {
  if (!label) return null

  return (
    <label htmlFor={htmlFor} className={cn(selectStyles.label, className)}>
      {label}
    </label>
  )
}
