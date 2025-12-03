'use client'

import { Flame, Trophy } from 'lucide-react'
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const weekData = [
  { day: 'ПН', value: 20 },
  { day: 'ВТ', value: 16 },
  { day: 'СР', value: 6 },
  { day: 'ЧТ', value: 12 },
  { day: 'ПТ', value: 18 },
  { day: 'СБ', value: 10 },
  { day: 'ВС', value: 15 },
]

export default function DashboardPreview() {
  const currentStreak = 5
  const maxStreak = 12
  const totalValue = weekData.reduce((sum, item) => sum + item.value, 0)
  const averageValue = totalValue / weekData.length
  const targetValue = 20
  const percentage = Math.round((averageValue / targetValue) * 100)

  return (
    <section className='bg-dark-gray border-gray rounded-2xl border-8 p-5 max-sm:rounded-xl max-sm:border-4 max-sm:p-3.5'>
      <div className='mb-3.5 flex items-center justify-between max-sm:mb-3'>
        <div>
          <h4 className='mb-1 text-lg font-medium text-white max-sm:mb-0.5 max-sm:text-base'>
            Чтение
          </h4>
          <p className='text-light-gray/90 text-xs max-sm:text-[10px]'>
            Среднее: {Math.round(averageValue)} мин
          </p>
        </div>
        <div className='text-right'>
          <div className='text-primary text-xl font-semibold max-sm:text-lg'>
            {percentage}%
          </div>
          <div className='text-light-gray/90 text-xs max-sm:text-[10px]'>
            неделя
          </div>
        </div>
      </div>

      <div className='bg-gray mb-3.5 rounded-lg p-3.5 max-sm:mb-3 max-sm:rounded-md max-sm:p-3'>
        <div className='grid grid-cols-2 gap-3 max-sm:gap-2.5'>
          <div className='flex items-center gap-2.5 max-sm:gap-2'>
            <div className='bg-orange/10 flex size-10 shrink-0 items-center justify-center rounded-lg max-sm:size-8 max-sm:rounded-md'>
              <Flame className='text-orange size-5 max-sm:size-4' />
            </div>
            <div>
              <div className='text-light-gray/90 text-xs max-sm:text-[10px]'>
                Текущая
              </div>
              <div className='text-base font-semibold text-white max-sm:text-sm'>
                {currentStreak} дней
              </div>
            </div>
          </div>

          <div className='flex items-center gap-2.5 max-sm:gap-2'>
            <div className='bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg max-sm:size-8 max-sm:rounded-md'>
              <Trophy className='text-primary size-5 max-sm:size-4' />
            </div>
            <div>
              <div className='text-light-gray/90 text-xs max-sm:text-[10px]'>
                Макс.
              </div>
              <div className='text-base font-semibold text-white max-sm:text-sm'>
                {maxStreak} дней
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='bg-gray rounded-lg p-3.5 max-sm:rounded-md max-sm:p-3'>
        <ResponsiveContainer width='100%' height={150}>
          <LineChart data={weekData}>
            <XAxis
              dataKey='day'
              tick={{ fill: '#b3b3b3', fontSize: 12 }}
              axisLine={{ stroke: '#3d4348' }}
              tickLine={{ stroke: '#3d4348' }}
            />
            <YAxis
              tick={{ fill: '#b3b3b3', fontSize: 12 }}
              axisLine={{ stroke: '#3d4348' }}
              tickLine={{ stroke: '#3d4348' }}
              domain={[0, 20]}
            />
            <Line
              type='monotone'
              dataKey='value'
              stroke='var(--primary)'
              strokeWidth={2}
              dot={{ fill: 'var(--primary)', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
