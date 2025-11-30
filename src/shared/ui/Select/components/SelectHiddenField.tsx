'use client'

import type { ChangeEventHandler, FocusEventHandler, RefObject } from 'react'

import type { SelectOption } from '../types'

interface SelectHiddenFieldProps {
  id: string
  name?: string
  value: string
  onChange?: ChangeEventHandler<HTMLSelectElement>
  onBlur?: FocusEventHandler<HTMLSelectElement>
  options: SelectOption[]
  selectRef: RefObject<HTMLSelectElement>
}

export const SelectHiddenField = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  options,
  selectRef,
}: SelectHiddenFieldProps) => (
  <select
    id={id}
    ref={selectRef}
    name={name}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    className='sr-only'
    tabIndex={-1}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
)
