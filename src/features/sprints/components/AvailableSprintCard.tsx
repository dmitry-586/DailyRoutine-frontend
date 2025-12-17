import { Button } from '@/shared/ui'
import { Award, Target } from 'lucide-react'
import { MAX_SELECTED_SPRINTS } from '../config/constants'
import type { SprintWithProgress } from '../types'

interface AvailableSprintCardProps {
  sprint: SprintWithProgress
  isMaxSelected: boolean
  onToggle: () => void
}

export function AvailableSprintCard({
  sprint,
  isMaxSelected,
  onToggle,
}: AvailableSprintCardProps) {
  return (
    <div className='border-light-gray/10 hover:border-primary/30 hover:shadow-primary/10 from-gray to-muted border bg-gradient-to-br p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'>
      <div className='mb-4 flex items-start justify-between'>
        <div className='flex-1'>
          <h3 className='mb-2 font-semibold text-white'>{sprint.title}</h3>
          <div className='text-light-gray flex items-center gap-2 text-sm'>
            <Target className='h-4 w-4' />
            <span>Цель: {sprint.total}</span>
          </div>
        </div>
        <div className='border-primary/30 bg-primary/20 flex items-center gap-1 rounded-full border px-3 py-1.5'>
          <Award className='text-primary h-4 w-4' />
          <span className='text-primary font-semibold'>{sprint.reward}</span>
        </div>
      </div>

      <Button
        onClick={onToggle}
        disabled={isMaxSelected}
        className='bg-primary hover:bg-primary/90 hover:shadow-primary/20 w-full transition-all duration-200 hover:scale-105 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100'
      >
        {isMaxSelected
          ? `Достигнут лимит (${MAX_SELECTED_SPRINTS}/${MAX_SELECTED_SPRINTS})`
          : 'Добавить в спринт'}
      </Button>
    </div>
  )
}
