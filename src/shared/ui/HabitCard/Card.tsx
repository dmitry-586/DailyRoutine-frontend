'use client'

import { cn } from '@/shared/lib'
import { HabitCardActions } from './components/Actions'
import { HabitCardDeleteModal } from './components/DeleteModal'
import { HabitCardHeader } from './components/Header'
import { CARD_BASE_STYLES, getCardContainerClassName } from './config'
import type { HabitCardProps } from './types'
import { useHabitCard } from './useHabitCard'

export function HabitCard(props: HabitCardProps) {
  const {
    isCompleted,
    isActive,
    showDeleteDialog,
    handleComplete,
    handleRelapse,
    handleEdit,
    handleToggleActive,
    handleDeleteClick,
    handleDeleteConfirm,
    closeDeleteDialog,
  } = useHabitCard(props)

  const { data } = props
  const { title, is_beneficial } = data

  const cardClassName = getCardContainerClassName({
    isActive,
    isCompleted,
  })

  return (
    <>
      <div className={cn(CARD_BASE_STYLES, cardClassName)}>
        <HabitCardHeader data={data} />

        <HabitCardActions
          isBeneficial={is_beneficial}
          isCompleted={isCompleted}
          handlers={{
            onComplete: handleComplete,
            onRelapse: handleRelapse,
            onEdit: handleEdit,
            onDelete: handleDeleteClick,
            onToggleActive: handleToggleActive,
          }}
        />
      </div>

      <HabitCardDeleteModal
        title={title}
        isOpen={showDeleteDialog}
        handlers={{
          onClose: closeDeleteDialog,
          onConfirm: handleDeleteConfirm,
        }}
      />
    </>
  )
}
