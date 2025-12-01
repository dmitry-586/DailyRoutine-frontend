import { useState } from 'react'
import type { HabitCardProps } from './types'

export function useHabitCard({ data, handlers }: HabitCardProps) {
  const { id, completed = false, isActive = true } = data
  const { onComplete, onEdit, onDelete, onToggleActive } = handlers

  const [isCompleted, setIsCompleted] = useState(completed)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation()
    const nextCompleted = !isCompleted
    setIsCompleted(nextCompleted)
    onComplete?.({ ...data, completed: nextCompleted })
  }

  const handleRelapse = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsCompleted(false)
    onComplete?.({ ...data, completed: false })
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowEditModal(true)
  }

  const handleToggleActive = () => {
    onToggleActive?.({ ...data, completed: isCompleted, isActive: !isActive })
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    onDelete?.(id)
    setShowDeleteDialog(false)
  }

  const handleEditSave = (updatedHabit: typeof data) => {
    onEdit?.(updatedHabit)
    setShowEditModal(false)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteDialog(false)
  }

  return {
    isCompleted,
    isActive,
    showDeleteDialog,
    showEditModal,
    handleComplete,
    handleRelapse,
    handleEdit,
    handleToggleActive,
    handleDeleteClick,
    handleEditSave,
    handleCloseEditModal,
    handleDeleteConfirm,
    handleCloseDeleteModal,
  }
}
