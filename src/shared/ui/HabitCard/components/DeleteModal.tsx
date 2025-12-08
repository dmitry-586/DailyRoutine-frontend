import { Button } from '@/shared/ui/Button'
import Modal from '@/shared/ui/Modal'
import type { HabitCardDeleteModalProps } from '../types'

export const HabitCardDeleteModal = ({
  title,
  isOpen,
  handlers,
}: HabitCardDeleteModalProps) => {
  const { onClose, onConfirm } = handlers

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Удалить привычку?'
      className='border-light-gray/20 bg-gray w-fit max-w-lg text-white'
    >
      <p className='text-light-gray flex flex-col'>
        Вы уверены, что хотите удалить привычку:
        <span className='font-bold'>&quot;{title}&quot;?</span>
        Это действие нельзя отменить.
      </p>
      <div className='mt-6 flex justify-end gap-3'>
        <Button variant='primary' onClick={onClose}>
          Отмена
        </Button>
        <Button
          onClick={onConfirm}
          className='bg-red border-red hover:bg-red/80'
        >
          Удалить
        </Button>
      </div>
    </Modal>
  )
}
