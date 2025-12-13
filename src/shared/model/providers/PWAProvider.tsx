'use client'

import type { BeforeInstallPromptEvent } from '@/shared/lib/pwa'
import { PWA_CONSTANTS } from '@/shared/lib/pwa'
import { useEffect } from 'react'

let deferredPrompt: BeforeInstallPromptEvent | null = null
let listeners: Set<() => void> = new Set()
let isInitialized = false

export const getDeferredPrompt = () => deferredPrompt

export const subscribe = (callback: () => void) => {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

export const clearDeferredPrompt = () => {
  deferredPrompt = null
  listeners.forEach((listener) => listener())
}

function initPWAListener() {
  if (typeof window === 'undefined' || isInitialized) return

  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault()
    deferredPrompt = e as BeforeInstallPromptEvent
    listeners.forEach((listener) => listener())
  })

  window.addEventListener('appinstalled', clearDeferredPrompt)

  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register(PWA_CONSTANTS.SERVICE_WORKER_PATH)
  }

  isInitialized = true
}

export function PWAProvider() {
  useEffect(() => {
    initPWAListener()
  }, [])

  return null
}
