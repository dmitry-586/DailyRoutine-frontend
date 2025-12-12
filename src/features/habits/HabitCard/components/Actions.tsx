import type { HabitType } from '@/shared/types/habit.types'
import { Button } from '@/shared/ui'
import { Check, Pencil, Trash2, X } from 'lucide-react'
import type React from 'react'
import type { HabitCardActionHandlers, HabitCardActionsProps } from '../types'

type PrimaryActionConfig = {
  label: string
  icon: React.ReactNode
  variant: 'primary' | 'default' | undefined
  className: string
}

const getPrimaryActionConfig = (
  type: HabitType,
  isCompleted: boolean,
): PrimaryActionConfig => {
  const isBeneficial = type === 'beneficial'

  return {
    label: isBeneficial ? (isCompleted ? 'Выполнено' : 'Отметить') : 'Сорвался',
    icon: isBeneficial ? (
      <Check className='mr-1.5 h-4 w-4' />
    ) : (
      <X className='mr-1.5 h-4 w-4' />
    ),
    variant: isBeneficial ? undefined : isCompleted ? 'primary' : 'default',
    className:
      (isBeneficial &&
        isCompleted &&
        'bg-green border-green hover:bg-green/90') ||
      (!isBeneficial && !isCompleted && 'bg-red border-red hover:bg-red/80') ||
      '',
  }
}

type SecondaryActionKey = 'edit' | 'delete'

interface SecondaryAction {
  key: SecondaryActionKey
  icon: React.ReactNode
  onClick:
    | HabitCardActionHandlers['onEdit']
    | HabitCardActionHandlers['onDelete']
  className: string
}

export const HabitCardActions = ({
  type,
  isCompleted,
  isActive,
  handlers,
}: HabitCardActionsProps) => {
  const { onPrimary, onEdit, onDelete } = handlers
  const primaryConfig = getPrimaryActionConfig(type, isCompleted)

  const secondaryActions: SecondaryAction[] = [
    onEdit && {
      key: 'edit',
      icon: <Pencil className='text-primary h-4 w-4' />,
      onClick: onEdit,
      className:
        'bg-primary/20 hover:bg-primary/40 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-all',
    },
    onDelete && {
      key: 'delete',
      icon: <Trash2 className='text-red h-4 w-4' />,
      onClick: onDelete,
      className:
        'bg-red/20 hover:bg-red/40 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-all',
    },
  ].filter(Boolean) as SecondaryAction[]

  return (
    <div className='mt-auto flex items-center gap-2'>
      <Button
        onClick={onPrimary}
        disabled={!isActive}
        variant={primaryConfig.variant}
        className={`h-9 flex-1 text-sm ${primaryConfig.className}`}
      >
        {primaryConfig.icon}
        {primaryConfig.label}
      </Button>

      {secondaryActions.length > 0 && (
        <div className='flex flex-shrink-0 gap-1'>
          {secondaryActions.map(({ key, icon, onClick, className }) => (
            <button key={key} className={className} onClick={onClick}>
              {icon}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
