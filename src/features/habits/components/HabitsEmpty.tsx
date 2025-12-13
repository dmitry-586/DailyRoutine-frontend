import { Button } from '@/shared/ui'
import { Plus } from 'lucide-react'

interface HabitsEmptyProps {
  message: string
  onCreateClick: () => void
}

export function HabitsEmpty({ message, onCreateClick }: HabitsEmptyProps) {
  return (
    <div className='border-light-gray/10 bg-gray rounded-xl border p-12 text-center'>
      <p className='text-light-gray mb-4'>{message}</p>
      <Button onClick={onCreateClick}>
        <Plus className='mr-2 h-4 w-4' />
        Создать привычку
      </Button>
    </div>
  )
}
