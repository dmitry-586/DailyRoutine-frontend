'use client'

import { PWA_CONSTANTS } from '@/shared/lib/pwa'
import { useMounted } from '@/shared/model/hooks'
import { Button } from '@/shared/ui'
import { CheckCircle2, Download, Share2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { isIOS, isSafari, isStandalone } from '../utils/pwa'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

export function PWAInstallSection() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [installStatus, setInstallStatus] = useState<
    'unknown' | 'installed' | 'pending'
  >('unknown')
  const isMounted = useMounted()

  useEffect(() => {
    if (isStandalone()) {
      setInstallStatus('installed')
      return
    }

    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register(PWA_CONSTANTS.SERVICE_WORKER_PATH)
        .catch((error) => {
          console.warn('Service worker registration failed', error)
        })
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallStatus('pending')
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    const handleAppInstalled = () => {
      setInstallStatus('installed')
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      )
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    setDeferredPrompt(null)
    if (choice.outcome === 'accepted') {
      setInstallStatus('installed')
    }
  }

  // Не рендерим ничего до монтирования, чтобы избежать проблем с гидратацией
  if (!isMounted) {
    return null
  }

  const isSafariBrowser = isSafari()
  const isIOSDevice = isIOS()

  if (installStatus === 'installed') {
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
        className='flex w-full items-center justify-center gap-2'
      >
        <Download size={16} />
        Установить приложение
      </Button>
    )
  }

  // Браузер не поддерживает установку
  return (
    <div className='border-light-gray/10 bg-light-gray/5 rounded-lg border p-4'>
      <p className='text-light-gray text-sm'>
        Установка приложения доступна в Chrome, Edge, Safari, Yandex и других
        поддерживаемых браузерах
      </p>
    </div>
  )
}
