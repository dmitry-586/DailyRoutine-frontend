'use client'

import { authFieldRegistry, authFormConfig } from '@/configs/auth.config'
import { AuthFormsProps } from '@/types/auth/auth.type'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Button from '../ui/Button'
import FormField from '../ui/FormField'
import TelegramAuthModal from './TelegramAuthModal'

export default function AuthForms({ variant }: AuthFormsProps) {
	const config = authFormConfig[variant]
	const fields = config.fieldIds.map(fieldId => authFieldRegistry[fieldId])
	const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false)

	const handleTelegramClick = () => {
		setIsTelegramModalOpen(true)
	}

	return (
		<>
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
				</form>
			</section>

			{/* Модальное окно для Telegram авторизации */}
			<TelegramAuthModal
				isOpen={isTelegramModalOpen}
				onClose={() => setIsTelegramModalOpen(false)}
			/>
		</>
	)
}
