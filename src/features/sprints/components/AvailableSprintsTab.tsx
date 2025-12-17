import type { SprintWithProgress } from '../types'
import { AvailableSprintCard, EmptyState } from './index'

interface AvailableSprintsTabProps {
  availableSprints: SprintWithProgress[]
  isMaxSelected: boolean
  onToggleSprint: (sprintId: number) => void
}

export function AvailableSprintsTab({
  availableSprints,
  isMaxSelected,
  onToggleSprint,
}: AvailableSprintsTabProps) {
  if (availableSprints.length === 0) {
    return (
      <EmptyState title='Все активные спринты уже добавлены' description='' />
    )
  }

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      {availableSprints.map((sprint) => (
        <AvailableSprintCard
          key={sprint.id}
          sprint={sprint}
          isMaxSelected={isMaxSelected}
          onToggle={() => onToggleSprint(sprint.id)}
        />
      ))}
    </div>
  )
}
