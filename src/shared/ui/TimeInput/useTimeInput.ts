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
  const numeric = value.replace(/[^\d]/g, '')

  if (numeric === '') {
    return ''
  }

  const parsed = Number.parseInt(numeric, 10)

  if (Number.isNaN(parsed) || parsed < 0) {
    return ''
  }

  const clamped = Math.min(parsed, limit)

  return clamped.toString()
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
      const numeric = event.target.value.replace(/[^\d]/g, '')
      const rawNumber = numeric === '' ? 0 : Number.parseInt(numeric, 10) || 0
      const nextValue = sanitizeSegment(event.target.value, limit)

      const currentHours = isHours ? rawNumber : parseInt(hoursInput, 10) || 0
      const currentMinutes = !isHours
        ? rawNumber
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
