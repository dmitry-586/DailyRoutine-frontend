import { Button } from '@/shared/ui/Button'
import { Check, Pencil, Trash2, X } from 'lucide-react'
import type { HabitCardActionsProps } from '../types'

export const HabitCardActions = ({
  type,
  isCompleted,
  handlers,
}: HabitCardActionsProps) => {
  const { onComplete, onRelapse, onEdit, onDelete } = handlers

  return (
    <div className='mt-auto flex items-center gap-2'>
      {type === 'good' ? (
        <Button
          onClick={onComplete}
          className={`h-9 flex-1 text-sm ${
            isCompleted && 'bg-green hover:bg-green/90'
          }`}
        >
          <Check className='mr-1.5 h-4 w-4' />
          {isCompleted ? 'Выполнено' : 'Отметить'}
        </Button>
      ) : (
        <Button
          onClick={onRelapse}
          variant={isCompleted ? 'primary' : 'default'}
          className={`h-9 flex-1 text-sm ${
            !isCompleted && 'bg-red border-red hover:bg-red/80'
          }`}
        >
          <X className='mr-1.5 h-4 w-4' />
          Сорвался
        </Button>
      )}

      {(onEdit || onDelete) && (
        <div className='flex flex-shrink-0 gap-1'>
          {onEdit && (
            <button
              className='bg-primary/20 hover:bg-primary/40 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-all'
              onClick={onEdit}
            >
              <Pencil className='text-primary h-4 w-4' />
            </button>
          )}

          {onDelete && (
            <button
              className='bg-red/20 hover:bg-red/40 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-all'
              onClick={onDelete}
            >
              <Trash2 className='text-red h-4 w-4' />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
