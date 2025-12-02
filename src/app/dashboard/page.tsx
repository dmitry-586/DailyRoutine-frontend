'use client'

import { DashboardHabits } from '@/features/dashboard/DashboardHabits'
import { Stats } from '@/features/dashboard/Stats'
import { WeekCalendar } from '@/features/dashboard/WeekCalendar'
import { PageHeader } from '@/shared/ui/PageHeader'
import { HomeIcon } from 'lucide-react'

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title='Главная'
        icon={HomeIcon}
      />
      <WeekCalendar />
      <div className='mt-6 flex w-full gap-4 max-xl:flex-col'>
        <DashboardHabits />
        <Stats />
      </div>
    </>
  )
}
