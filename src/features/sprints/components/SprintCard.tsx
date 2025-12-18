import { Button, Progress } from '@/shared/ui'
import { Award, Clock, Trophy } from 'lucide-react'

import type { SprintWithProgress } from '../types'
import { calculateProgressPercent } from '../utils'

interface SprintCardProps {
  sprint: SprintWithProgress
}

export function SprintCard({ sprint }: SprintCardProps) {
  const progressPercent = calculateProgressPercent(
    sprint.progress,
    sprint.total,
  )
  const remainingDays = Math.max(sprint.total - sprint.progress, 0)

  return (
    <div
      className={`from-gray to-muted rounded-lg border bg-gradient-to-br p-6 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] ${
        sprint.isCompleted
          ? 'border-green/40 shadow-green/10 hover:shadow-green/20 shadow-lg hover:shadow-xl'
          : 'border-light-gray/10 hover:border-primary/30 hover:shadow-primary/10 hover:shadow-lg'
      }`}
    >
      <div className='mb-4 flex items-start justify-between'>
        <div className='flex-1'>
          <h3 className='mb-2 font-semibold text-white'>{sprint.title}</h3>
          <div className='text-light-gray flex items-center gap-2 text-sm'>
            <Clock className='h-4 w-4' />
            <span>
              {sprint.progress} / {sprint.total}
            </span>
          </div>
        </div>
        <div className='border-primary/30 bg-primary/20 flex items-center gap-1 rounded-full border px-3 py-1.5'>
          <Award className='text-primary h-4 w-4' />
          <span className='text-primary font-semibold'>{sprint.reward}</span>
        </div>
      </div>

      <div className='mb-4'>
        <div className='text-light-gray mb-1 flex items-center justify-between text-xs'>
          <span>Прогресс</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <Progress
          value={progressPercent}
          className='h-2.5'
          indicatorClassName={sprint.isCompleted ? 'bg-green' : 'bg-primary'}
        />
      </div>

      {sprint.isCompleted ? (
        <Button variant='green' className='w-full'>
          <Trophy className='mr-2 h-4 w-4' />
          Награда получена
        </Button>
      ) : (
        <div className='text-light-gray py-2 text-center text-sm'>
          Осталось: {remainingDays} дней
        </div>
      )}
    </div>
  )
}
