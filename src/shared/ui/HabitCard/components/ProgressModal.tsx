import type { HabitFormat } from '@/shared/types/habit.types'
import { Button, Input, Modal } from '@/shared/ui'

interface HabitProgressModalProps {
  isOpen: boolean
  value: number
  remaining: number
  format: HabitFormat
  unit?: string | null
  onChange: (next: number) => void
  onClose: () => void
  onSave: () => void
  onReset: () => void
}

const getUnitLabel = (format: HabitFormat, unit?: string | null): string => {
  if (format === 'time') {
    return 'минут'
  }

  return unit ?? ''
}

export function HabitProgressModal({
  isOpen,
  value,
  remaining,
  format,
  unit,
  onChange,
  onClose,
  onSave,
  onReset,
}: HabitProgressModalProps) {
  const unitLabel = getUnitLabel(format, unit)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Отметить прогресс'
      className='max-w-md'
    >
      <div className='space-y-4'>
        <p className='text-light-gray text-sm'>
          Осталось выполнить: {remaining} {unitLabel || ''}
        </p>

        <Input
          type='number'
          min={1}
          label='Сколько выполнено?'
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          placeholder={`Укажите количество ${unitLabel || ''}`}
        />

        <div className='flex justify-end gap-2'>
          <Button variant='default' onClick={onReset}>
            Сбросить
          </Button>
          <Button variant='default' onClick={onClose}>
            Отмена
          </Button>
          <Button variant='primary' onClick={onSave}>
            Сохранить
          </Button>
        </div>
      </div>
    </Modal>
  )
}
