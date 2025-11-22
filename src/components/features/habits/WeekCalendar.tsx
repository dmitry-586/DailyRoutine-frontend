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
          className={`flex h-[64px] min-w-[48px] flex-shrink-0 flex-col items-center justify-center rounded-lg transition-colors sm:min-w-[56px] ${
            index === currentDay
              ? 'bg-primary text-white'
              : 'bg-gray text-light-gray hover:bg-gray/80'
          }`}
        >
          <span className='text-xs opacity-70'>{day}</span>
          <span className='mt-1 font-medium'>{dates[index]}</span>
        </button>
      ))}
    </div>
  )
}
