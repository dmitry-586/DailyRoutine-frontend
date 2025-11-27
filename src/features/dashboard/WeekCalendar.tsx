'use client'

const dayLabels: readonly string[] = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

function getStartOfWeek(date: Date): Date {
  const result = new Date(date)
  const day = result.getDay()
  const normalizedDay = day === 0 ? 7 : day
  const diff = normalizedDay - 1

  result.setDate(result.getDate() - diff)
  result.setHours(0, 0, 0, 0)
  return result
}

export function WeekCalendar() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const start = getStartOfWeek(today)
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start)
    date.setDate(start.getDate() + index)
    return date
  })

  const isSameDay = (a: Date, b: Date): boolean =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  return (
    <div className='grid max-w-md grid-cols-7 gap-2 overflow-x-auto'>
      {weekDays.map((date, index) => {
        const isToday = isSameDay(date, today)

        return (
          <button
            key={date.toISOString()}
            type='button'
            className={`flex flex-col items-center justify-center rounded-lg py-2 text-sm max-sm:px-3.5 ${
              isToday ? 'bg-primary text-white' : 'bg-gray text-light-gray'
            }`}
          >
            <span className='opacity-70 max-sm:text-xs'>
              {dayLabels[index]}
            </span>
            <span className='mt-1 font-medium'>{date.getDate()}</span>
          </button>
        )
      })}
    </div>
  )
}
