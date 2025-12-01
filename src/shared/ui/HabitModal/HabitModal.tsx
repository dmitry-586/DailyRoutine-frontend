'use client'

import Modal from '@/shared/ui/Modal'
import { HabitFormFields } from './components/HabitForm'
import { ModalActions } from './components/ModalActions'
import type { HabitModalProps } from './types'
import { useHabitModal } from './useHabitModal'

export function HabitModal({ open, onClose, onSave, habit }: HabitModalProps) {
  const {
    isEditMode,
    isActive,
    register,
    handleSubmit,
    control,
    errors,
    isSubmitting,
    typeValue,
    habitFormat,
    unitValue,
    handleFormatChange,
    onSubmit,
    handleToggleActive,
  } = useHabitModal({ open, habit, onClose, onSave })

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={isEditMode ? 'Редактировать привычку' : 'Создать новую привычку'}
      className='max-w-lg max-sm:h-full max-sm:max-h-none max-sm:max-w-none max-sm:rounded-none'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <HabitFormFields
          typeValue={typeValue}
          habitFormat={habitFormat}
          unitValue={unitValue}
          register={register}
          errors={errors}
          control={control}
          onFormatChange={handleFormatChange}
        />

        <ModalActions
          isEditMode={isEditMode}
          isSubmitting={isSubmitting}
          onClose={onClose}
          isActive={isActive}
          onToggleActive={handleToggleActive}
        />
      </form>
    </Modal>
  )
}
