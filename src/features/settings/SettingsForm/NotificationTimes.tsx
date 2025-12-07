'use client'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { TimeTag } from './TimeTag'

interface NotificationTimesProps {
  times: string[]
  onChange: (times: string[]) => void
  disabled?: boolean
}

export function NotificationTimes({
  times,
  onChange,
  disabled = false,
}: NotificationTimesProps) {
  const [newTime, setNewTime] = useState('')

  const handleAdd = () => {
    if (!newTime.trim() || times.includes(newTime)) return

    onChange([...times, newTime].sort())
    setNewTime('')
  }

  const handleRemove = (timeToRemove: string) => {
    onChange(times.filter((time) => time !== timeToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
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

      <div className='flex gap-2'>
        <Input
          type='time'
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Выберите время'
          disabled={disabled}
          className='flex-1'
        />
        <Button
          type='button'
          onClick={handleAdd}
          disabled={disabled || !newTime.trim()}
          variant='primary'
          className='shrink-0'
        >
          <Plus className='h-4 w-4' />
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
