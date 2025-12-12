'use client'

import { isStandalone, usePWAInstall } from '@/shared/lib/pwa'
import { Button } from '@/shared/ui'
import { Download } from 'lucide-react'

export const PWAInstallButton = () => {
  const { deferredPrompt, isInstalled, isCheckingPrompt, handleInstall } =
    usePWAInstall()

  if (isStandalone() || isInstalled || isCheckingPrompt || !deferredPrompt) {
    return null
  }

  return (
    <Button
      onClick={handleInstall}
      variant='primary'
      className='fixed right-4 bottom-4 z-50 flex w-fit min-w-[180px] items-center gap-2 bg-black/30 px-4 py-2 text-sm'
    >
      <Download size={16} />
      Установить приложение
    </Button>
  )
}

export default PWAInstallButton
