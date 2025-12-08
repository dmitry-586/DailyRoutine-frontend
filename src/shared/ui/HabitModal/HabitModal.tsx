'use client'

import Modal from '@/shared/ui/Modal'
import { Button } from '../Button'
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

        <div className='mt-6 flex gap-3 border-t border-gray-200 pt-6 dark:border-gray-700'>
          <Button
            type='button'
            variant='primary'
            onClick={onClose}
            disabled={isSubmitting}
            className='flex-1'
          >
            Отмена
          </Button>
          <Button type='submit' disabled={isSubmitting} className='flex-1'>
            {isSubmitting ? 'Создание...' : 'Создать'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
