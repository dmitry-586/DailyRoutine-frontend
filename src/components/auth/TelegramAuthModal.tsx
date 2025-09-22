'use client'

import { postTelegramAuth } from '@/services/auth.service'
import { TelegramUser } from '@/types/auth/auth.type'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../ui/Button'
import Modal from '../ui/Modal'

interface TelegramAuthModalProps {
	isOpen: boolean
	onClose: () => void
}

export default function TelegramAuthModal({
	isOpen,
	onClose,
}: TelegramAuthModalProps) {
	const telegramContainerRef = useRef<HTMLDivElement>(null)
	const [isLoading, setIsLoading] = useState(false)
	const router = useRouter()

	// Функция для обработки авторизации через Telegram
	const onTelegramAuth = useCallback(
		async (user: TelegramUser) => {
			setIsLoading(true)
			try {
				await postTelegramAuth(user)
				onClose()
				router.push('/dashboard')
			} finally {
				setIsLoading(false)
			}
		},
		[onClose, router]
	)

	// Загружаем скрипт Telegram виджета
	useEffect(() => {
		if (!isOpen) return

		setIsLoading(true)
		;(
			window as Window & { onTelegramAuth?: typeof onTelegramAuth }
		).onTelegramAuth = onTelegramAuth

		// Загружаем скрипт Telegram виджета
		const script = document.createElement('script')
		script.src = 'https://telegram.org/js/telegram-widget.js?22'
		script.async = true
		script.setAttribute('data-telegram-login', 'Da1lyRoutine_bot')
		script.setAttribute('data-size', 'large')
		script.setAttribute('data-onauth', 'onTelegramAuth(user)')
		script.setAttribute('data-request-access', 'write')

		// Обработчики событий скрипта
		script.onload = () => {
			setIsLoading(false)
		}
		script.onerror = () => {
			setIsLoading(false)
		}

		// Сохраняем ссылку на контейнер
		const container = telegramContainerRef.current

		// Добавляем скрипт в контейнер через ref
		if (container) {
			container.appendChild(script)
		}

		// Очистка при размонтировании
		return () => {
			if (container && container.contains(script)) {
				container.removeChild(script)
			}
			delete (window as Window & { onTelegramAuth?: typeof onTelegramAuth })
				.onTelegramAuth
			setIsLoading(false)
		}
	}, [isOpen, onClose, onTelegramAuth])

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
