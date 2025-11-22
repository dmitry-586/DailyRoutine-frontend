'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ArrowLeft, Calendar, Flame, Target, TrendingUp } from 'lucide-react'
import { useMemo } from 'react'
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { ActivityGrid } from './ActivityGrid'
import type { Habit } from './HabitModal'

interface HabitDetailsProps {
	habit: Habit
	onBack: () => void
}

// Генерируем уникальные данные для графика на основе истории привычки
function generateChartData(habit: Habit) {
	if (!habit.history || habit.history.length === 0) {
		// Если истории нет, возвращаем пустой график
		return []
	}

	// Берем последние 7 дней для недельного графика
	const last7Days = habit.history
		.slice(-7)
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

	const dayNames = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

	return last7Days.map((entry, index) => {
		const date = new Date(entry.date)
		const dayName =
			dayNames[date.getDay() === 0 ? 6 : date.getDay() - 1] || dayNames[index]

		// Для binary - процент выполнения (0 или 100)
		// Для count/time - процент от цели
		let value = 0
		if (habit.format === 'binary') {
			value = entry.completed ? 100 : 0
		} else {
			value =
				habit.target > 0 ? Math.min((entry.value / habit.target) * 100, 100) : 0
		}

		return {
			day: dayName,
			value: Math.round(value),
			date: entry.date,
		}
	})
}

// Форматируем историю для отображения
function formatHistory(habit: Habit): Array<{
	date: string
	status: 'completed' | 'missed'
	value: string
}> {
	if (!habit.history || habit.history.length === 0) {
		return []
	}

	const sortedHistory = [...habit.history].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	)

	return sortedHistory.slice(0, 10).map(entry => {
		const date = new Date(entry.date)
		const formattedDate = date.toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'long',
		})

		let valueStr = ''
		if (habit.format === 'binary') {
			valueStr = entry.completed ? '100%' : '0%'
		} else {
			const percentage =
				habit.target > 0 ? Math.round((entry.value / habit.target) * 100) : 0
			valueStr = `${percentage}%`
		}

		return {
			date: formattedDate,
			status: entry.completed ? 'completed' : 'missed',
			value: valueStr,
		}
	})
}

// Рассчитываем статистику на основе истории
function calculateStats(habit: Habit) {
	if (!habit.history || habit.history.length === 0) {
		return {
			totalDays: 0,
			completedDays: 0,
			progress: 0,
		}
	}

	const totalDays = habit.history.length
	const completedDays = habit.history.filter(h => h.completed).length

	// Рассчитываем средний прогресс
	let totalProgress = 0
	habit.history.forEach(entry => {
		if (habit.format === 'binary') {
			totalProgress += entry.completed ? 100 : 0
		} else {
			const progress = habit.target > 0 ? (entry.value / habit.target) * 100 : 0
			totalProgress += Math.min(progress, 100)
		}
	})
	const progress = totalDays > 0 ? Math.round(totalProgress / totalDays) : 0

	return {
		totalDays,
		completedDays,
		progress,
	}
}

