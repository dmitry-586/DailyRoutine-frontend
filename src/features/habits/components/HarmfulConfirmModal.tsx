import { Button, Modal } from '@/shared/ui'

interface HarmfulConfirmModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
  onConfirm: () => void
}

export function HarmfulConfirmModal({
  isOpen,
  title,
  onClose,
  onConfirm,
}: HarmfulConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Подтверждение'
      className='max-w-md'
    >
      <div className='space-y-6'>
        <p className='text-light-gray text-sm'>
          Подтвердите свое действие для привычки «{title}».
        </p>

        <div className='flex justify-end gap-2'>
          <Button variant='primary' onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onConfirm}>Подтвердить</Button>
        </div>
      </div>
    </Modal>
  )
}
