'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import { Progress } from '@/components/ui/Progress'
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
import type { Habit } from './HabitModal'

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
              className={`h-9 flex-1 text-sm transition-all duration-200 ${
                isCompleted
                  ? 'bg-green hover:bg-green/90 hover:shadow-green/20 hover:shadow-md'
                  : 'bg-primary hover:bg-primary/90 hover:shadow-primary/20 hover:shadow-md'
              }`}
            >
              <Check className='mr-1.5 h-4 w-4' />
              {isCompleted ? 'Выполнено' : 'Отметить'}
            </Button>
          ) : (
            <Button
              onClick={handleRelapse}
              className={`h-9 flex-1 text-sm transition-all duration-200 ${
                !isCompleted
                  ? 'bg-red hover:bg-red/90 hover:shadow-red/20 hover:shadow-md'
                  : 'border-light-gray/20 bg-background hover:border-light-gray/30 hover:bg-gray border'
              }`}
            >
              <X className='mr-1.5 h-4 w-4' />
              Сорвался
            </Button>
          )}
          {/* Action buttons - всегда видимы */}
          {(onEdit || onDelete || onToggleActive) && (
            <div className='flex flex-shrink-0 gap-1'>
              {onToggleActive && (
                <Button
                  size='icon'
                  variant='ghost'
                  className='bg-light-gray/20 hover:bg-light-gray/40 h-9 w-9 transition-all duration-200 hover:scale-105'
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
                </Button>
              )}
              {onEdit && (
                <Button
                  size='icon'
                  variant='ghost'
                  className='bg-primary/20 hover:bg-primary/40 h-9 w-9 transition-all duration-200 hover:scale-105'
                  onClick={handleEdit}
                >
                  <Pencil className='text-primary h-4 w-4' />
                </Button>
              )}
              {onDelete && (
                <Button
                  size='icon'
                  variant='ghost'
                  className='bg-red/20 hover:bg-red/40 h-9 w-9 transition-all duration-200 hover:scale-105'
                  onClick={handleDeleteClick}
                >
                  <Trash2 className='text-red h-4 w-4' />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className='border-light-gray/20 bg-gray text-white'>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить привычку?</AlertDialogTitle>
            <AlertDialogDescription className='text-light-gray'>
              Вы уверены, что хотите удалить привычку "{title}"? Это действие
              нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className='border-light-gray/20'>
              Отмена
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className='bg-red hover:bg-red/90'
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
