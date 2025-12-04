'use client'

import { DashboardHabits } from '@/features/dashboard/DashboardHabits'
import { WeekCalendar } from '@/features/dashboard/WeekCalendar'
import { PageHeader } from '@/shared/ui/PageHeader'
import { HomeIcon } from 'lucide-react'
import dynamic from 'next/dynamic'

const Stats = dynamic(
  () =>
    import('@/features/dashboard/Stats').then((mod) => ({
      default: mod.Stats,
    })),
  {
    ssr: false,
    loading: () => (
      <div className='border-light-gray/20 bg-gray flex h-[400px] w-full items-center justify-center rounded-lg border'>
        <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent' />
      </div>
    ),
  },
)

export default function DashboardPage() {
  return (
    <>
      <PageHeader title='Главная' icon={HomeIcon} />
      <WeekCalendar />
      <div className='mt-6 flex w-full gap-4 max-xl:flex-col'>
        <DashboardHabits />
        <Stats />
      </div>
    </>
  )
}
