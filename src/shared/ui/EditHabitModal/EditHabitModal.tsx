'use client'

import Modal from '@/shared/ui/Modal'
import { EditHabitForm } from './EditHabitForm'
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <EditHabitForm
          habit={habit}
          register={register}
          errors={errors}
          control={control}
        />

        {/* Действия */}
        <div className='mt-6 flex flex-col gap-3 border-t border-gray-200 pt-6 dark:border-gray-700'>
          <div className='flex gap-3'>
            <button
              type='button'
              onClick={onClose}
              disabled={isSubmitting}
              className='flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
            >
              Отмена
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600'
            >
              {isSubmitting ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>

          <button
            type='button'
            onClick={handleToggleActive}
            disabled={isSubmitting}
            className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
              isActive
                ? 'bg-orange-50 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:hover:bg-orange-900/30'
                : 'bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/30'
            }`}
          >
            {isActive ? '⏸ Приостановить привычку' : '▶️ Возобновить привычку'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
