'use client'

import { authFieldRegistry, authFormConfig } from '@/configs/auth.config'
import { AuthFormsProps } from '@/types/auth/auth.type'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import Button from '../ui/Button'
import FormField from '../ui/FormField'

export default function AuthForms({ variant }: AuthFormsProps) {
	const config = authFormConfig[variant]
	const fields = config.fieldIds.map(fieldId => authFieldRegistry[fieldId])
	const telegramContainerRef = useRef<HTMLDivElement>(null)
	const [showTelegramWidget, setShowTelegramWidget] = useState(false)

	// Функция для обработки авторизации через Telegram
	const onTelegramAuth = (user: {
		id: number
		first_name: string
		last_name?: string
		username?: string
	}) => {
		alert(
			'Вход через Telegram: ' +
				user.first_name +
				' ' +
				user.last_name +
				' (' +
				user.id +
				(user.username ? ', @' + user.username : '') +
				')'
		)
	}

	// Загружаем скрипт Telegram виджета
	useEffect(() => {
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
		}
	}, [showTelegramWidget])

	// Обработчик клика по кнопке Telegram
	const handleTelegramClick = () => {
		setShowTelegramWidget(true)
	}

	return (
		<section>
			<div className='flex justify-between mt-7.5'>
				<h2 className='text-2xl'>{config.title}</h2>
				<div className='flex items-end gap-2.5'>
					<span>{config.linkLabel}</span>
					<Link
						href={config.link}
						className='text-[18px] text-primary hover:text-primary/80 transition-colors duration-200'
					>
						{config.linkText}
					</Link>
				</div>
			</div>

			<span className='flex rounded-full w-full h-[2px] bg-primary mt-2.5' />

			<form className='flex flex-col gap-6 mt-7.5'>
				{fields.map(field => (
					<FormField
						key={field.label}
						label={field.label}
						type={field.type}
						required={field.required}
						placeholder={field.placeholder}
					/>
				))}

				<div className='flex justify-between mt-5 gap-3'>
					<Button type='submit' variant='primary' className='w-fit'>
						{config.buttonText}
					</Button>

					<Button
						type='button'
						variant='primary'
						onClick={handleTelegramClick}
						className='pl-[60px] pr-[30px] min-w-0 w-fit relative'
					>
						<Image
							src='/telegram.svg'
							alt='telegram'
							width={40}
							height={40}
							className='absolute left-[-1px] top-[-1px]'
						/>
						Вход
					</Button>
				</div>

				{showTelegramWidget && (
					<div ref={telegramContainerRef} className='min-h-[40px] mt-4' />
				)}
			</form>
		</section>
	)
}
