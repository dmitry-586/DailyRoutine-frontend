import { Input } from '@/shared/ui/Input'
import { RadioGroup } from '@/shared/ui/RadioGroup'
import { Select } from '@/shared/ui/Select'
import { TimeInput } from '@/shared/ui/TimeInput'
import { Controller } from 'react-hook-form'
import {
  COUNT_UNITS,
  habitBeneficialOptions,
  habitTypeOptions,
} from '../config'
import type { HabitFormFieldsProps } from '../types'

export const HabitFormFields = ({
  habitType,
  unitValue,
  register,
  errors,
  control,
  onTypeChange,
}: HabitFormFieldsProps) => {
  return (
    <div className='space-y-4'>
      <Input
        label='Название привычки'
        {...register('title')}
        placeholder='Например: Утренняя пробежка'
        error={errors.title?.message}
      />

      <Controller
        name='is_beneficial'
        control={control}
        render={({ field }) => (
          <RadioGroup
            label='Тип привычки'
            options={habitBeneficialOptions.map((opt) => ({
              label: opt.label,
              description: opt.description,
              value: opt.value ? 'true' : 'false',
            }))}
            currentValue={field.value ? 'true' : 'false'}
            defaultValue='true'
            onValueChange={(value) => field.onChange(value === 'true')}
            name={field.name}
            className='space-y-3'
          />
        )}
      />

      <RadioGroup
        label='Формат отслеживания'
        options={habitTypeOptions}
        currentValue={habitType}
        defaultValue='binary'
        onValueChange={onTypeChange}
        register={() => register('type')}
        className='space-y-3'
      />

      {habitType === 'time' && (
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

      {habitType === 'count' && (
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
