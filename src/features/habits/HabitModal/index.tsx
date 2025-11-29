'use client'

import { Habit } from '@/shared/types/habit.types'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import Modal from '@/shared/ui/Modal'
import { Select } from '@/shared/ui/Select'
import { TimeInput } from '@/shared/ui/TimeInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { COUNT_UNITS, habitFormatOptions, habitTypeOptions } from './config'
import { RadioGroup } from './RadioGroup'
import { HabitFormData, habitFormSchema } from './schema'

interface HabitModalProps {
  open: boolean
  habit?: Habit | null
  onClose: () => void
  onSave: (habit: Habit) => void
}

export function HabitModal({ open, onClose, onSave, habit }: HabitModalProps) {
  const isEditMode = !!habit

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<HabitFormData>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: {
      title: '',
      type: 'good',
      format: 'binary',
      target: '1',
      unit: 'раз',
    },
    mode: 'onChange',
  })

  const typeValue = watch('type')
  const habitFormat = watch('format')
  const unitValue = watch('unit')

  useEffect(() => {
    if (open && habit) {
      reset({
        title: habit.title,
        type: habit.type,
        format: habit.format,
        target: habit.format === 'binary' ? '1' : habit.target.toString(),
        unit: habit.unit || 'раз',
      })
    }
  }, [habit, open, reset])

  const onSubmit = (data: HabitFormData) => {
    const target =
      data.format === 'binary' ? 1 : parseInt(data.target || '1', 10)

    const habitData: Habit = {
      id: habit?.id || Date.now().toString(),
      title: data.title,
      type: data.type,
      format: data.format,
      current: habit?.current || 0,
      target,
      unit: data.format === 'binary' ? '' : data.unit || 'раз',
      streak: habit?.streak || 0,
      completed: habit?.completed || false,
      isActive: habit?.isActive !== undefined ? habit.isActive : true,
    }
    onSave(habitData)
    onClose()
  }

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title={isEditMode ? 'Редактировать привычку' : 'Создать новую привычку'}
      className='max-w-lg max-sm:max-h-none max-sm:max-w-none max-sm:rounded-none'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
            register={() => register('format')}
            className='space-y-3'
          />

          {habitFormat === 'time' && (
            <TimeInput
              label='Целевое время'
              {...register('target')}
              error={errors.target?.message}
            />
          )}

          {habitFormat === 'count' && (
            <div className='flex gap-2'>
              <Input
                label='Целевое значение'
                {...register('target')}
                type='number'
                min='1'
                error={errors.target?.message}
              />
              <div className='shrink-0 space-y-2'>
                <label className='block text-sm'>Единица измерения</label>
                <Select
                  {...register('unit')}
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

        <div className='mt-8 flex justify-end gap-3'>
          <Button
            type='button'
            variant='primary'
            onClick={onClose}
            className='border-light-gray/20 hover:border-light-gray/30'
            disabled={isSubmitting}
          >
            Отмена
          </Button>
          <Button type='submit' disabled={isSubmitting}>
            {isEditMode ? 'Сохранить изменения' : 'Создать привычку'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
