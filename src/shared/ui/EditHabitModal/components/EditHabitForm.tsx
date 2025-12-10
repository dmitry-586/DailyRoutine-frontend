import { Input, Select, TimeInput } from '@/shared/ui'
import { Controller } from 'react-hook-form'
import { COUNT_UNITS } from '../../HabitModal/config'
import type { EditHabitFormProps } from '../types'

export const EditHabitForm = ({
  habit,
  register,
  errors,
  control,
}: EditHabitFormProps) => {
  return (
    <div className='space-y-4'>
      <Input
        label='Название привычки'
        {...register('title')}
        placeholder='Например: Утренняя пробежка'
        error={errors.title?.message}
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
  )
}
