import { useState } from 'react'
import type { HabitCardProps } from './types'

export function useHabitCard({ data, handlers }: HabitCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation()
    handlers.onComplete?.({ ...data, is_done: !data.is_done })
  }

  const handleRelapse = (e: React.MouseEvent) => {
    e.stopPropagation()
    handlers.onComplete?.({ ...data, is_done: false })
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    handlers.onEdit?.(data)
  }

  const handleToggleActive = () => {
    handlers.onToggleActive?.({ ...data, is_active: !data.is_active })
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    handlers.onDelete?.(data.id)
    setShowDeleteDialog(false)
  }

  return {
    isCompleted: data.is_done,
    isActive: data.is_active,
    showDeleteDialog,
    handleComplete,
    handleRelapse,
    handleEdit,
    handleToggleActive,
    handleDeleteClick,
    handleDeleteConfirm,
    closeDeleteDialog: () => setShowDeleteDialog(false),
  }
}
