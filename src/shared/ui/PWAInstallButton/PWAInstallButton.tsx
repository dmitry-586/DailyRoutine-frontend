'use client'

import { useEffect, useState } from 'react'

import { PWA_CONSTANTS } from '@/shared/lib/pwa'
import { Button } from '@/shared/ui/Button'
import { Download } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

const isStandalone = (): boolean => {
  if (typeof window === 'undefined') return false

  if ((window.navigator as { standalone?: boolean }).standalone === true) {
    return true
  }

  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true
  }

  if (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as { standalone?: boolean }).standalone === true
  ) {
    return true
  }

  return false
}

export const PWAInstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    if (isStandalone()) {
      return
    }

    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register(PWA_CONSTANTS.SERVICE_WORKER_PATH)
        .catch((error) => {
          console.warn('Service Worker не удалось зарегистрировать:', error)
        })
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      if (!isStandalone()) {
        setDeferredPrompt(e as BeforeInstallPromptEvent)
        setShowInstallButton(true)
      }
    }

    const handleAppInstalled = () => {
      setShowInstallButton(false)
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

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    await deferredPrompt.userChoice

    setDeferredPrompt(null)
    setShowInstallButton(false)
  }

  if (isStandalone() || !showInstallButton) {
    return null
  }

  return (
    <Button
      onClick={handleInstallClick}
      variant='primary'
      className='fixed right-4 bottom-4 z-50 flex w-fit min-w-[180px] items-center gap-2 bg-black/30 px-4 py-2 text-sm'
    >
      <Download size={16} />
      Установить приложение
    </Button>
  )
}

export default PWAInstallButton
