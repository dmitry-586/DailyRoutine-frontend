'use client'

import { cn } from '@/shared/lib'
import { HabitCardActions } from './components/Actions'
import { HabitCardDeleteModal } from './components/DeleteModal'
import { HarmfulConfirmModal } from './components/HarmfulConfirmModal'
import { HabitCardHeader } from './components/Header'
import { HabitProgressModal } from './components/ProgressModal'
import { CARD_BASE_STYLES, getCardContainerClassName } from './config'
import type { HabitCardProps } from './types'
import { useHabitCard } from './useHabitCard'

export function HabitCard(props: HabitCardProps) {
  const {
    isCompleted,
    isActive,
    showDeleteDialog,
    showProgressModal,
    showHarmfulConfirm,
    progressValue,
    setProgressValue,
    remainingValue,
    handlePrimaryAction,
    handleEdit,
    handleDeleteClick,
    handleDeleteConfirm,
    handleProgressSave,
    handleHarmfulConfirm,
    handleResetProgress,
    closeDeleteDialog,
    closeProgressModal,
    closeHarmfulConfirm,
  } = useHabitCard(props)

  const { data } = props
  const { title, type } = data

  const cardClassName = getCardContainerClassName({
    isActive,
    isCompleted,
  })

  return (
    <>
      <div className={cn(CARD_BASE_STYLES, cardClassName)}>
        <HabitCardHeader data={data} />

        <HabitCardActions
          type={type}
          isCompleted={isCompleted}
          isActive={isActive}
          handlers={{
            onPrimary: handlePrimaryAction,
            onEdit: handleEdit,
            onDelete: handleDeleteClick,
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

      <HabitProgressModal
        isOpen={showProgressModal}
        value={progressValue}
        remaining={remainingValue}
        format={data.format}
        unit={data.unit}
        onChange={setProgressValue}
        onClose={closeProgressModal}
        onSave={handleProgressSave}
        onReset={handleResetProgress}
      />

      <HarmfulConfirmModal
        isOpen={showHarmfulConfirm}
        title={title}
        onClose={closeHarmfulConfirm}
        onConfirm={handleHarmfulConfirm}
      />
    </>
  )
}
