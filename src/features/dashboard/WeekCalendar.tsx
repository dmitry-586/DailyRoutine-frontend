'use client'

import { useEffect, useMemo, useState } from 'react'

const dayLabels: readonly string[] = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

const createDate = (year: number, month: number, day: number): Date =>
  new Date(year, month, day)

const getToday = (): Date => {
  const now = new Date()
  return createDate(now.getFullYear(), now.getMonth(), now.getDate())
}

const getStartOfWeek = (date: Date): Date => {
  const dayOfWeek = date.getDay()
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const startDate = new Date(date)
  startDate.setDate(startDate.getDate() - daysToMonday)
  return createDate(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate(),
  )
}

const getWeekDays = (startDate: Date): Date[] =>
  Array.from({ length: 7 }, (_, index) => {
    const date = new Date(startDate)
    date.setDate(date.getDate() + index)
    return createDate(date.getFullYear(), date.getMonth(), date.getDate())
  })

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

interface CalendarDayProps {
  date: Date
  isToday: boolean
}

const CalendarDay = ({ date, isToday }: CalendarDayProps) => {
  const dayIndex = (date.getDay() + 6) % 7

  return (
    <button
      type='button'
      className={`flex flex-col items-center justify-center rounded-lg py-2 text-sm max-sm:px-3.5 max-sm:py-1.5 ${
        isToday ? 'bg-primary text-white' : 'bg-gray text-light-gray'
      }`}
    >
      <span className='opacity-70 max-sm:text-xs'>{dayLabels[dayIndex]}</span>
      <span className='mt-1 font-medium'>{date.getDate()}</span>
    </button>
  )
}

const LoadingDay = ({ label }: { label: string }) => (
  <div className='bg-gray text-light-gray flex flex-col items-center justify-center rounded-lg py-2 text-sm max-sm:px-3.5 max-sm:py-1.5'>
    <span className='opacity-70 max-sm:text-xs'>{label}</span>
    <span className='mt-1 font-medium'>-</span>
  </div>
)

export function WeekCalendar() {
  const [mounted, setMounted] = useState(false)

  const { today, weekDays } = useMemo(() => {
    if (!mounted) return { today: null, weekDays: [] }
    const currentToday = getToday()
    const startOfWeek = getStartOfWeek(currentToday)
    return { today: currentToday, weekDays: getWeekDays(startOfWeek) }
  }, [mounted])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !today || weekDays.length === 0) {
    return (
      <div className='grid max-w-md grid-cols-7 gap-2 overflow-x-auto'>
        {dayLabels.map((label, index) => (
          <LoadingDay key={index} label={label} />
        ))}
      </div>
    )
  }

  return (
    <div className='grid max-w-md grid-cols-7 gap-2 overflow-x-auto'>
      {weekDays.map((date) => (
        <CalendarDay
          key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
          date={date}
          isToday={isSameDay(date, today)}
        />
      ))}
    </div>
  )
}
