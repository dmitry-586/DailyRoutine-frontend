'use client'

import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import type { HabitCardClick, HabitCardProps } from '../types'

const MIN_PROGRESS_STEP = 1

export function useHabitCard({ data, handlers }: HabitCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showProgressModal, setShowProgressModal] = useState(false)
  const [showHarmfulConfirm, setShowHarmfulConfirm] = useState(false)
  const [progressValue, setProgressValue] = useState<number>(MIN_PROGRESS_STEP)

  const remainingValue = useMemo(
    () => Math.max(data.value - data.current_value, 0),
    [data.current_value, data.value],
  )

  const openProgressModal: HabitCardClick = (e) => {
    e.stopPropagation()
    const initialValue = remainingValue > 0 ? remainingValue : MIN_PROGRESS_STEP
    setProgressValue(initialValue)
    setShowProgressModal(true)
  }

  const openHarmfulConfirm: HabitCardClick = (e) => {
    e.stopPropagation()
    setShowHarmfulConfirm(true)
  }

  const handleBinaryToggle: HabitCardClick = (e) => {
    e.stopPropagation()
    const nextIsDone = !data.is_done
    const nextCurrent = nextIsDone ? data.value || 1 : 0
    handlers.onComplete?.({
      ...data,
      is_done: nextIsDone,
      current_value: nextCurrent,
    })
  }

  const handleProgressSave = () => {
    if (!Number.isFinite(progressValue)) {
      toast.error('Введите число')
      return
    }

    const safeProgress = Math.floor(progressValue)

    if (safeProgress < MIN_PROGRESS_STEP) {
      toast.error('Прогресс должен быть больше 0')
      return
    }

    const nextCurrent = Math.min(data.value, data.current_value + safeProgress)
    handlers.onComplete?.({
      ...data,
      current_value: nextCurrent,
      is_done: nextCurrent >= data.value,
    })
    setShowProgressModal(false)
  }

  const handleHarmfulConfirm = () => {
    const nextIsDone = !data.is_done
    handlers.onComplete?.({
      ...data,
      is_done: nextIsDone,
    })
    setShowHarmfulConfirm(false)
  }

  const handleResetProgress = () => {
    handlers.onComplete?.({
      ...data,
      is_done: false,
      current_value: 0,
    })
    setProgressValue(MIN_PROGRESS_STEP)
    setShowProgressModal(false)
  }

  const handleEdit: HabitCardClick = (e) => {
    e.stopPropagation()
    handlers.onEdit?.(data)
  }

  const handleToggleActive = () => {
    handlers.onToggleActive?.({ ...data, is_active: !data.is_active })
  }

  const handleDeleteClick: HabitCardClick = (e) => {
    e.stopPropagation()
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    handlers.onDelete?.(data.id)
    setShowDeleteDialog(false)
  }

  const handlePrimaryAction: HabitCardClick = (e) => {
    if (data.type === 'harmful') {
      openHarmfulConfirm(e)
      return
    }

    if (data.format === 'binary') {
      handleBinaryToggle(e)
      return
    }

    openProgressModal(e)
  }

  return {
    isCompleted: data.is_done,
    isActive: data.is_active,
    showDeleteDialog,
    showProgressModal,
    showHarmfulConfirm,
    progressValue,
    setProgressValue,
    remainingValue,
    handlePrimaryAction,
    handleEdit,
    handleToggleActive,
    handleDeleteClick,
    handleDeleteConfirm,
    handleProgressSave,
    handleHarmfulConfirm,
    handleResetProgress,
    closeDeleteDialog: () => setShowDeleteDialog(false),
    closeProgressModal: () => setShowProgressModal(false),
    closeHarmfulConfirm: () => setShowHarmfulConfirm(false),
  }
}
