'use client'

import { DashboardHabits } from '@/features/dashboard/DashboardHabits'
import { Stats } from '@/features/dashboard/Stats'
import { WeekCalendar } from '@/features/dashboard/WeekCalendar'

export default function DashboardPage() {
  return (
    <>
      <WeekCalendar />
      <div className='mt-6 flex w-full gap-4 max-xl:flex-col'>
        <DashboardHabits />
        <Stats />
      </div>
    </>
  )
}
