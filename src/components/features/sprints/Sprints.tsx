'use client'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Award, Clock, Target, Trophy } from 'lucide-react'
import { useState } from 'react'

export function Sprints() {
	const [selectedTasks, setSelectedTasks] = useState<string[]>([
		'1',
		'2',
		'3',
		'4',
		'5',
	])

	const availableTasks = [
		{
			id: '1',
			title: 'Выполнить все привычки 7 дней подряд',
			reward: 100,
			progress: 5,
			total: 7,
		},
		{
			id: '2',
			title: 'Создать 5 новых привычек',
			reward: 50,
			progress: 3,
			total: 5,
		},
		{
			id: '3',
			title: 'Достичь серии в 30 дней',
			reward: 200,
			progress: 7,
			total: 30,
		},
		{
			id: '4',
			title: 'Выполнить 100 привычек',
			reward: 150,
			progress: 67,
			total: 100,
		},
		{
			id: '5',
			title: 'Не пропустить ни одной привычки неделю',
			reward: 80,
			progress: 4,
			total: 7,
		},
		{
			id: '6',
			title: 'Завершить 3 спринта',
			reward: 120,
			progress: 1,
			total: 3,
		},
		{
			id: '7',
			title: 'Набрать 1000 дейликов',
			reward: 100,
			progress: 340,
			total: 1000,
		},
		{
			id: '8',
			title: 'Поделиться прогрессом 5 раз',
			reward: 50,
			progress: 0,
			total: 5,
		},
		{
			id: '9',
			title: 'Отметить все привычки за день',
			reward: 30,
			progress: 0,
			total: 1,
		},
		{
			id: '10',
			title: 'Достичь 90% успешности',
			reward: 150,
			progress: 85,
			total: 90,
		},
	]

	const leaderboard = [
		{ rank: 1, name: 'Алексей М.', points: 1250, avatar: '🎯' },
		{ rank: 2, name: 'Мария К.', points: 1180, avatar: '🌟' },
		{ rank: 3, name: 'Дмитрий П.', points: 1050, avatar: '⚡' },
		{ rank: 4, name: 'Вы', points: 890, avatar: '👤', isUser: true },
		{ rank: 5, name: 'Елена С.', points: 820, avatar: '💫' },
	]

	const toggleTask = (taskId: string) => {
		if (selectedTasks.includes(taskId)) {
			setSelectedTasks(selectedTasks.filter(id => id !== taskId))
		} else if (selectedTasks.length < 5) {
			setSelectedTasks([...selectedTasks, taskId])
		}
	}

	const currentTasks = availableTasks.filter(task =>
		selectedTasks.includes(task.id)
	)
	const completedTasks = currentTasks.filter(
		task => task.progress >= task.total
	).length
	const totalProgress =
		currentTasks.reduce(
			(acc, task) => acc + (task.progress / task.total) * 100,
			0
		) / currentTasks.length

	return (
		<div className='min-h-screen bg-[#2D3134] p-4 sm:p-6'>
			<div className='max-w-7xl mx-auto'>
				{/* Header */}
				<div className='mb-6 sm:mb-8'>
					<h1 className='text-white mb-2'>Спринты</h1>
					<p className='text-[#B3B3B3]'>
						Выполняйте задания и получайте награды
					</p>
				</div>

				{/* Sprint Progress */}
				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
					<Card className='bg-gradient-to-br from-[#3D4348] to-[#32373A] border border-[#1CBECB]/20 p-6 hover:border-[#1CBECB]/40 hover:shadow-lg hover:shadow-[#1CBECB]/10 transition-all duration-200'>
						<div className='flex items-center gap-3 mb-3'>
							<div className='p-3 rounded-xl bg-[#1CBECB]/20 shadow-lg shadow-[#1CBECB]/10'>
								<Target className='w-6 h-6 text-[#1CBECB]' />
							</div>
							<span className='text-[#B3B3B3] text-sm font-medium'>
								Активные задания
							</span>
						</div>
						<div className='flex items-baseline gap-2'>
							<p className='text-white text-4xl font-bold'>
								{selectedTasks.length}
							</p>
							<span className='text-[#B3B3B3] text-lg'>/ 5</span>
						</div>
						{selectedTasks.length >= 5 && (
							<p className='text-[#4CAF50] text-xs mt-2'>
								✓ Максимум достигнут
							</p>
						)}
					</Card>

					<Card className='bg-gradient-to-br from-[#3D4348] to-[#32373A] border border-[#4CAF50]/20 p-6 hover:border-[#4CAF50]/40 hover:shadow-lg hover:shadow-[#4CAF50]/10 transition-all duration-200'>
						<div className='flex items-center gap-3 mb-3'>
							<div className='p-3 rounded-xl bg-[#4CAF50]/20 shadow-lg shadow-[#4CAF50]/10'>
								<Trophy className='w-6 h-6 text-[#4CAF50]' />
							</div>
							<span className='text-[#B3B3B3] text-sm font-medium'>
								Выполнено
							</span>
						</div>
						<div className='flex items-baseline gap-2'>
							<p className='text-white text-4xl font-bold'>{completedTasks}</p>
							<span className='text-[#B3B3B3] text-lg'>
								/ {selectedTasks.length}
							</span>
						</div>
						{completedTasks > 0 && (
							<p className='text-[#4CAF50] text-xs mt-2'>
								{Math.round((completedTasks / selectedTasks.length) * 100)}%
								выполнено
							</p>
						)}
					</Card>

					<Card className='bg-gradient-to-br from-[#3D4348] to-[#32373A] border border-[#FF9800]/20 p-6 hover:border-[#FF9800]/40 hover:shadow-lg hover:shadow-[#FF9800]/10 transition-all duration-200'>
						<div className='flex items-center gap-3 mb-3'>
							<div className='p-3 rounded-xl bg-[#FF9800]/20 shadow-lg shadow-[#FF9800]/10'>
								<Award className='w-6 h-6 text-[#FF9800]' />
							</div>
							<span className='text-[#B3B3B3] text-sm font-medium'>
								Общий прогресс
							</span>
						</div>
						<div className='flex items-baseline gap-2'>
							<p className='text-white text-4xl font-bold'>
								{Math.round(totalProgress)}
							</p>
							<span className='text-[#B3B3B3] text-lg'>%</span>
						</div>
						<div className='mt-3'>
							<Progress value={totalProgress} className='h-2' />
						</div>
					</Card>
				</div>

				<Tabs defaultValue='active' className='mb-8'>
					<TabsList className='bg-[#3D4348] mb-6'>
						<TabsTrigger
							value='active'
							className='data-[state=active]:bg-[#1CBECB] transition-all duration-200 hover:bg-[#1CBECB]/20 data-[state=active]:hover:bg-[#1CBECB]'
						>
							Текущие ({selectedTasks.length})
						</TabsTrigger>
						<TabsTrigger
							value='available'
							className='data-[state=active]:bg-[#1CBECB] transition-all duration-200 hover:bg-[#1CBECB]/20 data-[state=active]:hover:bg-[#1CBECB]'
						>
							Доступные ({availableTasks.length - selectedTasks.length})
						</TabsTrigger>
						<TabsTrigger
							value='leaderboard'
							className='data-[state=active]:bg-[#1CBECB] transition-all duration-200 hover:bg-[#1CBECB]/20 data-[state=active]:hover:bg-[#1CBECB]'
						>
							Таблица лидеров
						</TabsTrigger>
					</TabsList>

					<TabsContent value='active'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{currentTasks.map(task => {
								const progress = (task.progress / task.total) * 100
								const isCompleted = task.progress >= task.total

								return (
									<Card
										key={task.id}
										className={`bg-gradient-to-br from-[#3D4348] to-[#32373A] border p-6 transition-all duration-200 hover:scale-[1.02] ${
											isCompleted
												? 'border-[#4CAF50]/40 shadow-lg shadow-[#4CAF50]/10 hover:shadow-xl hover:shadow-[#4CAF50]/20'
												: 'border-[#B3B3B3]/10 hover:border-[#1CBECB]/30 hover:shadow-lg hover:shadow-[#1CBECB]/10'
										}`}
									>
										<div className='flex items-start justify-between mb-4'>
											<div className='flex-1'>
												<h3 className='text-white mb-2 font-semibold'>
													{task.title}
												</h3>
												<div className='flex items-center gap-2 text-sm text-[#B3B3B3]'>
													<Clock className='w-4 h-4' />
													<span>
														{task.progress} / {task.total}
													</span>
												</div>
											</div>
											<div className='flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1CBECB]/20 border border-[#1CBECB]/30'>
												<Award className='w-4 h-4 text-[#1CBECB]' />
												<span className='text-[#1CBECB] font-semibold'>
													{task.reward}
												</span>
											</div>
										</div>

										<div className='mb-4'>
											<div className='flex items-center justify-between text-xs text-[#B3B3B3] mb-1'>
												<span>Прогресс</span>
												<span>{Math.round(progress)}%</span>
											</div>
											<Progress
												value={progress}
												className='h-2.5'
												indicatorClassName={
													isCompleted ? 'bg-[#4CAF50]' : 'bg-[#1CBECB]'
												}
											/>
										</div>

										{isCompleted ? (
											<Button className='w-full bg-gradient-to-r from-[#4CAF50] to-[#45a049] hover:from-[#45a049] hover:to-[#4CAF50] shadow-lg hover:shadow-xl hover:shadow-[#4CAF50]/30 hover:scale-105 transition-all duration-200'>
												<Trophy className='w-4 h-4 mr-2' />
												Получить награду
											</Button>
										) : (
											<div className='text-center text-sm text-[#B3B3B3] py-2'>
												Осталось: {task.total - task.progress}
											</div>
										)}
									</Card>
								)
							})}
						</div>
					</TabsContent>

					<TabsContent value='available'>
						{availableTasks.filter(task => !selectedTasks.includes(task.id))
							.length === 0 ? (
							<div className='text-center py-12'>
								<p className='text-[#B3B3B3]'>Все задания добавлены в спринт</p>
							</div>
						) : (
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								{availableTasks
									.filter(task => !selectedTasks.includes(task.id))
									.map(task => (
										<Card
											key={task.id}
											className='bg-gradient-to-br from-[#3D4348] to-[#32373A] border border-[#B3B3B3]/10 p-6 hover:border-[#1CBECB]/30 hover:shadow-lg hover:shadow-[#1CBECB]/10 hover:scale-[1.02] transition-all duration-200'
										>
											<div className='flex items-start justify-between mb-4'>
												<div className='flex-1'>
													<h3 className='text-white mb-2 font-semibold'>
														{task.title}
													</h3>
													<div className='flex items-center gap-2 text-sm text-[#B3B3B3]'>
														<Target className='w-4 h-4' />
														<span>Цель: {task.total}</span>
													</div>
												</div>
												<div className='flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1CBECB]/20 border border-[#1CBECB]/30'>
													<Award className='w-4 h-4 text-[#1CBECB]' />
													<span className='text-[#1CBECB] font-semibold'>
														{task.reward}
													</span>
												</div>
											</div>

											<Button
												onClick={() => toggleTask(task.id)}
												disabled={selectedTasks.length >= 5}
												className='w-full bg-[#1CBECB] hover:bg-[#1CBECB]/90 hover:shadow-md hover:shadow-[#1CBECB]/20 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
											>
												{selectedTasks.length >= 5
													? 'Достигнут лимит (5/5)'
													: 'Добавить в спринт'}
											</Button>
										</Card>
									))}
							</div>
						)}
					</TabsContent>

					<TabsContent value='leaderboard'>
						<Card className='bg-[#3D4348] border-none'>
							<div className='divide-y divide-[#B3B3B3]/10'>
								{leaderboard.map(entry => (
									<div
										key={entry.rank}
										className={`p-4 flex items-center justify-between ${
											entry.isUser ? 'bg-[#1CBECB]/10' : ''
										}`}
									>
										<div className='flex items-center gap-4'>
											<div
												className={`w-10 h-10 rounded-full flex items-center justify-center ${
													entry.rank === 1
														? 'bg-[#FFD700]/20 text-[#FFD700]'
														: entry.rank === 2
														? 'bg-[#C0C0C0]/20 text-[#C0C0C0]'
														: entry.rank === 3
														? 'bg-[#CD7F32]/20 text-[#CD7F32]'
														: 'bg-[#3D4348] text-[#B3B3B3]'
												}`}
											>
												{entry.rank <= 3 ? (
													<Trophy className='w-5 h-5' />
												) : (
													entry.rank
												)}
											</div>
											<div className='text-2xl'>{entry.avatar}</div>
											<div>
												<p
													className={`${
														entry.isUser ? 'text-[#1CBECB]' : 'text-white'
													}`}
												>
													{entry.name}
												</p>
												<p className='text-sm text-[#B3B3B3]'>
													Ранг #{entry.rank}
												</p>
											</div>
										</div>
										<div className='text-right'>
											<p className='text-white'>{entry.points}</p>
											<p className='text-sm text-[#B3B3B3]'>очков</p>
										</div>
									</div>
								))}
							</div>
						</Card>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
