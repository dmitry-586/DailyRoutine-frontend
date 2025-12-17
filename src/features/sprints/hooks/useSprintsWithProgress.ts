import { useSprintProgress, useSprints } from '@/shared/model/hooks'

import type { SprintWithProgress } from '../types'

export function useSprintsWithProgress() {
  const { data: sprints = [], isLoading: isSprintsLoading } = useSprints()
  const { data: progress = [], isLoading: isProgressLoading } =
    useSprintProgress()

  const isLoading = isSprintsLoading || isProgressLoading

  const activeSprints = sprints.filter((sprint) => sprint.is_active)

  const progressBySprintId = progress.reduce<Record<number, number>>(
    (acc, item) => {
      acc[item.sprint_id] = item.current_days
      return acc
    },
    {},
  )

  const sprintsWithProgress: SprintWithProgress[] = activeSprints.map(
    (sprint) => {
      const currentDays = progressBySprintId[sprint.id] ?? 0
      const total = sprint.target_days

      return {
        id: sprint.id,
        title: sprint.title,
        reward: sprint.coins_reward,
        progress: currentDays,
        total,
        isCompleted: currentDays >= total,
      }
    },
  )

  return {
    sprintsWithProgress,
    isLoading,
  }
}
