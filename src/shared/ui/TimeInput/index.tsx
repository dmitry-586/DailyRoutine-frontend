'use client'

import { cn } from '@/shared/lib/utils/cn'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { inputVariants } from '../Input/config'

interface TimeInputProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  name?: string
  error?: string
  label?: string
  disabled?: boolean
}

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  ({ value = '0', onChange, onBlur, name, error, label, disabled }, ref) => {
    const totalMinutes = parseInt(value, 10)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    const [hoursInput, setHoursInput] = useState(hours.toString())
    const [minutesInput, setMinutesInput] = useState(minutes.toString())
    const prevValueRef = useRef(value)

    useEffect(() => {
      if (prevValueRef.current !== value) {
        prevValueRef.current = value
        setHoursInput(hours.toString())
        setMinutesInput(minutes.toString())
      }
    }, [value, hours, minutes])

    const handleChange =
      (isHours: boolean, max: number) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value

        if (val.length > 1 && val.startsWith('0')) {
          val = val.replace(/^0+/, '') || '0'
        }

        if (val !== '' && (!/^\d{1,2}$/.test(val) || parseInt(val, 10) > max)) {
          return
        }

        const num = val === '' ? 0 : parseInt(val, 10)
        const newTotal = isHours ? num * 60 + minutes : hours * 60 + num

        isHours ? setHoursInput(val) : setMinutesInput(val)

        if (onChange) {
          const syntheticEvent = {
            target: { value: newTotal.toString(), name },
          } as React.ChangeEvent<HTMLInputElement>
          onChange(syntheticEvent)
        }
      }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value, name },
        } as React.FocusEvent<HTMLInputElement>
        onBlur(syntheticEvent)
      }
    }

    const inputClass = cn(
      inputVariants({ variant: error ? 'error' : 'default' }),
      'text-center',
    )

    return (
      <div className='space-y-2'>
        <input ref={ref} type='hidden' name={name} value={value} readOnly />
        {label && <label className='block text-sm text-white'>{label}</label>}
        <div className='flex items-center gap-2'>
          <div className='relative flex-1'>
            <input
              type='text'
              inputMode='numeric'
              value={hoursInput}
              onChange={handleChange(true, 23)}
              onBlur={handleBlur}
              disabled={disabled}
              placeholder='0'
              className={inputClass}
              aria-label='Часы'
            />
            <span className='text-light-gray/50 pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm'>
              ч
            </span>
          </div>

          <span className='text-light-gray/50'>:</span>

          <div className='relative flex-1'>
            <input
              type='text'
              inputMode='numeric'
              value={minutesInput}
              onChange={handleChange(false, 59)}
              onBlur={handleBlur}
              disabled={disabled}
              placeholder='0'
              className={inputClass}
              aria-label='Минуты'
            />
            <span className='text-light-gray/50 pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm'>
              мин
            </span>
          </div>
        </div>

        {error && <p className='text-red text-xs'>{error}</p>}
      </div>
    )
  },
)

TimeInput.displayName = 'TimeInput'
