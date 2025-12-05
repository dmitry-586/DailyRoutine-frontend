import { Input } from '@/shared/ui/Input'
import { Select } from '@/shared/ui/Select'
import { TimeInput } from '@/shared/ui/TimeInput'
import { Controller } from 'react-hook-form'
import { COUNT_UNITS } from '../HabitModal/config'
import type { EditHabitFormProps } from './types'

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

export const EditHabitForm = ({
  habit,
  register,
  errors,
  control,
}: EditHabitFormProps) => {
  return (
    <div className='space-y-6'>
      {/* Информационный блок с неизменяемыми параметрами */}
      <div className='rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50'>
        <h3 className='mb-3 text-sm font-medium text-gray-700 dark:text-gray-300'>
          Параметры привычки
        </h3>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-gray-600 dark:text-gray-400'>
              Тип привычки:
            </span>
            <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
              {habit.is_beneficial ? (
                <span className='inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400'>
                  <svg
                    className='h-3 w-3'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Полезная
                </span>
              ) : (
                <span className='inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400'>
                  <svg
                    className='h-3 w-3'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                  Вредная
                </span>
              )}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-sm text-gray-600 dark:text-gray-400'>
              Формат отслеживания:
            </span>
            <span className='text-sm font-medium text-gray-900 dark:text-gray-100'>
              {getHabitTypeLabel(habit.type)}
            </span>
          </div>
        </div>
        <div className='mt-3 border-t border-gray-200 pt-3 dark:border-gray-700'>
          <p className='text-xs text-gray-500 dark:text-gray-400'>
            💡 Эти параметры нельзя изменить после создания привычки
          </p>
        </div>
      </div>

      {/* Редактируемые поля */}
      <div className='space-y-4'>
        <Input
          label='Название привычки'
          {...register('title')}
          placeholder='Например: Утренняя пробежка'
          error={errors.title?.message}
          autoFocus
        />

        {habit.type === 'time' && (
          <Controller
            name='value'
            control={control}
            render={({ field }) => (
              <TimeInput
                label='Целевое время'
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.value?.message}
              />
            )}
          />
        )}

        {habit.type === 'count' && (
          <div className='flex gap-2'>
            <Input
              label='Целевое значение'
              {...register('value')}
              type='number'
              min='1'
              placeholder='Например: 10'
              error={errors.value?.message}
            />
            <div className='shrink-0 space-y-2'>
              <Controller
                name='unit'
                control={control}
                render={({ field }) => (
                  <Select
                    label='Единица измерения'
                    value={field.value}
                    onChange={field.onChange}
                    className='w-full'
                    options={COUNT_UNITS.map((u) => ({
                      value: u.value,
                      label: u.label,
                    }))}
                  />
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
