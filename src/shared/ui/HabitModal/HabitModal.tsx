'use client'

import Modal from '@/shared/ui/Modal'
import { HabitFormFields } from './components/HabitForm'
import type { HabitModalProps } from './types'
import { useHabitModal } from './useHabitModal'

export function HabitModal({ open, onClose, onSave }: HabitModalProps) {
  const {
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    isBeneficialValue,
    habitType,
    unitValue,
    handleTypeChange,
    onSubmit,
  } = useHabitModal({ open, onSave })

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title='Создать новую привычку'
      className='max-w-lg max-sm:h-full max-sm:max-h-none max-sm:max-w-none max-sm:rounded-none'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <HabitFormFields
          isBeneficialValue={isBeneficialValue}
          habitType={habitType}
          unitValue={unitValue}
          register={register}
          errors={errors}
          control={control}
          onTypeChange={handleTypeChange}
        />

        {/* Действия для создания */}
        <div className='mt-6 flex gap-3 border-t border-gray-200 pt-6 dark:border-gray-700'>
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
            {isSubmitting ? 'Создание...' : 'Создать'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
