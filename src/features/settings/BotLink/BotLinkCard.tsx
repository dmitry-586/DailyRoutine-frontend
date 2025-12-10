'use client'

import { Button } from '@/shared/ui'
import { ExternalLink } from 'lucide-react'

export function BotLinkCard() {
  return (
    <div className='border-light-gray/10 bg-gray rounded-xl border p-6 sm:p-8'>
      <div className='mb-4'>
        <p className='mb-2 text-base font-medium text-white'>Telegram бот</p>
        <p className='text-light-gray text-sm'>
          Перейдите к нашему боту в Telegram для получения уведомлений и
          управления привычками
        </p>
      </div>
      <a
        href='https://t.me/Da1lyRoutine_bot'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Button>
          <span>@Da1lyRoutine_bot</span>
          <ExternalLink className='size-4 shrink-0' />
        </Button>
      </a>
    </div>
  )
}
