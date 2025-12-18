import { useSprintProgress, useSprints } from '@/shared/model/hooks'

import type { SprintWithProgress } from '../types'

export function useSprintsWithProgress() {
  const { data: activeSprints = [], isLoading: isSprintsLoading } = useSprints({
    select: (sprints) => sprints.filter((sprint) => sprint.is_active),
  })

  const { data: progressBySprintId = {}, isLoading: isProgressLoading } =
    useSprintProgress({
      select: (progress) =>
        progress.reduce<Record<number, number>>((acc, item) => {
          acc[item.sprint_id] = item.current_days
          return acc
        }, {}),
    })

  const isLoading = isSprintsLoading || isProgressLoading

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
