'use client'

import { cn } from '@/shared/lib/utils/cn'

import { selectStyles } from '../config'
import type { SelectOption } from '../types'

interface SelectDropdownProps {
  isOpen: boolean
  openDirection: 'up' | 'down'
  options: SelectOption[]
  currentValue: string
  onSelect: (value: string) => void
  onClose: () => void
}

export const SelectDropdown = ({
  isOpen,
  openDirection,
  options,
  currentValue,
  onSelect,
  onClose,
}: SelectDropdownProps) => {
  if (!isOpen) return null

  return (
    <>
      <div className={selectStyles.overlay} onClick={onClose} />
      <div
        className={cn(
          selectStyles.dropdown,
          openDirection === 'up'
            ? selectStyles.dropdownTop
            : selectStyles.dropdownBottom,
        )}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type='button'
            onClick={() => onSelect(option.value)}
            className={cn(
              selectStyles.option,
              currentValue === option.value
                ? selectStyles.optionActive
                : selectStyles.optionIdle,
            )}
            title={option.label}
          >
            <span className={selectStyles.optionLabel}>{option.label}</span>
          </button>
        ))}
      </div>
    </>
  )
}
