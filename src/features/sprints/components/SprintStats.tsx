import { Award, Target, Trophy } from 'lucide-react'
import { MAX_SELECTED_SPRINTS } from '../config/constants'
import type { SprintWithProgress } from '../types'
import { calculateCompletionPercentage, calculateTotalProgress } from '../utils'
import { StatCard } from './StatCard'

interface SprintStatsProps {
  currentSprints: SprintWithProgress[]
}

export function SprintStats({ currentSprints }: SprintStatsProps) {
  const completedSprints = currentSprints.filter(
    (sprint) => sprint.isCompleted,
  ).length

  const totalProgress = calculateTotalProgress(currentSprints)
  const completionPercentage = calculateCompletionPercentage(
    completedSprints,
    currentSprints.length,
  )

  return (
    <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-3'>
      <StatCard
        icon={Target}
        label='Активные задания'
        value={currentSprints.length}
        maxValue={MAX_SELECTED_SPRINTS}
        iconColor='primary'
        showSuccess={currentSprints.length >= MAX_SELECTED_SPRINTS}
        successText='✓ Максимум достигнут'
      />

      <StatCard
        icon={Trophy}
        label='Выполнено'
        value={completedSprints}
        maxValue={currentSprints.length}
        iconColor='green'
        showSuccess={completedSprints > 0 && currentSprints.length > 0}
        successText={`${completionPercentage}% выполнено`}
      />

      <StatCard
        icon={Award}
        label='Общий прогресс'
        value={Math.round(totalProgress)}
        suffix='%'
        iconColor='orange'
        showProgress
        progressValue={totalProgress}
      />
    </div>
  )
}
