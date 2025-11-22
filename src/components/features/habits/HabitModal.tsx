'use client'

import { Button } from '@/components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/RadioGroup'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'
import { useEffect, useState } from 'react'

export interface HabitHistoryEntry {
  date: string // ISO date string
  value: number // Значение для count/time, 0 или 1 для binary
  completed: boolean
}

export interface Habit {
  id: string
  title: string
  type: 'good' | 'bad'
  format: 'time' | 'count' | 'binary'
  current: number
  target: number
  unit?: string
  streak: number
  completed?: boolean
  isActive?: boolean // Статус активности привычки
  history?: HabitHistoryEntry[] // История выполнения по датам
}

interface HabitModalProps {
  open: boolean
  onClose: () => void
  onSave: (habit: Habit) => void
  habit?: Habit | null
}

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='border-light-gray/20 from-gray to-muted max-h-[90vh] max-w-lg overflow-y-auto bg-gradient-to-br text-white'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold'>
            {isEditMode
              ? '✏️ Редактировать привычку'
              : '✨ Создать новую привычку'}
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6 py-4'>
          {/* Habit Name */}
          <div className='space-y-2'>
            <Label>Название привычки</Label>
            <Input
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder='Например: Утренняя пробежка'
              className='border-light-gray/20 bg-muted text-white'
            />
          </div>

          {/* Habit Type */}
          <div className='space-y-3'>
            <Label className='text-base font-medium'>Тип привычки</Label>
            <RadioGroup
              value={habitType}
              onValueChange={(value: any) => setHabitType(value)}
            >
              <div className='group hover:border-green/50 from-muted to-background flex cursor-pointer items-center space-x-2 rounded-xl border-2 bg-gradient-to-br p-4 transition-all duration-200'>
                <RadioGroupItem
                  value='good'
                  id='good'
                  className='group-hover:border-green transition-all duration-200'
                />
                <Label htmlFor='good' className='flex-1 cursor-pointer'>
                  <div className='flex items-center gap-3'>
                    <div className='bg-green shadow-green/30 group-hover:shadow-green/50 h-4 w-4 rounded-full shadow-lg transition-all duration-200' />
                    <span className='font-semibold'>Полезная привычка</span>
                  </div>
                  <p className='text-light-gray group-hover:text-light-gray/80 mt-1.5 ml-7 text-sm transition-colors duration-200'>
                    Отмечайте выполнение каждый день
                  </p>
                </Label>
              </div>
              <div className='group hover:border-red/50 from-muted to-background flex cursor-pointer items-center space-x-2 rounded-xl border-2 bg-gradient-to-br p-4 transition-all duration-200'>
                <RadioGroupItem
                  value='bad'
                  id='bad'
                  className='group-hover:border-red transition-all duration-200'
                />
                <Label htmlFor='bad' className='flex-1 cursor-pointer'>
                  <div className='flex items-center gap-3'>
                    <div className='bg-red shadow-red/30 group-hover:shadow-red/50 h-4 w-4 rounded-full shadow-lg transition-all duration-200' />
                    <span className='font-semibold'>Вредная привычка</span>
                  </div>
                  <p className='text-light-gray group-hover:text-light-gray/80 mt-1.5 ml-7 text-sm transition-colors duration-200'>
                    Отмечайте дни без срывов (день прошел без этой привычки)
                  </p>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Habit Format */}
          <div className='space-y-3'>
            <Label className='text-base font-medium'>Формат отслеживания</Label>
            <RadioGroup
              value={habitFormat}
              onValueChange={(value: any) => setHabitFormat(value)}
            >
              <div className='group hover:border-primary/50 from-muted to-background flex cursor-pointer items-center space-x-2 rounded-xl border-2 bg-gradient-to-br p-4 transition-all duration-200'>
                <RadioGroupItem
                  value='binary'
                  id='binary'
                  className='group-hover:border-primary transition-all duration-200'
                />
                <Label htmlFor='binary' className='flex-1 cursor-pointer'>
                  <span className='font-semibold'>Да / Нет</span>
                  <p className='text-light-gray group-hover:text-light-gray/80 mt-1.5 text-sm transition-colors duration-200'>
                    Простое выполнение (выполнено / не выполнено)
                  </p>
                </Label>
              </div>
              <div className='group hover:border-primary/50 from-muted to-background flex cursor-pointer items-center space-x-2 rounded-xl border-2 bg-gradient-to-br p-4 transition-all duration-200'>
                <RadioGroupItem
                  value='count'
                  id='count'
                  className='group-hover:border-primary transition-all duration-200'
                />
                <Label htmlFor='count' className='flex-1 cursor-pointer'>
                  <span className='font-semibold'>Количество</span>
                  <p className='text-light-gray group-hover:text-light-gray/80 mt-1.5 text-sm transition-colors duration-200'>
                    Отслеживание числовых значений (страницы, шаги и т.д.)
                  </p>
                </Label>
              </div>
              <div className='group hover:border-primary/50 from-muted to-background flex cursor-pointer items-center space-x-2 rounded-xl border-2 bg-gradient-to-br p-4 transition-all duration-200'>
                <RadioGroupItem
                  value='time'
                  id='time'
                  className='group-hover:border-primary transition-all duration-200'
                />
                <Label htmlFor='time' className='flex-1 cursor-pointer'>
                  <span className='font-semibold'>Время</span>
                  <p className='text-light-gray group-hover:text-light-gray/80 mt-1.5 text-sm transition-colors duration-200'>
                    Отслеживание времени (минуты, часы)
                  </p>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Target Value (only for count and time) */}
          {habitFormat !== 'binary' && (
            <div className='space-y-2'>
              <Label>Целевое значение</Label>
              <div className='flex gap-2'>
                <Input
                  type='number'
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  className='border-light-gray/20 bg-muted text-white'
                  min='1'
                />
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger className='border-light-gray/20 bg-muted w-[140px] text-white'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className='border-light-gray/20 bg-gray text-white'>
                    {habitFormat === 'time' ? (
                      <>
                        <SelectItem value='мин'>минут</SelectItem>
                        <SelectItem value='ч'>часов</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value='раз'>раз</SelectItem>
                        <SelectItem value='шт'>штук</SelectItem>
                        <SelectItem value='стр'>страниц</SelectItem>
                        <SelectItem value='км'>километров</SelectItem>
                        <SelectItem value='стаканов'>стаканов</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <div className='flex justify-end gap-3 pt-2'>
          <Button
            variant='outline'
            onClick={onClose}
            className='border-light-gray/20 hover:border-light-gray/30 hover:bg-muted transition-all duration-200'
          >
            Отмена
          </Button>
          <Button
            onClick={handleSave}
            disabled={!habitName.trim()}
            className='shadow-primary/20 hover:shadow-primary/30 from-primary to-primary/80 bg-gradient-to-r shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100'
          >
            {isEditMode ? '💾 Сохранить изменения' : '✨ Создать привычку'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
