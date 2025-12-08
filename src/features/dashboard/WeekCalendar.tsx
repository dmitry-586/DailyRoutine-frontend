'use client'

const dayLabels: readonly string[] = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

function getStartOfWeek(date: Date): Date {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)

  const dayOfWeek = result.getDay()
  const normalizedDay = dayOfWeek === 0 ? 7 : dayOfWeek
  const daysToMonday = normalizedDay - 1

  result.setDate(result.getDate() - daysToMonday)
  return result
}

function getWeekDays(startDate: Date): Date[] {
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + index)
    date.setHours(0, 0, 0, 0)
    return date
  })
}

export function WeekCalendar() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const startOfWeek = getStartOfWeek(today)
  const weekDays = getWeekDays(startOfWeek)

  const isSameDay = (a: Date, b: Date): boolean =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  return (
    <div className='grid max-w-md grid-cols-7 gap-2 overflow-x-auto'>
      {weekDays.map((date, index) => {
        const isToday = isSameDay(date, today)
        const dayOfWeek = date.getDay()
        const expectedDayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1
        const dayLabel = dayLabels[expectedDayIndex] ?? dayLabels[index]

        return (
          <button
            key={date.toISOString()}
            type='button'
            className={`flex flex-col items-center justify-center rounded-lg py-2 text-sm max-sm:px-3.5 ${
              isToday ? 'bg-primary text-white' : 'bg-gray text-light-gray'
            }`}
          >
            <span className='opacity-70 max-sm:text-xs'>{dayLabel}</span>
            <span className='mt-1 font-medium'>{date.getDate()}</span>
          </button>
        )
      })}
    </div>
  )
}
