'use client'

import { Button } from '@/components/ui/Button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { HabitCard } from './HabitCard'
import { HabitModal, type Habit } from './HabitModal'

interface AllHabitsProps {
	habits: Habit[]
	onAddHabit: (habit: Habit) => void
	onUpdateHabit: (habit: Habit) => void
	onDeleteHabit: (id: string) => void
	onCompleteHabit?: (habit: Habit) => void
	onHabitClick?: (habit: Habit) => void
}

export function AllHabits({
	habits,
	onAddHabit,
	onUpdateHabit,
	onDeleteHabit,
	onCompleteHabit,
	onHabitClick,
}: AllHabitsProps) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
	const [filter, setFilter] = useState<'all' | 'good' | 'bad' | 'inactive'>(
		'all'
	)

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

	const handleToggleActive = (habit: Habit) => {
		onUpdateHabit({
			...habit,
			isActive: !habit.isActive,
		})
	}

	const filteredHabits = habits.filter(habit => {
		if (filter === 'all') return habit.isActive !== false
		if (filter === 'inactive') return habit.isActive === false
		return habit.type === filter && habit.isActive !== false
	})

	return (
		<div className='min-h-screen bg-[#2D3134] p-4 sm:p-6'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4'>
					<div>
						<h1 className='text-white mb-2'>Все привычки</h1>
						<p className='text-[#B3B3B3]'>Управляйте своими привычками</p>
					</div>
					<Button
						onClick={() => {
							setEditingHabit(null)
							setIsModalOpen(true)
						}}
						className='bg-[#1CBECB] hover:bg-[#1CBECB]/90 transition-all duration-200 hover:shadow-md hover:shadow-[#1CBECB]/20 hover:scale-105'
					>
						<Plus className='w-4 h-4 mr-2' />
						Новая привычка
					</Button>
				</div>

				{/* Filters */}
				<div className='mb-6'>
					<Tabs value={filter} onValueChange={(value: any) => setFilter(value)}>
						<TabsList className='bg-[#3D4348]'>
							<TabsTrigger
								value='all'
								className='data-[state=active]:bg-[#1CBECB] transition-all duration-200 hover:bg-[#1CBECB]/20 data-[state=active]:hover:bg-[#1CBECB]'
							>
								Все ({habits.filter(h => h.isActive !== false).length})
							</TabsTrigger>
							<TabsTrigger
								value='good'
								className='data-[state=active]:bg-[#4CAF50] transition-all duration-200 hover:bg-[#4CAF50]/20 data-[state=active]:hover:bg-[#4CAF50]'
							>
								Полезные (
								{
									habits.filter(h => h.type === 'good' && h.isActive !== false)
										.length
								}
								)
							</TabsTrigger>
							<TabsTrigger
								value='bad'
								className='data-[state=active]:bg-[#F44336] transition-all duration-200 hover:bg-[#F44336]/20 data-[state=active]:hover:bg-[#F44336]'
							>
								Вредные (
								{
									habits.filter(h => h.type === 'bad' && h.isActive !== false)
										.length
								}
								)
							</TabsTrigger>
							<TabsTrigger
								value='inactive'
								className='data-[state=active]:bg-[#B3B3B3] transition-all duration-200 hover:bg-[#B3B3B3]/20 data-[state=active]:hover:bg-[#B3B3B3]'
							>
								Неактивные ({habits.filter(h => h.isActive === false).length})
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				{/* Habits Grid */}
				{filteredHabits.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
						{filteredHabits.map(habit => (
							<HabitCard
								key={habit.id}
								{...habit}
								onClick={() => onHabitClick?.(habit)}
								onEdit={handleEdit}
								onDelete={handleDelete}
								onComplete={onCompleteHabit}
								onToggleActive={handleToggleActive}
							/>
						))}
					</div>
				) : (
					<div className='bg-[#3D4348] rounded-xl p-12 text-center border border-[#B3B3B3]/10'>
						<p className='text-[#B3B3B3] mb-4'>
							{filter === 'all'
								? 'У вас пока нет привычек'
								: filter === 'inactive'
								? 'Нет неактивных привычек'
								: `У вас нет ${
										filter === 'good' ? 'полезных' : 'вредных'
								  } привычек`}
						</p>
						<Button
							onClick={() => {
								setEditingHabit(null)
								setIsModalOpen(true)
							}}
							className='bg-[#1CBECB] hover:bg-[#1CBECB]/90 transition-all duration-200 hover:shadow-md hover:shadow-[#1CBECB]/20 hover:scale-105'
						>
							<Plus className='w-4 h-4 mr-2' />
							Создать привычку
						</Button>
					</div>
				)}
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
