'use client'

import { useEffect, useState } from 'react'
import { PWA_CONSTANTS } from './constants'
import type { BeforeInstallPromptEvent } from './types'
import { isStandalone } from './utils'

interface UsePWAInstallReturn {
  deferredPrompt: BeforeInstallPromptEvent | null
  isInstalled: boolean
  isCheckingPrompt: boolean
  handleInstall: () => Promise<void>
}

// Глобальное хранилище для события (синглтон)
let deferredPrompt: BeforeInstallPromptEvent | null = null
let listeners: Array<() => void> = []
let isInitialized = false

// Подписка на изменения
function subscribe(callback: () => void) {
  listeners.push(callback)
  return () => {
    listeners = listeners.filter((listener) => listener !== callback)
  }
}

// Уведомление всех подписчиков
function notify() {
  listeners.forEach((listener) => listener())
}

// Инициализация глобального слушателя
function initGlobalListener() {
  if (typeof window === 'undefined' || isInitialized) return

  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault()
    deferredPrompt = e as BeforeInstallPromptEvent
    notify()
  })

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null
    notify()
  })

  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register(PWA_CONSTANTS.SERVICE_WORKER_PATH)
  }

  isInitialized = true
}

/**
 * Хук для управления установкой PWA
 */
export function usePWAInstall(): UsePWAInstallReturn {
  // Инициализируем слушатель до useState, чтобы он был готов как можно раньше
  if (typeof window !== 'undefined') {
    initGlobalListener()
  }

  // Сразу проверяем глобальное состояние при инициализации
  const [prompt, setPrompt] = useState<BeforeInstallPromptEvent | null>(
    () => deferredPrompt,
  )
  const [isInstalled, setIsInstalled] = useState(() => isStandalone())
  const [isCheckingPrompt, setIsCheckingPrompt] = useState(!deferredPrompt)

  useEffect(() => {
    // Если приложение уже установлено, выходим
    if (isStandalone()) {
      setIsCheckingPrompt(false)
      return
    }

    // Если prompt уже есть, не ждем
    if (deferredPrompt) {
      setIsCheckingPrompt(false)
    }

    // Таймаут ожидания события (5 секунд)
    const checkTimeout = setTimeout(() => {
      setIsCheckingPrompt(false)
    }, 5000)

    // Подписываемся на изменения глобального состояния
    const unsubscribe = subscribe(() => {
      setPrompt(deferredPrompt)
      setIsCheckingPrompt(false)
      if (isStandalone()) {
        setIsInstalled(true)
      }
    })

    return () => {
      clearTimeout(checkTimeout)
      unsubscribe()
    }
  }, [])

  const handleInstall = async () => {
    if (!prompt) return

    await prompt.prompt()
    const choice = await prompt.userChoice

    if (choice.outcome === 'accepted') {
      setIsInstalled(true)
      deferredPrompt = null
      setPrompt(null)
      notify()
    }
  }

  return {
    deferredPrompt: prompt,
    isInstalled,
    isCheckingPrompt,
    handleInstall,
  }
}
