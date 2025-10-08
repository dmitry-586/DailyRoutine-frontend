'use client'

import { Download } from 'lucide-react'
import { useEffect, useState } from 'react'
import Button from './Button'

type BeforeInstallPromptEvent = Event & {
	prompt: () => Promise<void>
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

interface InstallPWAButtonProps {
	className?: string
}

export default function InstallPWAButton({ className }: InstallPWAButtonProps) {
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null)
	const [canInstall, setCanInstall] = useState(false)

	useEffect(() => {
		if (typeof window === 'undefined') return

		const onBeforeInstallPrompt = (e: Event) => {
			e.preventDefault()
			setDeferredPrompt(e as BeforeInstallPromptEvent)
			setCanInstall(true)
		}

		const onAppInstalled = () => {
			setDeferredPrompt(null)
			setCanInstall(false)
		}

		window.addEventListener(
			'beforeinstallprompt',
			onBeforeInstallPrompt as EventListener
		)
		window.addEventListener('appinstalled', onAppInstalled)

		return () => {
			window.removeEventListener(
				'beforeinstallprompt',
				onBeforeInstallPrompt as EventListener
			)
			window.removeEventListener('appinstalled', onAppInstalled)
		}
	}, [])

	if (!canInstall) return null

	return (
		<Button
			onClick={async () => {
				if (!deferredPrompt) return
				await deferredPrompt.prompt()
				try {
					await deferredPrompt.userChoice
				} finally {
					setDeferredPrompt(null)
					setCanInstall(false)
				}
			}}
			className={` ${className ?? ''}`}
		>
			<Download className='size-4' />
			<span>Установить как приложение</span>
		</Button>
	)
}
