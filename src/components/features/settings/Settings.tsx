'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Switch } from '@/components/ui/Switch'
import {
	Bell,
	Camera,
	Save,
	Settings as SettingsIcon,
	User,
} from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

export function Settings() {
	const [username, setUsername] = useState('Пользователь')
	const [email, setEmail] = useState('user@example.com')
	const [avatar, setAvatar] = useState<string | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	// Notification settings
	const [notifyHabits, setNotifyHabits] = useState(true)
	const [notifyStreaks, setNotifyStreaks] = useState(true)
	const [notifyRewards, setNotifyRewards] = useState(true)
	const [notifyDaily, setNotifyDaily] = useState(true)
	const [notifyTime, setNotifyTime] = useState('09:00')

	const handleSave = () => {
		toast('Настройки сохранены!', {
			description: 'Ваши изменения успешно применены',
		})
	}

	const handleAvatarClick = () => {
		fileInputRef.current?.click()
	}

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			if (file.size > 5 * 1024 * 1024) {
				toast('Ошибка', {
					description: 'Размер файла не должен превышать 5 МБ',
				})
				return
			}
			const reader = new FileReader()
			reader.onloadend = () => {
				setAvatar(reader.result as string)
				toast('Аватар обновлен', {
					description: 'Фото профиля успешно изменено',
				})
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className='min-h-screen bg-[#2D3134] p-4 sm:p-6'>
			<div className='max-w-4xl mx-auto'>
				{/* Header */}
				<div className='mb-6 sm:mb-8'>
					<div className='flex items-center gap-3 mb-2'>
						<SettingsIcon className='w-8 h-8 text-[#1CBECB]' />
						<h1 className='text-white'>Настройки</h1>
					</div>
					<p className='text-[#B3B3B3]'>
						Управляйте своим профилем и уведомлениями
					</p>
				</div>

				{/* Profile Settings */}
				<Card className='bg-[#3D4348] border-none p-6 mb-6'>
					<div className='flex items-center gap-3 mb-6'>
						<div className='p-2 rounded-lg bg-[#1CBECB]/10'>
							<User className='w-5 h-5 text-[#1CBECB]' />
						</div>
						<h3 className='text-white'>Профиль</h3>
					</div>

					<div className='space-y-6'>
						{/* Avatar */}
						<div className='flex items-center gap-4'>
							<div className='relative group cursor-pointer'>
								<div className='w-20 h-20 rounded-full bg-[#2D3134] flex items-center justify-center overflow-hidden border-2 border-[#B3B3B3]/20 group-hover:border-[#1CBECB]/30 transition-all duration-200'>
									{avatar ? (
										<img
											src={avatar}
											alt='Avatar'
											className='w-full h-full object-cover'
										/>
									) : (
										<User className='w-10 h-10 text-[#B3B3B3] group-hover:text-[#1CBECB] transition-colors duration-200' />
									)}
								</div>
								<Button
									size='icon'
									variant='ghost'
									onClick={handleAvatarClick}
									className='absolute bottom-0 right-0 w-7 h-7 bg-[#1CBECB] hover:bg-[#1CBECB]/90 rounded-full border-2 border-[#3D4348] transition-all duration-200 hover:scale-110 hover:shadow-md hover:shadow-[#1CBECB]/30'
								>
									<Camera className='w-4 h-4 text-white' />
								</Button>
								<input
									ref={fileInputRef}
									type='file'
									accept='image/*'
									onChange={handleAvatarChange}
									className='hidden'
								/>
							</div>
							<div>
								<p className='text-white text-sm font-medium mb-1'>
									Фото профиля
								</p>
								<p className='text-[#B3B3B3] text-xs'>
									JPG, PNG или GIF. Максимум 5 МБ
								</p>
							</div>
						</div>

						<div className='space-y-4'>
							<div className='space-y-2'>
								<Label className='text-[#B3B3B3]'>Имя пользователя</Label>
								<Input
									value={username}
									onChange={e => setUsername(e.target.value)}
									className='bg-[#2D3134] border-[#B3B3B3]/20 text-white'
								/>
							</div>

							<div className='space-y-2'>
								<Label className='text-[#B3B3B3]'>Email</Label>
								<Input
									type='email'
									value={email}
									onChange={e => setEmail(e.target.value)}
									className='bg-[#2D3134] border-[#B3B3B3]/20 text-white'
								/>
							</div>
						</div>
					</div>
				</Card>

				{/* Notification Settings */}
				<Card className='bg-[#3D4348] border-none p-6 mb-6'>
					<div className='flex items-center gap-3 mb-6'>
						<div className='p-2 rounded-lg bg-[#1CBECB]/10'>
							<Bell className='w-5 h-5 text-[#1CBECB]' />
						</div>
						<h3 className='text-white'>Уведомления</h3>
					</div>

					<div className='space-y-4'>
						<div className='flex items-center justify-between py-3 border-b border-[#B3B3B3]/10 hover:border-[#B3B3B3]/20 transition-colors duration-200 group'>
							<div className='flex-1'>
								<p className='text-white group-hover:text-white transition-colors duration-200'>
									Напоминания о привычках
								</p>
								<p className='text-[#B3B3B3] text-sm group-hover:text-[#B3B3B3]/80 transition-colors duration-200'>
									Ежедневные напоминания выполнить привычки
								</p>
							</div>
							<Switch
								checked={notifyHabits}
								onCheckedChange={setNotifyHabits}
							/>
						</div>

						{notifyHabits && (
							<div className='space-y-2 pl-4'>
								<Label className='text-[#B3B3B3]'>Время напоминания</Label>
								<Input
									type='time'
									value={notifyTime}
									onChange={e => setNotifyTime(e.target.value)}
									className='bg-[#2D3134] border-[#B3B3B3]/20 text-white w-40'
								/>
							</div>
						)}

						<div className='flex items-center justify-between py-3 border-b border-[#B3B3B3]/10 hover:border-[#B3B3B3]/20 transition-colors duration-200 group'>
							<div className='flex-1'>
								<p className='text-white group-hover:text-white transition-colors duration-200'>
									Уведомления о сериях
								</p>
								<p className='text-[#B3B3B3] text-sm group-hover:text-[#B3B3B3]/80 transition-colors duration-200'>
									Получать уведомления о достижениях серий
								</p>
							</div>
							<Switch
								checked={notifyStreaks}
								onCheckedChange={setNotifyStreaks}
							/>
						</div>

						<div className='flex items-center justify-between py-3 border-b border-[#B3B3B3]/10 hover:border-[#B3B3B3]/20 transition-colors duration-200 group'>
							<div className='flex-1'>
								<p className='text-white group-hover:text-white transition-colors duration-200'>
									Уведомления о наградах
								</p>
								<p className='text-[#B3B3B3] text-sm group-hover:text-[#B3B3B3]/80 transition-colors duration-200'>
									Получать уведомления о заработанных дейликах
								</p>
							</div>
							<Switch
								checked={notifyRewards}
								onCheckedChange={setNotifyRewards}
							/>
						</div>

						<div className='flex items-center justify-between py-3 group'>
							<div className='flex-1'>
								<p className='text-white group-hover:text-white transition-colors duration-200'>
									Ежедневная сводка
								</p>
								<p className='text-[#B3B3B3] text-sm group-hover:text-[#B3B3B3]/80 transition-colors duration-200'>
									Сводка за день вечером
								</p>
							</div>
							<Switch checked={notifyDaily} onCheckedChange={setNotifyDaily} />
						</div>
					</div>
				</Card>

				{/* Save Button */}
				<div className='flex justify-end'>
					<Button
						onClick={handleSave}
						className='bg-[#1CBECB] hover:bg-[#1CBECB]/90 px-8 transition-all duration-200 hover:shadow-md hover:shadow-[#1CBECB]/20 hover:scale-105'
					>
						<Save className='w-4 h-4 mr-2' />
						Сохранить изменения
					</Button>
				</div>
			</div>
		</div>
	)
}
