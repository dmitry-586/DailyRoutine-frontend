'use client'

import { DashboardHabits } from '@/features/dashboard/DashboardHabits'
import { WeekCalendar } from '@/features/dashboard/WeekCalendar'
import { PageHeader } from '@/shared/ui'
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
      <div className='flex max-w-[500px] flex-col gap-4'>
        <h3 className='flex h-9 w-full items-center justify-center text-lg font-semibold text-white max-xl:justify-start'>
          Статистика
        </h3>
        <div className='bg-gray flex h-[200px] min-w-[300px] items-center justify-center rounded-lg max-xl:h-[110px]'>
          <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent' />
        </div>
        <div className='bg-gray flex h-[95px] min-w-[300px] items-center justify-center rounded-lg'>
          <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent' />
        </div>
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
