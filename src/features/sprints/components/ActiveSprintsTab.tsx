import type { SprintWithProgress } from '../types'
import { EmptyState, SprintCard } from './index'

interface ActiveSprintsTabProps {
  currentSprints: SprintWithProgress[]
}

export function ActiveSprintsTab({ currentSprints }: ActiveSprintsTabProps) {
  if (currentSprints.length === 0) {
    return (
      <EmptyState
        title='Выберите спринты из вкладки "Доступные"'
        description=''
      />
    )
  }

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      {currentSprints.map((sprint) => (
        <SprintCard key={sprint.id} sprint={sprint} />
      ))}
    </div>
  )
}
