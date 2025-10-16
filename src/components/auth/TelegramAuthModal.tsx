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

// Глобальная функция для Telegram callback
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
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()
	const scriptLoadedRef = useRef(false)

	// Функция для обработки авторизации через Telegram
	const onTelegramAuth = useCallback(
		async (user: TelegramUser) => {
			console.log('Telegram auth callback received:', user)
			setIsLoading(true)
			setError(null)
			try {
				const response = await postTelegramAuth(user)

				if (!response.ok) {
					throw new Error('Ошибка авторизации на сервере')
				}

				console.log('Auth successful, redirecting to dashboard')
				onClose()
				router.push('/dashboard')
			} catch (err) {
				console.error('Telegram auth error:', err)
				setError(
					err instanceof Error
						? err.message
						: 'Произошла ошибка при авторизации'
				)
			} finally {
				setIsLoading(false)
			}
		},
		[onClose, router]
	)

	// Загружаем скрипт Telegram виджета
	useEffect(() => {
		if (!isOpen) return

		console.log('TelegramAuthModal opened, initializing widget...')
		console.log('Current domain:', window.location.hostname)
		console.log('Current URL:', window.location.href)
		console.log(
			'⚠️ ВАЖНО: Домен в BotFather должен быть:',
			window.location.hostname
		)
		setIsLoading(true)
		setError(null)

		// Регистрируем глобальную функцию callback
		window.onTelegramAuth = onTelegramAuth

		// Очищаем контейнер перед добавлением нового скрипта
		const container = telegramContainerRef.current
		if (container) {
			container.innerHTML = ''
		}

		// Создаём скрипт Telegram виджета
		const script = document.createElement('script')
		script.src = 'https://telegram.org/js/telegram-widget.js?22'
		script.async = true
		script.setAttribute('data-telegram-login', 'Da1lyRoutine_bot')
		script.setAttribute('data-size', 'large')
		script.setAttribute('data-onauth', 'onTelegramAuth(user)')
		script.setAttribute('data-request-access', 'write')

		// Обработчики событий скрипта
		script.onload = () => {
			console.log('Telegram widget script loaded successfully')
			scriptLoadedRef.current = true
			setIsLoading(false)
		}

		script.onerror = e => {
			console.error('Failed to load Telegram widget script:', e)
			setError(
				'Не удалось загрузить виджет Telegram. Проверьте интернет-соединение.'
			)
			setIsLoading(false)
		}

		// Добавляем скрипт в контейнер
		if (container) {
			container.appendChild(script)
		}

		// Очистка при размонтировании
		return () => {
			console.log('Cleaning up Telegram widget...')
			if (container) {
				container.innerHTML = ''
			}
			delete window.onTelegramAuth
			scriptLoadedRef.current = false
			setIsLoading(false)
			setError(null)
		}
	}, [isOpen, onTelegramAuth])

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

			<p className='text-foreground/80 mt-3 mb-4 text-center'>
				Нажмите кнопку ниже, чтобы войти через Telegram. Это быстрый
				и&nbsp;безопасный способ авторизации.
			</p>

			<div className='mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg'>
				<p className='text-xs text-amber-800 dark:text-amber-300 font-medium mb-1'>
					⚠️ Важно!
				</p>
				<p className='text-xs text-amber-700 dark:text-amber-400'>
					После ввода номера телефона подтверждение придёт{' '}
					<strong>в приложении Telegram</strong> (не SMS!). Откройте Telegram на
					телефоне и подтвердите доступ.
				</p>
			</div>

			{error && (
				<div className='mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg'>
					<p className='text-red-600 dark:text-red-400 text-sm text-center'>
						{error}
					</p>
				</div>
			)}

			<div className='mb-6'>
				{isLoading ? (
					<div className='flex items-center justify-center py-8'>
						<Loader2 className='animate-spin h-8 w-8 text-primary' />
						<span className='ml-3 text-foreground/60'>Загрузка виджета...</span>
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
