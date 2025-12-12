import type { HabitFormat } from '@/shared/types/habit.types'
import { Button, Input, Modal, TimeInput } from '@/shared/ui'
import { Controller } from 'react-hook-form'
import { useProgressModal } from './useProgressModal'

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
  const { control, handleSubmit, errors, isSubmitting } = useProgressModal({
    isOpen,
    initialValue: value,
    remaining,
    onSave: (validatedValue) => {
      onChange(validatedValue)
      onSave()
    },
  })

  const remainingMinutes = remaining
  const isCompleted = remaining === 0

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Отметить прогресс'
      className='max-w-md'
    >
      <form onSubmit={handleSubmit}>
        <div className='space-y-4'>
          {format === 'time' ? (
            <>
              <p className='text-light-gray text-sm'>
                Осталось выполнить: {Math.floor(remainingMinutes / 60)} ч{' '}
                {remainingMinutes % 60} мин
              </p>
              <Controller
                name='value'
                control={control}
                render={({ field }) => (
                  <TimeInput
                    label='Сколько выполнено?'
                    name={field.name}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value)
                      const numValue = Number.parseInt(e.target.value, 10) || 0
                      onChange(numValue)
                    }}
                    onBlur={field.onBlur}
                    error={errors.value?.message}
                    disabled={isCompleted}
                  />
                )}
              />
            </>
          ) : (
            <>
              <p className='text-light-gray text-sm'>
                Осталось выполнить: {remaining} {unit || ''}
              </p>
              <Controller
                name='value'
                control={control}
                render={({ field }) => (
                  <Input
                    type='number'
                    min={1}
                    max={remaining}
                    label='Сколько выполнено?'
                    placeholder={`Укажите количество ${unit || ''}`}
                    error={errors.value?.message}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.target.value)
                      const numValue = Number.parseInt(e.target.value, 10) || 0
                      onChange(numValue)
                    }}
                    onBlur={field.onBlur}
                    disabled={isCompleted}
                  />
                )}
              />
            </>
          )}

          <div className='flex justify-end gap-2'>
            <Button
              type='button'
              variant='red'
              onClick={onReset}
              disabled={isSubmitting}
            >
              Сбросить
            </Button>
            <Button
              type='button'
              variant='primary'
              onClick={onClose}
              disabled={isSubmitting}
            >
              Отмена
            </Button>
            <Button type='submit' disabled={isSubmitting || isCompleted}>
              Сохранить
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
