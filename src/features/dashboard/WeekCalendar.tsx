'use client'

const dayLabels: readonly string[] = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

const getStartOfWeek = (date: Date): Date => {
  const result = new Date(date)
  const dayOfWeek = result.getDay()
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  result.setDate(result.getDate() - daysToMonday)
  return result
}

const getWeekDays = (startDate: Date): Date[] =>
  Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + index)
    return date
  })

const isSameDay = (a: Date, b: Date): boolean => a.getTime() === b.getTime()

export function WeekCalendar() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const startOfWeek = getStartOfWeek(today)
  const weekDays = getWeekDays(startOfWeek)

  return (
    <div className='grid max-w-md grid-cols-7 gap-2 overflow-x-auto'>
      {weekDays.map((date) => {
        const isToday = isSameDay(date, today)
        const dayIndex = (date.getDay() + 6) % 7

        return (
          <button
            key={date.toISOString()}
            type='button'
            className={`flex flex-col items-center justify-center rounded-lg py-2 text-sm max-sm:px-3.5 max-sm:py-1.5 ${
              isToday ? 'bg-primary text-white' : 'bg-gray text-light-gray'
            }`}
          >
            <span className='opacity-70 max-sm:text-xs'>
              {dayLabels[dayIndex]}
            </span>
            <span className='mt-1 font-medium'>{date.getDate()}</span>
          </button>
        )
      })}
    </div>
  )
}
