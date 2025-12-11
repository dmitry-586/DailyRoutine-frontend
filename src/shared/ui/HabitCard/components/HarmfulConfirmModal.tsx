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
      <div className='space-y-4'>
        <p className='text-light-gray text-sm'>
          Подтвердите, что привычка «{title}» была выполнена (вредная).
        </p>

        <div className='flex justify-end gap-2'>
          <Button variant='default' onClick={onClose}>
            Отмена
          </Button>
          <Button variant='primary' onClick={onConfirm}>
            Подтвердить
          </Button>
        </div>
      </div>
    </Modal>
  )
}