export function HabitDetails({ habit, onBack }: HabitDetailsProps) {
	// Генерируем данные графика на основе истории привычки
	const chartData = useMemo(() => generateChartData(habit), [habit])

	// Форматируем историю
	const history = useMemo(() => formatHistory(habit), [habit])

	// Рассчитываем статистику
	const stats = useMemo(() => calculateStats(habit), [habit])

	return (
		<div className='min-h-screen bg-[#2D3134] p-4 sm:p-6'>
			<div className='max-w-4xl mx-auto'>
				{/* Header */}
				<Button
					variant='ghost'
					onClick={onBack}
					className='mb-6 text-[#B3B3B3] hover:text-white hover:bg-[#3D4348] transition-all duration-200'
				>
					<ArrowLeft className='w-4 h-4 mr-2' />
					Назад
				</Button>

				<div className='bg-[#3D4348] rounded-xl p-6 mb-6'>
					<div className='flex items-start justify-between mb-4'>
						<div>
							<h1 className='text-white mb-2'>{habit.title}</h1>
							<div className='flex items-center gap-4 text-sm text-[#B3B3B3]'>
								<span
									className={`px-3 py-1 rounded-full ${
										habit.type === 'good'
											? 'bg-[#4CAF50]/20 text-[#4CAF50]'
											: 'bg-[#F44336]/20 text-[#F44336]'
									}`}
								>
									{habit.type === 'good' ? 'Полезная' : 'Вредная'}
								</span>
								<span>
									{habit.format === 'binary'
										? 'Да/Нет'
										: habit.format === 'time'
										? 'Время'
										: 'Количество'}
								</span>
							</div>
						</div>
					</div>

					{/* Stats Cards */}
					<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
						<Card className='bg-[#2D3134] border-none p-4'>
							<div className='flex items-center gap-2 mb-2'>
								<Flame className='w-4 h-4 text-[#FF9800]' />
								<span className='text-[#B3B3B3] text-sm'>Серия</span>
							</div>
							<p className='text-white text-2xl'>{habit.streak}</p>
						</Card>

						<Card className='bg-[#2D3134] border-none p-4'>
							<div className='flex items-center gap-2 mb-2'>
								<TrendingUp className='w-4 h-4 text-[#4CAF50]' />
								<span className='text-[#B3B3B3] text-sm'>Прогресс</span>
							</div>
							<p className='text-white text-2xl'>{stats.progress}%</p>
						</Card>

						<Card className='bg-[#2D3134] border-none p-4'>
							<div className='flex items-center gap-2 mb-2'>
								<Calendar className='w-4 h-4 text-[#1CBECB]' />
								<span className='text-[#B3B3B3] text-sm'>Всего дней</span>
							</div>
							<p className='text-white text-2xl'>{stats.totalDays}</p>
						</Card>

						<Card className='bg-[#2D3134] border-none p-4'>
							<div className='flex items-center gap-2 mb-2'>
								<Target className='w-4 h-4 text-[#1CBECB]' />
								<span className='text-[#B3B3B3] text-sm'>Выполнено</span>
							</div>
							<p className='text-white text-2xl'>{stats.completedDays}</p>
						</Card>
					</div>
				</div>

				{/* Chart or Activity Grid */}
				<div className='bg-[#3D4348] rounded-xl p-6 mb-6'>
					{habit.format === 'binary' ? (
						<ActivityGrid
							habitType={habit.type}
							onDateClick={date => {
								console.log('Clicked date:', date)
								// Здесь можно добавить логику для отметки/изменения дня
							}}
						/>
					) : (
						<>
							<h3 className='text-white mb-4'>График прогресса</h3>
							{chartData.length > 0 ? (
								<ResponsiveContainer width='100%' height={250}>
									<LineChart data={chartData}>
										<CartesianGrid strokeDasharray='3 3' stroke='#32373A' />
										<XAxis dataKey='day' stroke='#B3B3B3' />
										<YAxis stroke='#B3B3B3' domain={[0, 100]} />
										<Tooltip
											contentStyle={{
												backgroundColor: '#3D4348',
												border: 'none',
												borderRadius: '8px',
												color: '#FFFFFF',
											}}
											formatter={(value: number) => [`${value}%`, 'Прогресс']}
										/>
										<Line
											type='monotone'
											dataKey='value'
											stroke='#1CBECB'
											strokeWidth={2}
											dot={{ fill: '#1CBECB', r: 4 }}
										/>
									</LineChart>
								</ResponsiveContainer>
							) : (
								<div className='flex items-center justify-center h-[250px] text-[#B3B3B3]'>
									<p>
										Нет данных для отображения. Начните отслеживать привычку!
									</p>
								</div>
							)}
						</>
					)}
				</div>

				{/* History - только для не-binary привычек */}
				{habit.format !== 'binary' && (
					<div className='bg-[#3D4348] rounded-xl p-6'>
						<h3 className='text-white mb-4'>История выполнений</h3>
						{history.length > 0 ? (
							<div className='space-y-3'>
								{history.map((entry, index) => (
									<div
										key={index}
										className='flex items-center justify-between p-3 bg-[#2D3134] rounded-lg'
									>
										<div className='flex items-center gap-3'>
											<div
												className={`w-3 h-3 rounded-full ${
													entry.status === 'completed'
														? 'bg-[#4CAF50]'
														: 'bg-[#F44336]'
												}`}
											/>
											<span className='text-white'>{entry.date}</span>
										</div>
										<span
											className={
												entry.status === 'completed'
													? 'text-[#4CAF50]'
													: 'text-[#F44336]'
											}
										>
											{entry.value}
										</span>
									</div>
								))}
							</div>
						) : (
							<div className='text-center py-8 text-[#B3B3B3]'>
								<p>История выполнений пока пуста</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
