'use client'

import { isIOS, isSafari, usePWAInstall } from '@/shared/lib/pwa'
import { Button } from '@/shared/ui'
import { CheckCircle2, Download, Loader2, Share2 } from 'lucide-react'

export function PWAInstallSection() {
  const { deferredPrompt, isInstalled, isCheckingPrompt, handleInstall } =
    usePWAInstall()
  const isSafariBrowser = isSafari()
  const isIOSDevice = isIOS()

  if (isInstalled) {
    return (
      <div className='border-primary/20 bg-primary/5 flex items-center gap-3 rounded-lg border p-4'>
        <CheckCircle2 className='text-primary h-5 w-5 shrink-0' />
        <div className='flex-1'>
          <p className='text-primary text-sm font-medium'>
            Приложение установлено
          </p>
          <p className='text-light-gray text-xs'>
            Вы можете использовать приложение в автономном режиме
          </p>
        </div>
      </div>
    )
  }

  // Показываем индикатор загрузки пока ждем событие
  if (isCheckingPrompt && !isSafariBrowser) {
    return (
      <div className='border-light-gray/10 bg-light-gray/5 flex items-center gap-3 rounded-lg border p-4'>
        <Loader2 className='text-light-gray h-5 w-5 shrink-0 animate-spin' />
        <p className='text-light-gray text-sm'>
          Проверка возможности установки...
        </p>
      </div>
    )
  }

  // Safari требует ручной установки
  if (isSafariBrowser) {
    return (
      <div className='border-light-gray/10 bg-light-gray/5 rounded-lg border p-4'>
        <div className='mb-3 flex items-start gap-3'>
          <Share2 className='text-primary mt-0.5 h-5 w-5 shrink-0' />
          <div className='flex-1'>
            <p className='mb-2 text-sm font-medium text-white'>
              {isIOSDevice ? 'Установка на iOS' : 'Установка в Safari'}
            </p>
            <ol className='text-light-gray space-y-1.5 text-sm'>
              <li className='flex gap-2'>
                <span className='shrink-0 font-semibold'>1.</span>
                <span>
                  Нажмите на кнопку{' '}
                  <span className='font-semibold text-white'>Поделиться</span>{' '}
                  {isIOSDevice ? 'внизу экрана' : 'в панели инструментов'}
                </span>
              </li>
              <li className='flex gap-2'>
                <span className='shrink-0 font-semibold'>2.</span>
                <span>
                  Выберите{' '}
                  <span className='font-semibold text-white'>
                    На экран «Домой»
                  </span>
                </span>
              </li>
              <li className='flex gap-2'>
                <span className='shrink-0 font-semibold'>3.</span>
                <span>Нажмите «Добавить»</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  // Стандартная установка для Chrome, Edge и других браузеров
  if (deferredPrompt) {
    return (
      <Button
        onClick={handleInstall}
        variant='primary'
        className='flex w-fit items-center justify-center gap-2'
      >
        <Download size={16} />
        Установить приложение
      </Button>
    )
  }

  // Браузер не поддерживает установку или dev режим
  return (
    <div className='border-light-gray/10 bg-light-gray/5 rounded-lg border p-4'>
      <p className='text-light-gray text-sm'>
        {process.env.NODE_ENV === 'production'
          ? 'Установка приложения доступна в Chrome, Edge, Safari, Yandex и других поддерживаемых браузерах'
          : 'Установка PWA доступна только в production режиме. Для тестирования запустите сборку production.'}
      </p>
    </div>
  )
}
