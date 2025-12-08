'use client'

import Modal from '@/shared/ui/Modal'
import { Pause, Play } from 'lucide-react'
import { Button } from '../Button'
import { EditHabitForm } from './components/EditHabitForm'
import InfoBlock from './components/InfoBlock'
import type { EditHabitModalProps } from './types'
import { useEditHabitModal } from './useEditHabitModal'

export function EditHabitModal({
  open,
  onClose,
  onSave,
  habit,
}: EditHabitModalProps) {
  const {
    isActive,
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    onSubmit,
    handleToggleActive,
  } = useEditHabitModal({ open, habit, onSave })

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title='Редактировать привычку'
      className='max-w-lg max-sm:h-full max-sm:max-h-none max-sm:max-w-none max-sm:rounded-none'
    >
      <InfoBlock habit={habit} />
      <form onSubmit={handleSubmit(onSubmit)} className='mt-4'>
        <EditHabitForm
          habit={habit}
          register={register}
          errors={errors}
          control={control}
        />

        <div className='border-light-gray/80 mt-6 flex flex-col gap-3 border-t pt-6'>
          <div className='flex gap-3'>
            <Button
              type='button'
              variant='primary'
              onClick={onClose}
              disabled={isSubmitting}
              className='flex-1'
            >
              Отмена
            </Button>
            <Button type='submit' className='flex-1' disabled={isSubmitting}>
              {isSubmitting ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </div>

          <button
            type='button'
            onClick={handleToggleActive}
            disabled={isSubmitting}
            className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              isActive
                ? 'bg-orange-900/20 text-orange-400 hover:bg-orange-900/30'
                : 'bg-green-900/20 text-green-400 hover:bg-green-900/30'
            }`}
          >
            {isActive ? (
              <Pause className='size-4' />
            ) : (
              <Play className='size-4' />
            )}
            <span>
              {isActive ? 'Приостановить привычку' : 'Возобновить привычку'}
            </span>
          </button>
        </div>
      </form>
    </Modal>
  )
}
