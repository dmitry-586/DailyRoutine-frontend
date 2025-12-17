import { useEffect, useState } from 'react'
import { MAX_SELECTED_SPRINTS } from '../config/constants'
import type { SprintWithProgress } from '../types'

export function useSprintSelection(
  sprints: SprintWithProgress[],
  isLoading: boolean,
) {
  const [selectedSprintIds, setSelectedSprintIds] = useState<number[]>([])

  useEffect(() => {
    if (!isLoading && sprints.length > 0 && selectedSprintIds.length === 0) {
      setSelectedSprintIds(
        sprints.slice(0, MAX_SELECTED_SPRINTS).map((sprint) => sprint.id),
      )
    }
  }, [isLoading, sprints, selectedSprintIds.length])

  const selectedIdsSet = new Set(selectedSprintIds)

  const toggleSprint = (sprintId: number) => {
    setSelectedSprintIds((prev) => {
      if (prev.includes(sprintId)) {
        return prev.filter((id) => id !== sprintId)
      }
      if (prev.length < MAX_SELECTED_SPRINTS) {
        return [...prev, sprintId]
      }
      return prev
    })
  }

  const currentSprints = sprints.filter((sprint) =>
    selectedIdsSet.has(sprint.id),
  )

  const availableSprints = sprints.filter(
    (sprint) => !selectedIdsSet.has(sprint.id),
  )

  const isMaxSelected = selectedSprintIds.length >= MAX_SELECTED_SPRINTS

  return {
    currentSprints,
    availableSprints,
    isMaxSelected,
    toggleSprint,
  }
}
