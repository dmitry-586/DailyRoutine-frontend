'use client'

import { cn } from '@/shared/lib/utils/cn'
import { forwardRef, type FocusEvent } from 'react'
import { inputVariants } from '../Input/config'
import { timeInputStyles } from './config'
import type { TimeInputProps } from './types'
import { useTimeInput } from './useTimeInput'

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  ({ value = '0', onChange, onBlur, name, error, label, disabled }, ref) => {
    const { hoursInput, minutesInput, handleSegmentChange } = useTimeInput({
      value,
      onChange,
      name,
    })

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value, name },
        } as FocusEvent<HTMLInputElement>
        onBlur(syntheticEvent)
      }
    }

    const inputClass = cn(
      inputVariants({ variant: error ? 'error' : 'default' }),
      'text-center',
    )

    return (
      <div className={timeInputStyles.wrapper}>
        <input ref={ref} type='hidden' name={name} value={value} readOnly />
        {label && <label className={timeInputStyles.label}>{label}</label>}
        <div className={timeInputStyles.fields}>
          <div className={timeInputStyles.fieldWrapper}>
            <input
              type='text'
              inputMode='numeric'
              value={hoursInput}
              onChange={handleSegmentChange(true)}
              onBlur={handleBlur}
              disabled={disabled}
              placeholder='0'
              className={inputClass}
            />
            <span className={timeInputStyles.suffix}>ч</span>
          </div>

          <span className={timeInputStyles.colon}>:</span>

          <div className={timeInputStyles.fieldWrapper}>
            <input
              type='text'
              inputMode='numeric'
              value={minutesInput}
              onChange={handleSegmentChange(false)}
              onBlur={handleBlur}
              disabled={disabled}
              placeholder='0'
              className={inputClass}
            />
            <span className={timeInputStyles.suffix}>мин</span>
          </div>
        </div>

        {error && <p className={timeInputStyles.error}>{error}</p>}
      </div>
    )
  },
)

TimeInput.displayName = 'TimeInput'
