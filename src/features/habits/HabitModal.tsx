'use client'

import { Habit } from '@/shared/types/habit.types'
import { Button } from '@/shared/ui/Button'
import Modal from '@/shared/ui/Modal'
import { RadioGroupItem } from '@/shared/ui/RadioGroup'
import { Select } from '@/shared/ui/Select'
import { useEffect, useState } from 'react'

interface HabitModalProps {
  open: boolean
  onClose: () => void
  onSave: (habit: Habit) => void
  habit?: Habit | null
}

const labelBaseClass = 'font-medium leading-none'

export function HabitModal({ open, onClose, onSave, habit }: HabitModalProps) {
  const isEditMode = !!habit

  const [habitType, setHabitType] = useState<'good' | 'bad'>('good')
  const [habitFormat, setHabitFormat] = useState<'binary' | 'count' | 'time'>(
    'binary',
  )
  const [habitName, setHabitName] = useState('')
  const [targetValue, setTargetValue] = useState('1')
  const [unit, setUnit] = useState('раз')

  useEffect(() => {
    if (habit) {
      setHabitName(habit.title)
      setHabitType(habit.type)
      setHabitFormat(habit.format)
      setTargetValue(habit.target.toString())
      setUnit(habit.unit || 'раз')
    } else {
      // Reset form for new habit
      setHabitName('')
      setHabitType('good')
      setHabitFormat('binary')
      setTargetValue('1')
      setUnit('раз')
    }
  }, [habit, open])

  const handleSave = () => {
    const habitData: Habit = {
      id: habit?.id || Date.now().toString(),
      title: habitName,
      type: habitType,
      format: habitFormat,
      current: habit?.current || 0,
      target: habitFormat === 'binary' ? 1 : parseInt(targetValue) || 1,
      unit: habitFormat === 'binary' ? '' : unit,
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
      title={
        isEditMode ? '✏️ Редактировать привычку' : '✨ Создать новую привычку'
      }
      className='border-light-gray/20 from-gray to-muted max-h-[90vh] max-w-lg overflow-y-auto bg-gradient-to-br text-white'
    >
      <div className='space-y-6 py-4'>
        {/* Habit Name */}
        <div className='space-y-2'>
          <label className={`${labelBaseClass} text-sm text-white`}>
            Название привычки
          </label>
          <input
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder='Например: Утренняя пробежка'
            className='border-light-gray/20 bg-background hover:border-light-gray/30 focus-visible:ring-primary flex h-9 w-full rounded-md border px-3 py-1 text-sm text-white transition-all focus-visible:ring-1 focus-visible:outline-none'
          />
        </div>

        {/* Habit Type */}
        <div className='space-y-3'>
          <label className={`${labelBaseClass} text-base text-white`}>
            Тип привычки
          </label>
          <div className='grid gap-2'>
            <div className='group hover:border-green/50 from-muted to-background flex cursor-pointer items-center space-x-2 rounded-xl border-2 bg-gradient-to-br p-4 transition-all duration-200'>
              <RadioGroupItem
                name='habitType'
                value='good'
                id='good'
                checked={habitType === 'good'}
                onChange={() => setHabitType('good')}
                className='group-hover:border-green transition-all duration-200'
              />
              <label
                htmlFor='good'
                className={`${labelBaseClass} flex-1 cursor-pointer text-white`}
              >
                <div className='flex items-center gap-3'>
                  <div className='bg-green shadow-green/30 group-hover:shadow-green/50 h-4 w-4 rounded-full shadow-lg transition-all duration-200' />
                  <span className='font-semibold'>Полезная привычка</span>
                </div>
                <p className='text-light-gray group-hover:text-light-gray/80 mt-1.5 ml-7 text-sm transition-colors duration-200'>
                  Отмечайте выполнение каждый день
                </p>
              </label>
            </div>
            <div className='group hover:border-red/50 from-muted to-background flex cursor-pointer items-center space-x-2 rounded-xl border-2 bg-gradient-to-br p-4 transition-all duration-200'>
              <RadioGroupItem
                name='habitType'
                value='bad'
                id='bad'
                checked={habitType === 'bad'}
                onChange={() => setHabitType('bad')}
                className='group-hover:border-red transition-all duration-200'
              />
              <label
                htmlFor='bad'
                className={`${labelBaseClass} flex-1 cursor-pointer text-white`}
              >
                <div className='flex items-center gap-3'>
                  <div className='bg-red shadow-red/30 group-hover:shadow-red/50 h-4 w-4 rounded-full shadow-lg transition-all duration-200' />
                  <span className='font-semibold'>Вредная привычка</span>
                </div>
                <p className='text-light-gray group-hover:text-light-gray/80 mt-1.5 ml-7 text-sm transition-colors duration-200'>
                  Отмечайте дни без срывов (день прошел без этой привычки)
                </p>
              </label>
            </div>
          </div>
        </div>

        {/* Habit Format */}
        <div className='space-y-3'>
          <label className={`${labelBaseClass} text-base text-white`}>
            Формат отслеживания
          </label>
          <div className='grid gap-2'>
            <div className='group hover:border-primary/50 from-muted to-background flex cursor-pointer items-center space-x-2 rounded-xl border-2 bg-gradient-to-br p-4 transition-all duration-200'>
              <RadioGroupItem
                name='habitFormat'
                value='binary'
                id='binary'
                checked={habitFormat === 'binary'}
                onChange={() => setHabitFormat('binary')}
                className='group-hover:border-primary transition-all duration-200'
              />
              <label
                htmlFor='binary'
                className={`${labelBaseClass} flex-1 cursor-pointer text-white`}
              >
                <span className='font-semibold'>Да / Нет</span>
                <p className='text-light-gray group-hover:text-light-gray/80 mt-1.5 text-sm transition-colors duration-200'>
                  Простое выполнение (выполнено / не выполнено)
                </p>
              </label>
            </div>
            <div className='group hover:border-primary/50 from-muted to-background flex cursor-pointer items-center space-x-2 rounded-xl border-2 bg-gradient-to-br p-4 transition-all duration-200'>
              <RadioGroupItem
                name='habitFormat'
                value='count'
                id='count'
                checked={habitFormat === 'count'}
                onChange={() => setHabitFormat('count')}
                className='group-hover:border-primary transition-all duration-200'
              />
              <label
                htmlFor='count'
                className={`${labelBaseClass} flex-1 cursor-pointer text-white`}
              >
                <span className='font-semibold'>Количество</span>
                <p className='text-light-gray group-hover:text-light-gray/80 mt-1.5 text-sm transition-colors duration-200'>
                  Отслеживание числовых значений (страницы, шаги и т.д.)
                </p>
              </label>
            </div>
            <div className='group hover:border-primary/50 from-muted to-background flex cursor-pointer items-center space-x-2 rounded-xl border-2 bg-gradient-to-br p-4 transition-all duration-200'>
              <RadioGroupItem
                name='habitFormat'
                value='time'
                id='time'
                checked={habitFormat === 'time'}
                onChange={() => setHabitFormat('time')}
                className='group-hover:border-primary transition-all duration-200'
              />
              <label
                htmlFor='time'
                className={`${labelBaseClass} flex-1 cursor-pointer text-white`}
              >
                <span className='font-semibold'>Время</span>
                <p className='text-light-gray group-hover:text-light-gray/80 mt-1.5 text-sm transition-colors duration-200'>
                  Отслеживание времени (минуты, часы)
                </p>
              </label>
            </div>
          </div>
        </div>

        {/* Target Value (only for count and time) */}
        {habitFormat !== 'binary' && (
          <div className='space-y-2'>
            <label className={`${labelBaseClass} text-sm text-white`}>
              Целевое значение
            </label>
            <div className='flex gap-2'>
              <input
                type='number'
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                className='border-light-gray/20 bg-background hover:border-light-gray/30 focus-visible:ring-primary flex h-9 w-full rounded-md border px-3 py-1 text-sm text-white transition-all focus-visible:ring-1 focus-visible:outline-none'
                min='1'
              />
              <Select
                value={unit}
                onValueChange={setUnit}
                className='border-light-gray/20 bg-muted w-[140px] text-white'
                options={
                  habitFormat === 'time'
                    ? [
                        { value: 'мин', label: 'минут' },
                        { value: 'ч', label: 'часов' },
                      ]
                    : [
                        { value: 'раз', label: 'раз' },
                        { value: 'шт', label: 'штук' },
                        { value: 'стр', label: 'страниц' },
                        { value: 'км', label: 'километров' },
                        { value: 'стаканов', label: 'стаканов' },
                      ]
                }
              />
            </div>
          </div>
        )}
      </div>

      <div className='flex justify-end gap-3 pt-2'>
        <Button
          variant='primary'
          onClick={onClose}
          className='border-light-gray/20 hover:border-light-gray/30'
        >
          Отмена
        </Button>
        <Button onClick={handleSave} disabled={!habitName.trim()}>
          {isEditMode ? '💾 Сохранить изменения' : '✨ Создать привычку'}
        </Button>
      </div>
    </Modal>
  )
}
