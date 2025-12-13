'use client'

import {
  clearDeferredPrompt,
  getDeferredPrompt,
  subscribe,
} from '@/shared/model/providers'
import { useEffect, useState } from 'react'
import type { BeforeInstallPromptEvent } from './types'
import { isStandalone } from './utils'

interface UsePWAInstallReturn {
  deferredPrompt: BeforeInstallPromptEvent | null
  isInstalled: boolean
  isCheckingPrompt: boolean
  handleInstall: () => Promise<void>
}

export function usePWAInstall(): UsePWAInstallReturn {
  const [prompt, setPrompt] = useState(getDeferredPrompt)
  const [isInstalled, setIsInstalled] = useState(isStandalone)
  const [isCheckingPrompt, setIsCheckingPrompt] = useState(
    () => !isStandalone() && !getDeferredPrompt(),
  )

  useEffect(() => {
    if (isStandalone()) {
      setIsCheckingPrompt(false)
      setIsInstalled(true)
      return
    }

    const timeout = setTimeout(() => setIsCheckingPrompt(false), 5000)

    const unsubscribe = subscribe(() => {
      setPrompt(getDeferredPrompt())
      setIsCheckingPrompt(false)
      if (isStandalone()) setIsInstalled(true)
    })

    return () => {
      clearTimeout(timeout)
      unsubscribe()
    }
  }, [])

  const handleInstall = async () => {
    if (!prompt) return

    try {
      await prompt.prompt()
      const { outcome } = await prompt.userChoice

      if (outcome === 'accepted') {
        setIsInstalled(true)
        setPrompt(null)
        clearDeferredPrompt()
      }
    } catch (error) {
      console.error('[PWA] Installation error:', error)
    }
  }

  return {
    deferredPrompt: prompt,
    isInstalled,
    isCheckingPrompt,
    handleInstall,
  }
}
