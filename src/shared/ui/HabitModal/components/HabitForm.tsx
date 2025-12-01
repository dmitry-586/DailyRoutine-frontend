import { Input } from '@/shared/ui/Input'
import { RadioGroup } from '@/shared/ui/RadioGroup'
import { Select } from '@/shared/ui/Select'
import { TimeInput } from '@/shared/ui/TimeInput'
import { Controller } from 'react-hook-form'
import { COUNT_UNITS, habitFormatOptions, habitTypeOptions } from '../config'
import type { HabitFormFieldsProps } from '../types'

export const HabitFormFields = ({
  typeValue,
  habitFormat,
  unitValue,
  register,
  errors,
  control,
  onFormatChange,
}: HabitFormFieldsProps) => {
  return (
    <div className='space-y-4'>
      <Input
        label='Название привычки'
        {...register('title')}
        placeholder='Например: Утренняя пробежка'
        error={errors.title?.message}
      />

      <RadioGroup
        label='Тип привычки'
        options={habitTypeOptions}
        currentValue={typeValue}
        defaultValue='good'
        register={() => register('type')}
        className='space-y-3'
      />

      <RadioGroup
        label='Формат отслеживания'
        options={habitFormatOptions}
        currentValue={habitFormat}
        defaultValue='binary'
        onValueChange={onFormatChange}
        register={() => register('format')}
        className='space-y-3'
      />

      {habitFormat === 'time' && (
        <Controller
          name='target'
          control={control}
          render={({ field }) => (
            <TimeInput
              label='Целевое время'
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.target?.message}
            />
          )}
        />
      )}

      {habitFormat === 'count' && (
        <div className='flex gap-2'>
          <Input
            label='Целевое значение'
            {...register('target')}
            type='number'
            min='1'
            placeholder='Например: 10'
            error={errors.target?.message}
          />
          <div className='shrink-0 space-y-2'>
            <Select
              {...register('unit')}
              label='Единица измерения'
              value={unitValue}
              className='w-full'
              options={COUNT_UNITS.map((u) => ({
                value: u.value,
                label: u.label,
              }))}
            />
          </div>
        </div>
      )}
    </div>
  )
}
