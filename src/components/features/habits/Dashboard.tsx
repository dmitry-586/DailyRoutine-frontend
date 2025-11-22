'use client'

import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { HabitCard } from './HabitCard'
import { HabitModal, type Habit } from './HabitModal'
import { StatsPanel } from './StatsPanel'
import { WeekCalendar } from './WeekCalendar'

interface DashboardProps {
	habits: Habit[]
	onAddHabit: (habit: Habit) => void
	onUpdateHabit: (habit: Habit) => void
	onDeleteHabit: (id: string) => void
	onCompleteHabit?: (habit: Habit) => void
	onHabitClick?: (habit: Habit) => void
}

export function Dashboard({
	habits,
	onAddHabit,
	onUpdateHabit,
	onDeleteHabit,
	onCompleteHabit,
	onHabitClick,
}: DashboardProps) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editingHabit, setEditingHabit] = useState<Habit | null>(null)

	const completedToday = habits.filter(h => h.completed).length

	const handleSave = (habit: Habit) => {
		if (editingHabit) {
			onUpdateHabit(habit)
		} else {
			onAddHabit(habit)
		}
		setEditingHabit(null)
	}

	const handleEdit = (habit: Habit) => {
		setEditingHabit(habit)
		setIsModalOpen(true)
	}

	const handleDelete = (id: string) => {
		onDeleteHabit(id)
	}

	return (
		<div className='min-h-screen bg-[#2D3134] p-6'>
			<div className='max-w-7xl mx-auto'>
				{/* Week Calendar */}
				<div className='mb-6 overflow-x-auto'>
					<WeekCalendar currentDay={3} />
				</div>

				{/* Main Content */}
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					{/* Habits Section */}
					<div className='lg:col-span-2 space-y-4'>
						<div className='flex items-center justify-between mb-4'>
							<h2 className='text-white text-xl font-semibold'>
								Привычки на сегодня
							</h2>
							<Button
								onClick={() => {
									setEditingHabit(null)
									setIsModalOpen(true)
								}}
								className='bg-[#1CBECB] hover:bg-[#1CBECB]/90 h-9 px-4 transition-all duration-200 hover:shadow-md hover:shadow-[#1CBECB]/20 hover:scale-105'
							>
								<Plus className='w-4 h-4 mr-2' />
								Добавить
							</Button>
						</div>

						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{habits
								.filter(h => h.isActive !== false)
								.map(habit => (
									<HabitCard
										key={habit.id}
										{...habit}
										onClick={() => onHabitClick?.(habit)}
										onEdit={handleEdit}
										onDelete={handleDelete}
										onComplete={onCompleteHabit}
									/>
								))}
						</div>

						{habits.filter(h => h.isActive !== false).length === 0 && (
							<div className='bg-[#3D4348] rounded-xl p-12 text-center border border-[#B3B3B3]/10'>
								<p className='text-[#B3B3B3] mb-4'>У вас пока нет привычек</p>
								<Button
									onClick={() => {
										setEditingHabit(null)
										setIsModalOpen(true)
									}}
									className='bg-[#1CBECB] hover:bg-[#1CBECB]/90 transition-all duration-200 hover:shadow-md hover:shadow-[#1CBECB]/20 hover:scale-105'
								>
									<Plus className='w-4 h-4 mr-2' />
									Создать первую привычку
								</Button>
							</div>
						)}
					</div>

					{/* Stats Panel */}
					<div className='lg:col-span-1'>
						<h3 className='text-white text-lg font-semibold mb-4'>
							Статистика
						</h3>
						<StatsPanel
							totalHabits={habits.filter(h => h.isActive !== false).length}
							completedToday={completedToday}
							currentStreak={7}
							dailyCoins={340}
						/>

						<div className='mt-6 bg-[#3D4348] rounded-xl p-6 text-center border border-[#B3B3B3]/10'>
							<p className='text-[#B3B3B3] text-sm mb-4'>
								Продолжайте в том же духе!
							</p>
							<div className='text-4xl mb-2'>🎯</div>
							<p className='text-white font-semibold'>
								{completedToday} из{' '}
								{habits.filter(h => h.isActive !== false).length} привычек
								выполнено
							</p>
						</div>
					</div>
				</div>
			</div>

			<HabitModal
				open={isModalOpen}
				onClose={() => {
					setIsModalOpen(false)
					setEditingHabit(null)
				}}
				onSave={handleSave}
				habit={editingHabit}
			/>
		</div>
	)
}
