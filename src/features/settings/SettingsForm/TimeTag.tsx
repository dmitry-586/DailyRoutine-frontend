'use client'

import { Trash2 } from 'lucide-react'

interface TimeTagProps {
  time: string
  onRemove: () => void
  disabled?: boolean
}

export function TimeTag({ time, onRemove, disabled }: TimeTagProps) {
  return (
    <div className='bg-light-gray/10 border-light-gray/20 flex items-center gap-2 rounded-lg border px-3 py-2'>
      <span className='font-mono text-sm text-white'>{time}</span>
      <button
        type='button'
        onClick={onRemove}
        disabled={disabled}
        className='text-light-gray hover:text-red transition-colors disabled:opacity-50'
        aria-label={`Удалить время ${time}`}
      >
        <Trash2 className='h-4 w-4' />
      </button>
    </div>
  )
}
