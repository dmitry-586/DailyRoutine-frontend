import { Button } from '@/shared/ui/Button'

interface ModalActionsProps {
  isEditMode: boolean
  isSubmitting: boolean
  isActive?: boolean
  onClose: () => void
  onToggleActive?: () => void
}

export const ModalActions = ({
  isEditMode,
  isSubmitting,
  onClose,
  isActive,
  onToggleActive,
}: ModalActionsProps) => {
  const showArchiveButton = isEditMode && !!onToggleActive

  return (
    <div className='mt-8 flex justify-end-safe gap-3'>
      <Button
        type='button'
        variant='primary'
        onClick={onClose}
        className='border-light-gray/20 hover:border-light-gray/30'
        disabled={isSubmitting}
      >
        Отмена
      </Button>

      {showArchiveButton && (
        <Button
          type='button'
          variant='primary'
          onClick={onToggleActive}
          className='border-light-gray/20 hover:border-light-gray/30 self-start text-xs sm:text-sm'
          disabled={isSubmitting}
        >
          {isActive ? 'Перенести в архив' : 'Вернуть из архива'}
        </Button>
      )}

      <Button type='submit' disabled={isSubmitting}>
        {isEditMode ? 'Сохранить изменения' : 'Создать привычку'}
      </Button>
    </div>
  )
}
