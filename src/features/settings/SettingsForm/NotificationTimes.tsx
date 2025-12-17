'use client'

import { Button, TimeInput } from '@/shared/ui'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import z from 'zod'
import { TimeTag } from './TimeTag'

interface NotificationTimesProps {
  times: string[]
  onChange: (times: string[]) => void
  disabled?: boolean
}

const notificationTimeSchema = z
  .string()
  .regex(
    /^([01]\d|2[0-3]):([0-5]\d)$/,
    'Введите время в формате ЧЧ:ММ (24 часа)',
  )

const minutesToTimeString = (minutesValue: string): string => {
  const total = Number.parseInt(minutesValue, 10)

  if (Number.isNaN(total) || total < 0) {
    return ''
  }

  const hours = Math.floor(total / 60)
  const minutes = total % 60

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`
}

export function NotificationTimes({
  times,
  onChange,
  disabled = false,
}: NotificationTimesProps) {
  const [timeMinutes, setTimeMinutes] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const minutesValue = e.target.value
    setTimeMinutes(minutesValue)

    const timeString = minutesToTimeString(minutesValue)

    if (!minutesValue) {
      setError('Время не может быть пустым')
      return
    }

    const result = notificationTimeSchema.safeParse(timeString)

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Некорректное время')
    } else {
      setError(null)
    }
  }

  const handleAdd = () => {
    if (!timeMinutes) {
      setError('Время не может быть пустым')
      return
    }

    const timeString = minutesToTimeString(timeMinutes)
    const parseResult = notificationTimeSchema.safeParse(timeString)

    if (!parseResult.success) {
      setError(parseResult.error.issues[0]?.message ?? 'Некорректное время')
      return
    }

    if (times.includes(parseResult.data)) return

    onChange([...times, parseResult.data].sort())
    setTimeMinutes('')
    setError(null)
  }

  const handleRemove = (timeToRemove: string) => {
    onChange(times.filter((time) => time !== timeToRemove))
  }

  return (
    <div className='space-y-4'>
      <div>
        <p className='mb-1 text-base font-medium text-white'>
          Время уведомлений
        </p>
        <p className='text-light-gray text-sm'>
          Добавьте время, когда вы хотите получать уведомления в Telegram
        </p>
      </div>

      <div className='flex flex-col gap-4'>
        <TimeInput
          label='Время уведомления'
          name='time'
          value={timeMinutes}
          onChange={handleTimeChange}
          error={error ?? undefined}
          disabled={disabled}
          className='max-w-80'
        />
        <Button
          type='button'
          onClick={handleAdd}
          disabled={disabled || !!error || !timeMinutes}
          variant='primary'
          className='max-w-80'
        >
          <Plus className='size-4' />
          Добавить
        </Button>
      </div>

      {times.length > 0 ? (
        <div className='space-y-2'>
          <p className='text-light-gray text-sm'>Добавленные времена:</p>
          <div className='flex flex-wrap gap-2'>
            {times.map((time) => (
              <TimeTag
                key={time}
                time={time}
                onRemove={() => handleRemove(time)}
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='border-light-gray/10 bg-light-gray/5 rounded-lg border p-4 text-center'>
          <p className='text-light-gray text-sm'>
            Время уведомлений не добавлено
          </p>
        </div>
      )}
    </div>
  )
}
