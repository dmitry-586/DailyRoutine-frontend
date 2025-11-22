'use client'

import { Card } from '@/components/ui/Card'
import { Award, Flame, Target, TrendingUp } from 'lucide-react'

interface StatsPanelProps {
	totalHabits: number
	completedToday: number
	currentStreak: number
	dailyCoins: number
}

export function StatsPanel({
	totalHabits,
	completedToday,
	currentStreak,
	dailyCoins,
}: StatsPanelProps) {
	const completionRate =
		totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0

	return (
		<div className='space-y-4'>
			<Card className='bg-[#3D4348] border-none p-4'>
				<div className='space-y-3'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<div className='p-2 rounded-lg bg-[#1CBECB]/10'>
								<Target className='w-4 h-4 text-[#1CBECB]' />
							</div>
							<span className='text-[#B3B3B3] text-sm'>Выполнено сегодня</span>
						</div>
						<span className='text-white font-semibold'>
							{completedToday}/{totalHabits}
						</span>
					</div>

					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<div className='p-2 rounded-lg bg-[#FF9800]/10'>
								<Flame className='w-4 h-4 text-[#FF9800]' />
							</div>
							<span className='text-[#B3B3B3] text-sm'>Текущая серия</span>
						</div>
						<span className='text-white font-semibold'>
							{currentStreak} дней
						</span>
					</div>

					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<div className='p-2 rounded-lg bg-[#4CAF50]/10'>
								<TrendingUp className='w-4 h-4 text-[#4CAF50]' />
							</div>
							<span className='text-[#B3B3B3] text-sm'>Общий прогресс</span>
						</div>
						<span className='text-white font-semibold'>{completionRate}%</span>
					</div>

					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<div className='p-2 rounded-lg bg-[#1CBECB]/10'>
								<Award className='w-4 h-4 text-[#1CBECB]' />
							</div>
							<span className='text-[#B3B3B3] text-sm'>Дейлики</span>
						</div>
						<span className='text-[#1CBECB] font-semibold'>{dailyCoins}</span>
					</div>
				</div>
			</Card>
		</div>
	)
}
