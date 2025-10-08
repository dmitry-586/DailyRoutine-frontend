'use client'

import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import Button from './Button'

interface BeforeInstallPromptEvent extends Event {
	readonly platforms: string[]
	readonly userChoice: Promise<{
		outcome: 'accepted' | 'dismissed'
		platform: string
	}>
	prompt(): Promise<void>
}

export default function PWAInstallButton() {
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null)
	const [showInstallButton, setShowInstallButton] = useState(false)

	useEffect(() => {
		// Регистрируем Service Worker
		if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
			navigator.serviceWorker.register('/pwa/sw.js').catch(error => {
				console.warn('Service Worker не удалось зарегистрировать:', error)
			})
		}

		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault()
			setDeferredPrompt(e as BeforeInstallPromptEvent)
			setShowInstallButton(true)
		}

		const handleAppInstalled = () => {
			setShowInstallButton(false)
			setDeferredPrompt(null)
		}

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
		window.addEventListener('appinstalled', handleAppInstalled)

		// Проверяем, не установлено ли уже приложение
		if (window.matchMedia('(display-mode: standalone)').matches) {
			setShowInstallButton(false)
		}

		return () => {
			window.removeEventListener(
				'beforeinstallprompt',
				handleBeforeInstallPrompt
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

	if (!showInstallButton) {
		return null
	}

	return (
		<Button
			onClick={handleInstallClick}
			variant='primary'
			className='fixed bottom-4 right-4 z-50 px-4 py-2 text-sm min-w-[180px] flex items-center gap-2 bg-black/30'
		>
			<Download size={16} />
			Установить приложение
		</Button>
	)
}
