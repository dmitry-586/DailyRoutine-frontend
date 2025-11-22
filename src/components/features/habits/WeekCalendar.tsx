'use client'

interface WeekCalendarProps {
	currentDay?: number
}

export function WeekCalendar({ currentDay = 3 }: WeekCalendarProps) {
	const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
	const dates = [18, 19, 20, 21, 22, 23, 24]

	return (
		<div className='flex gap-2 overflow-x-auto pb-2'>
			{days.map((day, index) => (
				<button
					key={index}
					className={`flex flex-col items-center justify-center min-w-[48px] sm:min-w-[56px] h-[64px] rounded-lg transition-colors flex-shrink-0 ${
						index === currentDay
							? 'bg-[#1CBECB] text-white'
							: 'bg-[#3D4348] text-[#B3B3B3] hover:bg-[#3D4348]/80'
					}`}
				>
					<span className='text-xs opacity-70'>{day}</span>
					<span className='mt-1 font-medium'>{dates[index]}</span>
				</button>
			))}
		</div>
	)
}
