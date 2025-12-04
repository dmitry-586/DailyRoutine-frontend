import type { UpdateHabitRequest } from '@/shared/types/habit.types'
import { useState } from 'react'
import type { HabitCardProps } from './types'

export function useHabitCard({ data, handlers }: HabitCardProps) {
  const { id, is_done = false, is_active = true } = data
  const { onComplete, onEdit, onDelete, onToggleActive } = handlers

  const [isCompleted, setIsCompleted] = useState(is_done)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation()
    const nextCompleted = !isCompleted
    setIsCompleted(nextCompleted)
    onComplete?.({ ...data, is_done: nextCompleted })
  }

  const handleRelapse = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsCompleted(false)
    onComplete?.({ ...data, is_done: false })
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowEditModal(true)
  }

  const handleToggleActive = () => {
    onToggleActive?.({ ...data, is_done: isCompleted, is_active: !is_active })
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    onDelete?.(id)
    setShowDeleteDialog(false)
  }

  const handleEditSave = (updatedData: UpdateHabitRequest) => {
    onEdit?.({ ...data, ...updatedData } as typeof data)
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
    isActive: is_active,
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
