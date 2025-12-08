import { Habit } from '@/shared/types'
import { CheckCircle2, Lightbulb, XCircle } from 'lucide-react'

interface InfoBlockProps {
  habit: Habit
}

export default function InfoBlock({ habit }: InfoBlockProps) {
  const getHabitTypeLabel = (type: string) => {
    switch (type) {
      case 'binary':
        return 'Да / Нет'
      case 'count':
        return 'Количество'
      case 'time':
        return 'Время'
      default:
        return type
    }
  }

  return (
    <div className='border-light-gray bg-gray/90 rounded-lg border p-4'>
      <h3 className='mb-3 text-sm font-medium'>Параметры привычки</h3>
      <div className='space-y-2'>
        <div className='grid grid-cols-2 max-sm:grid-cols-[1.5fr_1fr]'>
          <span className='text-light-gray text-sm'>Тип привычки:</span>
          <span className='text-center text-sm font-medium'>
            {habit.is_beneficial ? (
              <span className='inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-200 ring-1 ring-emerald-500/40'>
                <CheckCircle2 className='h-3.5 w-3.5' />
                Полезная
              </span>
            ) : (
              <span className='inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-medium text-rose-200 ring-1 ring-rose-500/40'>
                <XCircle className='h-3.5 w-3.5' />
                Вредная
              </span>
            )}
          </span>
        </div>
        <div className='grid grid-cols-2 max-sm:grid-cols-[1.5fr_1fr]'>
          <span className='text-light-gray text-sm'>Формат отслеживания:</span>
          <span className='text-center text-sm'>
            {getHabitTypeLabel(habit.type)}
          </span>
        </div>
      </div>
      <div className='border-light-gray mt-3 flex gap-1 border-t pt-3'>
        <Lightbulb className='size-4 text-yellow-300/80' />
        <p className='text-light-gray text-xs'>
          Эти параметры нельзя изменить после создания привычки
        </p>
      </div>
    </div>
  )
}
