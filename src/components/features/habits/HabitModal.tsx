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
      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto border-[#B3B3B3]/20 bg-gradient-to-br from-[#3D4348] to-[#32373A] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditMode
              ? '✏️ Редактировать привычку'
              : '✨ Создать новую привычку'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Habit Name */}
          <div className="space-y-2">
            <Label>Название привычки</Label>
            <Input
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="Например: Утренняя пробежка"
              className="border-[#B3B3B3]/20 bg-[#32373A] text-white"
            />
          </div>

          {/* Habit Type */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Тип привычки</Label>
            <RadioGroup
              value={habitType}
              onValueChange={(value: any) => setHabitType(value)}
            >
              <div className="group flex cursor-pointer items-center space-x-2 rounded-xl border-2 bg-gradient-to-br from-[#32373A] to-[#2D3134] p-4 transition-all duration-200 hover:border-[#4CAF50]/50 hover:bg-[#32373A]/80">
                <RadioGroupItem
                  value="good"
                  id="good"
                  className="transition-all duration-200 group-hover:border-[#4CAF50]"
                />
                <Label htmlFor="good" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-[#4CAF50] shadow-lg shadow-[#4CAF50]/30 transition-all duration-200 group-hover:shadow-[#4CAF50]/50" />
                    <span className="font-semibold">Полезная привычка</span>
                  </div>
                  <p className="mt-1.5 ml-7 text-sm text-[#B3B3B3] transition-colors duration-200 group-hover:text-[#B3B3B3]/80">
                    Отмечайте выполнение каждый день
                  </p>
                </Label>
              </div>
              <div className="group flex cursor-pointer items-center space-x-2 rounded-xl border-2 bg-gradient-to-br from-[#32373A] to-[#2D3134] p-4 transition-all duration-200 hover:border-[#F44336]/50 hover:bg-[#32373A]/80">
                <RadioGroupItem
                  value="bad"
                  id="bad"
                  className="transition-all duration-200 group-hover:border-[#F44336]"
                />
                <Label htmlFor="bad" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-full bg-[#F44336] shadow-lg shadow-[#F44336]/30 transition-all duration-200 group-hover:shadow-[#F44336]/50" />
                    <span className="font-semibold">Вредная привычка</span>
                  </div>
                  <p className="mt-1.5 ml-7 text-sm text-[#B3B3B3] transition-colors duration-200 group-hover:text-[#B3B3B3]/80">
                    Отмечайте дни без срывов (день прошел без этой привычки)
                  </p>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Habit Format */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Формат отслеживания</Label>
            <RadioGroup
              value={habitFormat}
              onValueChange={(value: any) => setHabitFormat(value)}
            >
              <div className="group flex cursor-pointer items-center space-x-2 rounded-xl border-2 bg-gradient-to-br from-[#32373A] to-[#2D3134] p-4 transition-all duration-200 hover:border-[#1CBECB]/50 hover:bg-[#32373A]/80">
                <RadioGroupItem
                  value="binary"
                  id="binary"
                  className="transition-all duration-200 group-hover:border-[#1CBECB]"
                />
                <Label htmlFor="binary" className="flex-1 cursor-pointer">
                  <span className="font-semibold">Да / Нет</span>
                  <p className="mt-1.5 text-sm text-[#B3B3B3] transition-colors duration-200 group-hover:text-[#B3B3B3]/80">
                    Простое выполнение (выполнено / не выполнено)
                  </p>
                </Label>
              </div>
              <div className="group flex cursor-pointer items-center space-x-2 rounded-xl border-2 bg-gradient-to-br from-[#32373A] to-[#2D3134] p-4 transition-all duration-200 hover:border-[#1CBECB]/50 hover:bg-[#32373A]/80">
                <RadioGroupItem
                  value="count"
                  id="count"
                  className="transition-all duration-200 group-hover:border-[#1CBECB]"
                />
                <Label htmlFor="count" className="flex-1 cursor-pointer">
                  <span className="font-semibold">Количество</span>
                  <p className="mt-1.5 text-sm text-[#B3B3B3] transition-colors duration-200 group-hover:text-[#B3B3B3]/80">
                    Отслеживание числовых значений (страницы, шаги и т.д.)
                  </p>
                </Label>
              </div>
              <div className="group flex cursor-pointer items-center space-x-2 rounded-xl border-2 bg-gradient-to-br from-[#32373A] to-[#2D3134] p-4 transition-all duration-200 hover:border-[#1CBECB]/50 hover:bg-[#32373A]/80">
                <RadioGroupItem
                  value="time"
                  id="time"
                  className="transition-all duration-200 group-hover:border-[#1CBECB]"
                />
                <Label htmlFor="time" className="flex-1 cursor-pointer">
                  <span className="font-semibold">Время</span>
                  <p className="mt-1.5 text-sm text-[#B3B3B3] transition-colors duration-200 group-hover:text-[#B3B3B3]/80">
                    Отслеживание времени (минуты, часы)
                  </p>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Target Value (only for count and time) */}
          {habitFormat !== 'binary' && (
            <div className="space-y-2">
              <Label>Целевое значение</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  className="border-[#B3B3B3]/20 bg-[#32373A] text-white"
                  min="1"
                />
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger className="w-[140px] border-[#B3B3B3]/20 bg-[#32373A] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-[#B3B3B3]/20 bg-[#3D4348] text-white">
                    {habitFormat === 'time' ? (
                      <>
                        <SelectItem value="мин">минут</SelectItem>
                        <SelectItem value="ч">часов</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="раз">раз</SelectItem>
                        <SelectItem value="шт">штук</SelectItem>
                        <SelectItem value="стр">страниц</SelectItem>
                        <SelectItem value="км">километров</SelectItem>
                        <SelectItem value="стаканов">стаканов</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-[#B3B3B3]/20 transition-all duration-200 hover:border-[#B3B3B3]/30 hover:bg-[#32373A]"
          >
            Отмена
          </Button>
          <Button
            onClick={handleSave}
            disabled={!habitName.trim()}
            className="bg-gradient-to-r from-[#1CBECB] to-[#17a2b3] shadow-lg shadow-[#1CBECB]/20 transition-all duration-200 hover:scale-105 hover:from-[#17a2b3] hover:to-[#1CBECB] hover:shadow-xl hover:shadow-[#1CBECB]/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {isEditMode ? '💾 Сохранить изменения' : '✨ Создать привычку'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
