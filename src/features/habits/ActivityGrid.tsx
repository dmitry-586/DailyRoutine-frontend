'use client'

import { TabsList, TabsTrigger } from '@/shared/ui/Tabs'
import { useMemo, useState } from 'react'

type Period = 'week' | 'month' | 'year'

interface ActivityDay {
  date: Date
  completed: boolean
  count?: number
}

interface ActivityGridProps {
  habitType: 'good' | 'bad'
  onDateClick?: (date: Date) => void
}

// Генерируем моковые данные активности
const generateActivityData = (
  period: Period,
  habitType: 'good' | 'bad',
): ActivityDay[] => {
  const today = new Date()
  const days: ActivityDay[] = []
  let daysCount = 0

  switch (period) {
    case 'week':
      daysCount = 7
      break
    case 'month':
      daysCount = 30
      break
    case 'year':
      daysCount = 365
      break
  }

  for (let i = daysCount - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    // Генерируем случайные данные для демонстрации
    // В реальном приложении это будет приходить из API
    const random = Math.random()
    const completed = habitType === 'good' ? random > 0.3 : random > 0.4

    days.push({
      date,
      completed,
    })
  }

  return days
}

const getIntensityColor = (
  completed: boolean,
  habitType: 'good' | 'bad',
): string => {
  if (!completed) {
    // Для незавершенных дней - темно-серый цвет с видимой границей
    return 'bg-muted border border-muted/50'
  }

  // Для binary привычек только два состояния - выполнено или нет
  // Используем яркие контрастные цвета, которые хорошо видны на темном фоне
  if (habitType === 'good') {
    // Яркий зеленый для выполненных полезных привычек (более яркий чем GitHub)
    return 'bg-green border border-green'
  } else {
    // Яркий оранжево-красный для дней без срыва (вредные привычки)
    return 'bg-red border border-red'
  }
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function ActivityGrid({ habitType, onDateClick }: ActivityGridProps) {
  const [period, setPeriod] = useState<Period>('month')
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

  const activityData = useMemo(
    () => generateActivityData(period, habitType),
    [period, habitType],
  )

  // Группируем данные по неделям для отображения
  const weeks = useMemo(() => {
    if (activityData.length === 0) return []

    const weeksArray: ActivityDay[][] = []
    const firstDate = activityData[0].date
    const lastDate = activityData[activityData.length - 1].date

    // Находим понедельник первой недели
    const firstDayOfWeek = new Date(firstDate)
    const dayOfWeek = firstDate.getDay()
    const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek // Воскресенье = 7
    const daysToSubtract = adjustedDay - 1
    firstDayOfWeek.setDate(firstDate.getDate() - daysToSubtract)

    // Создаем карту дат для быстрого поиска
    const dateMap = new Map<string, ActivityDay>()
    activityData.forEach((day) => {
      const key = day.date.toDateString()
      dateMap.set(key, day)
    })

    // Генерируем все недели от первого понедельника до последнего дня
    let currentDate = new Date(firstDayOfWeek)
    let currentWeek: ActivityDay[] = []

    while (currentDate <= lastDate) {
      const dayOfWeek = currentDate.getDay()
      const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek

      // Если это понедельник и есть предыдущая неделя, сохраняем её
      if (adjustedDay === 1 && currentWeek.length > 0) {
        weeksArray.push(currentWeek)
        currentWeek = []
      }

      // Получаем данные для этого дня или создаем пустой
      const key = currentDate.toDateString()
      const dayData = dateMap.get(key) || {
        date: new Date(currentDate),
        completed: false,
      }

      currentWeek.push(dayData)

      // Переходим к следующему дню
      currentDate.setDate(currentDate.getDate() + 1)
    }

    // Добавляем последнюю неделю
    if (currentWeek.length > 0) {
      weeksArray.push(currentWeek)
    }

    // Дополняем последнюю неделю до воскресенья, если нужно
    if (weeksArray.length > 0) {
      const lastWeek = weeksArray[weeksArray.length - 1]
      while (lastWeek.length < 7) {
        const lastDay = lastWeek[lastWeek.length - 1]
        const nextDate = new Date(lastDay.date)
        nextDate.setDate(nextDate.getDate() + 1)
        lastWeek.push({
          date: nextDate,
          completed: false,
        })
      }
    }

    return weeksArray
  }, [activityData])

  const cellSize = period === 'year' ? 11 : period === 'month' ? 12 : 14
  const cellGap = 3

  // Подсчитываем статистику
  const totalDays = activityData.length
  const completedDays = activityData.filter((d) => d.completed).length
  const completionRate =
    totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0

  return (
    <div className='space-y-4'>
      {/* Period Selector */}
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <h3 className='text-lg font-semibold text-white'>Активность</h3>
        <TabsList className='border-muted/50 bg-background border'>
          <TabsTrigger
            active={period === 'week'}
            onClick={() => setPeriod('week')}
            className='text-light-gray data-[state=active]:bg-primary px-3 py-1.5 text-xs data-[state=active]:text-white'
          >
            Неделя
          </TabsTrigger>
          <TabsTrigger
            active={period === 'month'}
            onClick={() => setPeriod('month')}
            className='text-light-gray data-[state=active]:bg-primary px-3 py-1.5 text-xs data-[state=active]:text-white'
          >
            Месяц
          </TabsTrigger>
          <TabsTrigger
            active={period === 'year'}
            onClick={() => setPeriod('year')}
            className='text-light-gray data-[state=active]:bg-primary px-3 py-1.5 text-xs data-[state=active]:text-white'
          >
            Год
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Stats Summary */}
      <div className='mb-4 flex flex-wrap items-center gap-6 text-sm'>
        <div className='flex items-center gap-2'>
          <span className='text-light-gray'>
            Выполнено:{' '}
            <span className='font-semibold text-white'>{completedDays}</span> из{' '}
            <span className='font-semibold text-white'>{totalDays}</span> дней
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='text-light-gray'>Успешность:</span>
          <span className='text-primary font-semibold'>{completionRate}%</span>
        </div>
      </div>

      {/* Activity Grid */}
      <div className='overflow-x-auto pb-4'>
        <div className='relative flex items-start gap-1'>
          {/* Day labels */}
          <div className='mr-2 flex flex-col gap-1 pt-6'>
            {['Пн', '', 'Ср', '', 'Пт', '', ''].map((day, index) => (
              <div
                key={index}
                className='text-light-gray text-xs font-medium'
                style={{ height: `${cellSize + cellGap}px` }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Weeks */}
          <div className='relative flex gap-1'>
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className='flex flex-col gap-1'>
                {week.map((day, dayIndex) => {
                  const isFuture = day.date > new Date()
                  const isHovered =
                    hoveredDate &&
                    day.date.toDateString() === hoveredDate.toDateString()

                  return (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`rounded-sm transition-all ${
                        isFuture
                          ? 'cursor-default border border-transparent bg-transparent'
                          : `cursor-pointer ${getIntensityColor(
                              day.completed,
                              habitType,
                            )}`
                      } ${
                        isHovered && !isFuture
                          ? 'ring-primary z-10 scale-110 ring-2'
                          : !isFuture
                            ? 'hover:ring-primary/50 hover:ring-1'
                            : ''
                      }`}
                      style={{
                        width: `${cellSize}px`,
                        height: `${cellSize}px`,
                      }}
                      onMouseEnter={() => !isFuture && setHoveredDate(day.date)}
                      onMouseLeave={() => setHoveredDate(null)}
                      onClick={() => !isFuture && onDateClick?.(day.date)}
                      title={
                        isFuture
                          ? ''
                          : `${formatDate(day.date)}: ${
                              day.completed
                                ? habitType === 'good'
                                  ? 'Выполнено'
                                  : 'День без срыва'
                                : habitType === 'good'
                                  ? 'Не выполнено'
                                  : 'Был срыв'
                            }`
                      }
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend and Tooltip */}
      <div className='text-light-gray flex items-center justify-between pt-2 text-sm'>
        <div className='flex items-center gap-4'>
          <span className='text-xs'>Меньше</span>
          <div className='flex items-center gap-2'>
            <div
              className={`rounded-sm ${getIntensityColor(false, habitType)}`}
              style={{ width: '12px', height: '12px' }}
            />
            <span className='text-xs'>Не выполнено</span>
          </div>
          <div className='flex items-center gap-2'>
            <div
              className={`rounded-sm ${getIntensityColor(true, habitType)}`}
              style={{ width: '12px', height: '12px' }}
            />
            <span className='text-xs'>
              {habitType === 'good' ? 'Выполнено' : 'День без срыва'}
            </span>
          </div>
          <span className='text-xs'>Больше</span>
        </div>

        {hoveredDate &&
          (() => {
            const hoveredDay = activityData.find(
              (d) => d.date.toDateString() === hoveredDate.toDateString(),
            )
            const isCompleted = hoveredDay?.completed || false
            return (
              <div className='border-muted/50 bg-background rounded border px-3 py-1.5 text-xs text-white'>
                <strong>{formatDate(hoveredDate)}</strong>
                {': '}
                {habitType === 'good'
                  ? isCompleted
                    ? 'Выполнено'
                    : 'Не выполнено'
                  : isCompleted
                    ? 'День без срыва'
                    : 'Был срыв'}
              </div>
            )
          })()}
      </div>
    </div>
  )
}
