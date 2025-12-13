'use client'

import type { Habit } from '@/shared/types'
import { useState } from 'react'

export interface UseHabitModalsReturn {
  // Create modal
  isCreateModalOpen: boolean
  openCreateModal: () => void
  closeCreateModal: () => void

  // Edit modal
  isEditModalOpen: boolean
  habitToEdit: Habit | null
  openEditModal: (habit: Habit) => void
  closeEditModal: () => void
}

export function useHabitModals(): UseHabitModalsReturn {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null)

  const openCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const closeCreateModal = () => {
    setIsCreateModalOpen(false)
  }

  const openEditModal = (habit: Habit) => {
    setHabitToEdit(habit)
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setHabitToEdit(null)
  }

  return {
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    isEditModalOpen,
    habitToEdit,
    openEditModal,
    closeEditModal,
  }
}
