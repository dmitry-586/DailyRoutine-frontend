'use client'

import { Switch } from '@/shared/ui/Switch'
import { Bell, BellOff } from 'lucide-react'

interface DoNotDisturbSectionProps {
  enabled: boolean
  onChange: (enabled: boolean) => void
  disabled?: boolean
}

export function DoNotDisturbSection({
  enabled,
  onChange,
  disabled,
}: DoNotDisturbSectionProps) {
  return (
    <div className='flex items-start justify-between gap-4'>
      <div className='flex-1'>
        <div className='mb-2 flex items-center gap-2'>
          {enabled ? (
            <BellOff className='text-light-gray h-5 w-5' />
          ) : (
            <Bell className='text-light-gray h-5 w-5' />
          )}
          <p className='text-base font-medium text-white'>Не беспокоить</p>
        </div>
        <p className='text-light-gray text-sm'>
          Отключить все уведомления в Telegram
        </p>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={onChange}
        disabled={disabled}
      />
    </div>
  )
}
