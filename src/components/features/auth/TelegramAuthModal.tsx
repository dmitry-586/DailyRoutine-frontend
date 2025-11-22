'use client'

import { Button } from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { postTelegramAuth } from '@/lib/api/auth'
import type { TelegramUser } from '@/types/auth.types'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface TelegramAuthModalProps {
	isOpen: boolean
	onClose: () => void
}

declare global {
	interface Window {
		onTelegramAuth?: (user: TelegramUser) => void
	}
}

export default function TelegramAuthModal({
	isOpen,
	onClose,
}: TelegramAuthModalProps) {
	const telegramContainerRef = useRef<HTMLDivElement>(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (!isOpen) return

		window.onTelegramAuth = async (user: TelegramUser) => {
			await postTelegramAuth(user)
			onClose()
		}

		return () => {
			delete window.onTelegramAuth
		}
	}, [isOpen, onClose])

	useEffect(() => {
		if (!isOpen) return

		setIsLoading(true)

		const script = document.createElement('script')
		script.src = 'https://telegram.org/js/telegram-widget.js?22'
		script.async = true
		script.setAttribute('data-telegram-login', 'Da1lyRoutine_bot')
		script.setAttribute('data-size', 'large')
		script.setAttribute('data-onauth', 'onTelegramAuth(user)')
		script.setAttribute('data-request-access', 'write')

		const handleScriptLoad = () => setIsLoading(false)
		script.onload = handleScriptLoad
		script.onerror = handleScriptLoad

		const container = telegramContainerRef.current

		if (container) {
			container.appendChild(script)
		}

		return () => {
			if (container && container.contains(script)) {
				container.removeChild(script)
			}
			setIsLoading(false)
		}
	}, [isOpen])

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title='Вход через Telegram'
			className='max-w-lg'
		>
			<div className='w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto'>
				<Image
					src='/telegram.svg'
					alt='Telegram'
					width={40}
					height={40}
					className='text-primary'
				/>
			</div>

			<p className='text-foreground/80 mt-3 mb-6 text-center'>
				Нажмите кнопку ниже, чтобы войти через Telegram. Это быстрый
				и&nbsp;безопасный способ авторизации.
			</p>

			<div className='mb-6'>
				{isLoading ? (
					<div className='flex items-center justify-center py-8'>
						<Loader2 className='animate-spin h-8 w-8 text-primary' />
						<span className='ml-3 text-foreground/60'>Загрузка...</span>
					</div>
				) : (
					<div
						ref={telegramContainerRef}
						className='min-h-[40px] bg-transparent flex items-center justify-center'
					/>
				)}
			</div>

			<Button variant='primary' onClick={onClose} className='w-full'>
				Отмена
			</Button>
		</Modal>
	)
}
