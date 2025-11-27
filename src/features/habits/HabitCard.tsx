'use client'

import { Habit } from '@/shared/types/habit.types'
import { Button } from '@/shared/ui/Button'
import Modal from '@/shared/ui/Modal'
import { Progress } from '@/shared/ui/Progress'
import {
  Archive,
  ArchiveRestore,
  Check,
  Clock,
  Flame,
  Pencil,
  Target,
  Trash2,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'

interface HabitCardProps extends Habit {
  onComplete?: (habit: Habit) => void
  onClick?: () => void
  onEdit?: (habit: Habit) => void
  onDelete?: (id: string) => void
  onToggleActive?: (habit: Habit) => void
}

export function HabitCard({
  id,
  title,
  type,
  format,
  current,
  target,
  unit = '',
  streak,
  completed = false,
  isActive = true,
  onComplete,
  onClick,
  onEdit,
  onDelete,
  onToggleActive,
}: HabitCardProps) {
  const [isCompleted, setIsCompleted] = useState(completed)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  // Синхронизируем состояние с пропсами
  useEffect(() => {
    setIsCompleted(completed)
  }, [completed])

  // Для вредных привычек логика инвертирована:
  // - completed = true означает "день прошел без срыва" (хорошо)
  // - completed = false означает "был срыв" (плохо)
  const progress =
    format === 'binary'
      ? isCompleted
        ? 100
        : 0
      : Math.min((current / target) * 100, 100)

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newCompleted = !isCompleted
    setIsCompleted(newCompleted)

    onComplete?.({
      id,
      title,
      type,
      format,
      current,
      target,
      unit,
      streak,
      completed: newCompleted,
      isActive,
    })
  }

  const handleRelapse = (e: React.MouseEvent) => {
    e.stopPropagation()
    // Для вредных привычек: отметка срыва
    setIsCompleted(false)
    onComplete?.({
      id,
      title,
      type,
      format,
      current,
      target,
      unit,
      streak,
      completed: false,
    })
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit?.({
      id,
      title,
      type,
      format,
      current,
      target,
      unit,
      streak,
      completed: isCompleted,
      isActive,
    })
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = () => {
    onDelete?.(id)
    setShowDeleteDialog(false)
  }

  const getIcon = () => {
    if (format === 'time') return <Clock className='h-4 w-4' />
    if (format === 'count') return <Target className='h-4 w-4' />
    return null
  }

  return (
    <>
      <div
        className={`bg-gray relative cursor-pointer rounded-lg border p-4 transition-all duration-200 ${
          !isActive
            ? 'border-light-gray/20 hover:border-light-gray/30 opacity-50'
            : isCompleted && type === 'good'
              ? 'border-green/30 hover:border-green/50 hover:shadow-green/10 hover:shadow-lg'
              : isCompleted && type === 'bad'
                ? 'border-green/30 hover:border-green/50 hover:shadow-green/10 hover:shadow-lg'
                : 'border-light-gray/10 hover:border-primary/30 hover:bg-gray/95 hover:shadow-primary/10 hover:shadow-lg'
        }`}
        onClick={onClick}
      >
        {/* Header */}
        <div className='mb-3 flex items-start justify-between'>
          <div className='min-w-0 flex-1'>
            <div className='mb-1 flex items-center gap-2'>
              <h3 className='truncate text-base font-medium text-white'>
                {title}
              </h3>
            </div>
            {format !== 'binary' && (
              <div className='text-light-gray flex items-center gap-2 text-xs'>
                {getIcon()}
                <span>
                  {current} / {target} {unit}
                </span>
              </div>
            )}
          </div>
          <div className='border-orange/20 bg-orange/10 ml-2 flex flex-shrink-0 items-center gap-1 rounded border px-2 py-1'>
            <Flame
              className={`h-3.5 w-3.5 ${
                streak > 0 ? 'text-orange' : 'text-light-gray'
              }`}
            />
            <span
              className={`text-xs font-medium ${
                streak > 0 ? 'text-orange' : 'text-light-gray'
              }`}
            >
              {streak}
            </span>
          </div>
        </div>

        {/* Progress Bar - только для полезных привычек с count/time */}
        {type === 'good' && format !== 'binary' && (
          <div className='mb-3'>
            <Progress
              value={progress}
              className='h-2'
              indicatorClassName='bg-green'
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className='flex items-center gap-2'>
          {type === 'good' ? (
            <Button
              onClick={handleComplete}
              className={`h-9 flex-1 text-sm ${
                isCompleted ? 'bg-green hover:bg-green/90' : ''
              }`}
            >
              <Check className='mr-1.5 h-4 w-4' />
              {isCompleted ? 'Выполнено' : 'Отметить'}
            </Button>
          ) : (
            <Button
              onClick={handleRelapse}
              variant={isCompleted ? 'primary' : 'default'}
              className={`h-9 flex-1 text-sm ${
                !isCompleted ? 'bg-red hover:bg-red/90' : ''
              }`}
            >
              <X className='mr-1.5 h-4 w-4' />
              Сорвался
            </Button>
          )}
          {(onEdit || onDelete || onToggleActive) && (
            <div className='flex flex-shrink-0 gap-1'>
              {onToggleActive && (
                <button
                  className='bg-light-gray/20 hover:bg-light-gray/40 flex h-9 w-9 items-center justify-center rounded-lg transition-all'
                  onClick={(e) => {
                    e.stopPropagation()
                    onToggleActive({
                      id,
                      title,
                      type,
                      format,
                      current,
                      target,
                      unit,
                      streak,
                      completed: isCompleted,
                      isActive: !isActive,
                    })
                  }}
                >
                  {isActive ? (
                    <Archive className='text-light-gray h-4 w-4' />
                  ) : (
                    <ArchiveRestore className='text-primary h-4 w-4' />
                  )}
                </button>
              )}
              {onEdit && (
                <button
                  className='bg-primary/20 hover:bg-primary/40 flex h-9 w-9 items-center justify-center rounded-lg transition-all'
                  onClick={handleEdit}
                >
                  <Pencil className='text-primary h-4 w-4' />
                </button>
              )}
              {onDelete && (
                <button
                  className='bg-red/20 hover:bg-red/40 flex h-9 w-9 items-center justify-center rounded-lg transition-all'
                  onClick={handleDeleteClick}
                >
                  <Trash2 className='text-red h-4 w-4' />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Modal
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        title='Удалить привычку?'
        className='border-light-gray/20 bg-gray text-white'
      >
        <p className='text-light-gray'>
          Вы уверены, что хотите удалить привычку &quot;{title}&quot;? Это
          действие нельзя отменить.
        </p>
        <div className='mt-6 flex justify-end gap-3'>
          <Button variant='primary' onClick={() => setShowDeleteDialog(false)}>
            Отмена
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            className='bg-red hover:bg-red/90'
          >
            Удалить
          </Button>
        </div>
      </Modal>
    </>
  )
}
