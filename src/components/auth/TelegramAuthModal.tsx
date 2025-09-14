'use client'

import { TelegramUser } from '@/types/auth/auth.type'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../ui/Button'
import Modal from '../ui/Modal'

interface TelegramAuthModalProps {
	isOpen: boolean
	onClose: () => void
	onAuthSuccess?: (user: TelegramUser) => void
}

export default function TelegramAuthModal({
	isOpen,
	onClose,
	onAuthSuccess,
}: TelegramAuthModalProps) {
	const telegramContainerRef = useRef<HTMLDivElement>(null)
	const [isLoading, setIsLoading] = useState(false)

	// Функция для обработки авторизации через Telegram
	const onTelegramAuth = useCallback(
		(user: TelegramUser) => {
			console.log('🚀 Telegram авторизация успешна!')
			console.log('👤 Данные пользователя:', user)
			console.log('📝 Детальная информация:')
			console.log(`   ID: ${user.id}`)
			console.log(`   Имя: ${user.first_name}`)
			console.log(`   Фамилия: ${user.last_name || 'не указана'}`)
			console.log(
				`   Username: ${user.username ? '@' + user.username : 'не указан'}`
			)
			console.log(`   Фото: ${user.photo_url || 'не указано'}`)
			console.log(
				`   Дата авторизации: ${new Date(
					user.auth_date * 1000
				).toLocaleString()}`
			)
			console.log(`   Hash: ${user.hash}`)

			// Вызываем callback
			onAuthSuccess?.(user)

			// Закрываем модальное окно
			onClose()
		},
		[onAuthSuccess, onClose]
	)

	// Загружаем скрипт Telegram виджета
	useEffect(() => {
		if (!isOpen) return

		setIsLoading(true)
		console.log('📡 Загружается Telegram виджет...')
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
			console.log('✅ Telegram виджет загружен успешно')
			setIsLoading(false)
		}
		script.onerror = () => {
			console.error('❌ Ошибка загрузки Telegram виджета')
			setIsLoading(false)
		}

		// Сохраняем ссылку на контейнер
		const container = telegramContainerRef.current

		// Добавляем скрипт в контейнер через ref
		if (container) {
			container.appendChild(script)
			console.log('🔗 Telegram виджет добавлен в DOM')
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
	}, [isOpen, onClose, onAuthSuccess, onTelegramAuth])

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
