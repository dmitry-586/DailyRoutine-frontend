import type { SprintWithProgress } from '../types'

export function calculateProgressPercent(
  progress: number,
  total: number,
): number {
  if (total === 0) return 0
  return Math.min((progress / total) * 100, 100)
}

export function calculateTotalProgress(sprints: SprintWithProgress[]): number {
  if (sprints.length === 0) return 0

  const sum = sprints.reduce((acc, sprint) => {
    if (sprint.total === 0) return acc
    return acc + (sprint.progress / sprint.total) * 100
  }, 0)

  return sum / sprints.length
}

export function calculateCompletionPercentage(
  completed: number,
  total: number,
): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}
