import dynamic from 'next/dynamic'
import { ComponentType } from 'react'
import LandingLayout from '../../../shared/model/providers/LandingLayout'
import { howWorkStages } from './config'
import StageCard from './stages/StageCard'
import HabitFormPreview from './stages/previews/HabitFormPreview'
import TelegramNotificationPreview from './stages/previews/TelegramNotificationPreview'
import type { HowWorkVisualId } from './types'

const DashboardPreview = dynamic(
  () => import('./stages/previews/DashboardPreview'),
  {
    ssr: false,
    loading: () => (
      <div className='bg-dark-gray/50 border-gray/60 h-[320px] animate-pulse rounded-2xl border-8 max-sm:h-[300px] max-sm:rounded-xl max-sm:border-4' />
    ),
  },
)

const VISUAL_COMPONENTS: Record<
  HowWorkVisualId,
  ComponentType<Record<string, never>>
> = {
  'habit-form': HabitFormPreview,
  'telegram-reminders': TelegramNotificationPreview,
  'progress-dashboard': DashboardPreview,
}

export default function HowWorkSection() {
  return (
    <LandingLayout className='max-lg:max-w-3xl' backgroundColor='dark-gray'>
      <section id='how-it-works' className='py-16 max-sm:py-12'>
        <div className='flex flex-col gap-3 text-center'>
          <h2 className='text-4xl font-semibold max-sm:text-3xl'>
            Как это работает
          </h2>
          <p className='text-light-gray mx-auto max-w-2xl max-sm:px-4 max-sm:text-sm'>
            Умный трекер привычек с гибкой настройкой и удобным отслеживанием
            прогресса
          </p>
        </div>

        <div className='mt-12 space-y-12 max-lg:mt-8 max-sm:space-y-8'>
          {howWorkStages.map(({ visualId, ...stage }) => {
            const VisualComponent = VISUAL_COMPONENTS[visualId]
            return (
              <StageCard
                key={stage.id}
                {...stage}
                visual={<VisualComponent />}
              />
            )
          })}
        </div>
      </section>
    </LandingLayout>
  )
}
