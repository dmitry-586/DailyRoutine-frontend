'use client'

import { PWAInstallSection } from './PWAInstallSection'

export function PWAInstallCard() {
  return (
    <div className='border-light-gray/10 bg-gray rounded-xl border p-6 sm:p-8'>
      <div className='mb-4'>
        <p className='mb-2 text-base font-medium text-white'>
          Установить приложение
        </p>
        <p className='text-light-gray text-sm'>
          Установите приложение на ваше устройство для более удобного
          использования
        </p>
      </div>
      <PWAInstallSection />
    </div>
  )
}
