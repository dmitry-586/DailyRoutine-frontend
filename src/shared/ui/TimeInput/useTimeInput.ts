'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import { timeInputLimits } from './config'
import type { TimeInputProps } from './types'

const sanitizeSegment = (value: string, limit: number) => {
  let result = value

  if (result.length > 1 && result.startsWith('0')) {
    result = result.replace(/^0+/, '') || '0'
  }

  if (
    result !== '' &&
    (!/^\d{1,2}$/.test(result) || parseInt(result, 10) > limit)
  ) {
    return null
  }

  return result
}

const splitMinutes = (value: string) => {
  const total = parseInt(value, 10) || 0
  return {
    hours: Math.floor(total / 60),
    minutes: total % 60,
  }
}

export const useTimeInput = ({
  value = '0',
  onChange,
  name,
}: Pick<TimeInputProps, 'value' | 'onChange' | 'name'>) => {
  const { hours, minutes } = splitMinutes(value)

  const [hoursInput, setHoursInput] = useState(hours.toString())
  const [minutesInput, setMinutesInput] = useState(minutes.toString())
  const prevValueRef = useRef(value)

  useEffect(() => {
    if (prevValueRef.current !== value) {
      prevValueRef.current = value
      const next = splitMinutes(value)
      setHoursInput(next.hours.toString())
      setMinutesInput(next.minutes.toString())
    }
  }, [value])

  const emitChange = useCallback(
    (newTotal: number) => {
      if (!onChange) return

      const syntheticEvent = {
        target: { value: newTotal.toString(), name },
      } as ChangeEvent<HTMLInputElement>
      onChange(syntheticEvent)
    },
    [name, onChange],
  )

  const handleSegmentChange = useCallback(
    (isHours: boolean) => (event: ChangeEvent<HTMLInputElement>) => {
      const limit = isHours ? timeInputLimits.hours : timeInputLimits.minutes
      const nextValue = sanitizeSegment(event.target.value, limit)

      if (nextValue === null) return

      const nextNumber = nextValue === '' ? 0 : parseInt(nextValue, 10)
      const currentHours = isHours ? nextNumber : parseInt(hoursInput, 10) || 0
      const currentMinutes = !isHours
        ? nextNumber
        : parseInt(minutesInput, 10) || 0

      const total = currentHours * 60 + currentMinutes

      if (isHours) {
        setHoursInput(nextValue)
      } else {
        setMinutesInput(nextValue)
      }

      emitChange(total)
    },
    [emitChange, hoursInput, minutesInput],
  )

  return {
    hoursInput,
    minutesInput,
    setHoursInput,
    setMinutesInput,
    handleSegmentChange,
  }
}
