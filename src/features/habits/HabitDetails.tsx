'use client'

import { Habit, HabitHistoryEntry } from '@/shared/types/habit.types'
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

  return last7Days.map((entry: HabitHistoryEntry, index: number) => {
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
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return sortedHistory.slice(0, 10).map((entry: HabitHistoryEntry) => {
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
  const completedDays = habit.history.filter((h) => h.completed).length

  // Рассчитываем средний прогресс
  let totalProgress = 0
  habit.history.forEach((entry: HabitHistoryEntry) => {
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
    <div className='bg-background min-h-screen p-4 sm:p-6'>
      <div className='mx-auto max-w-4xl'>
        {/* Header */}
        <button
          onClick={onBack}
          className='text-light-gray hover:bg-gray mb-6 flex items-center rounded-lg px-4 py-2 transition-all hover:text-white'
        >
          <ArrowLeft className='mr-2 h-4 w-4' />
          Назад
        </button>

        <div className='bg-gray mb-6 rounded-xl p-6'>
          <div className='mb-4 flex items-start justify-between'>
            <div>
              <h1 className='mb-2 text-white'>{habit.title}</h1>
              <div className='text-light-gray flex items-center gap-4 text-sm'>
                <span
                  className={`rounded-full px-3 py-1 ${
                    habit.type === 'good'
                      ? 'bg-green/20 text-green'
                      : 'bg-red/20 text-red'
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
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
            <div className='bg-background border-none p-4'>
              <div className='mb-2 flex items-center gap-2'>
                <Flame className='text-orange h-4 w-4' />
                <span className='text-light-gray text-sm'>Серия</span>
              </div>
              <p className='text-2xl text-white'>{habit.streak}</p>
            </div>

            <div className='bg-background border-none p-4'>
              <div className='mb-2 flex items-center gap-2'>
                <TrendingUp className='text-green h-4 w-4' />
                <span className='text-light-gray text-sm'>Прогресс</span>
              </div>
              <p className='text-2xl text-white'>{stats.progress}%</p>
            </div>

            <div className='bg-background border-none p-4'>
              <div className='mb-2 flex items-center gap-2'>
                <Calendar className='text-primary h-4 w-4' />
                <span className='text-light-gray text-sm'>Всего дней</span>
              </div>
              <p className='text-2xl text-white'>{stats.totalDays}</p>
            </div>

            <div className='bg-background border-none p-4'>
              <div className='mb-2 flex items-center gap-2'>
                <Target className='text-primary h-4 w-4' />
                <span className='text-light-gray text-sm'>Выполнено</span>
              </div>
              <p className='text-2xl text-white'>{stats.completedDays}</p>
            </div>
          </div>
        </div>

        {/* Chart or Activity Grid */}
        <div className='bg-gray mb-6 rounded-xl p-6'>
          {habit.format === 'binary' ? (
            <ActivityGrid
              habitType={habit.type}
              onDateClick={(date) => {
                console.log('Clicked date:', date)
                // Здесь можно добавить логику для отметки/изменения дня
              }}
            />
          ) : (
            <>
              <h3 className='mb-4 text-white'>График прогресса</h3>
              {chartData.length > 0 ? (
                <ResponsiveContainer width='100%' height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke='var(--muted)'
                    />
                    <XAxis dataKey='day' stroke='var(--light-gray)' />
                    <YAxis stroke='var(--light-gray)' domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--gray)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'var(--foreground)',
                      }}
                      formatter={(value: number) => [`${value}%`, 'Прогресс']}
                    />
                    <Line
                      type='monotone'
                      dataKey='value'
                      stroke='var(--primary)'
                      strokeWidth={2}
                      dot={{ fill: 'var(--primary)', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className='text-light-gray flex h-[250px] items-center justify-center'>
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
          <div className='bg-gray rounded-xl p-6'>
            <h3 className='mb-4 text-white'>История выполнений</h3>
            {history.length > 0 ? (
              <div className='space-y-3'>
                {history.map((entry, index) => (
                  <div
                    key={index}
                    className='bg-background flex items-center justify-between rounded-lg p-3'
                  >
                    <div className='flex items-center gap-3'>
                      <div
                        className={`h-3 w-3 rounded-full ${
                          entry.status === 'completed' ? 'bg-green' : 'bg-red'
                        }`}
                      />
                      <span className='text-white'>{entry.date}</span>
                    </div>
                    <span
                      className={
                        entry.status === 'completed' ? 'text-green' : 'text-red'
                      }
                    >
                      {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-light-gray py-8 text-center'>
                <p>История выполнений пока пуста</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
