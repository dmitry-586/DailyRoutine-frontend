'use client'

import { Button } from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { HabitCard } from './HabitCard'
import { HabitModal, type Habit } from './HabitModal'
import { StatsPanel } from './StatsPanel'
import { WeekCalendar } from './WeekCalendar'

interface DashboardProps {
  habits: Habit[]
  onAddHabit: (habit: Habit) => void
  onUpdateHabit: (habit: Habit) => void
  onDeleteHabit: (id: string) => void
  onCompleteHabit?: (habit: Habit) => void
  onHabitClick?: (habit: Habit) => void
}

export function Dashboard({
  habits,
  onAddHabit,
  onUpdateHabit,
  onDeleteHabit,
  onCompleteHabit,
  onHabitClick,
}: DashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)

  const completedToday = habits.filter((h) => h.completed).length

  const handleSave = (habit: Habit) => {
    if (editingHabit) {
      onUpdateHabit(habit)
    } else {
      onAddHabit(habit)
    }
    setEditingHabit(null)
  }

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    onDeleteHabit(id)
  }

  return (
    <div className="min-h-screen bg-[#2D3134] p-6">
      <div className="mx-auto max-w-7xl">
        {/* Week Calendar */}
        <div className="mb-6 overflow-x-auto">
          <WeekCalendar currentDay={3} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Habits Section */}
          <div className="space-y-4 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">
                Привычки на сегодня
              </h2>
              <Button
                onClick={() => {
                  setEditingHabit(null)
                  setIsModalOpen(true)
                }}
                className="h-9 bg-[#1CBECB] px-4 transition-all duration-200 hover:scale-105 hover:bg-[#1CBECB]/90 hover:shadow-md hover:shadow-[#1CBECB]/20"
              >
                <Plus className="mr-2 h-4 w-4" />
                Добавить
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {habits
                .filter((h) => h.isActive !== false)
                .map((habit) => (
                  <HabitCard
                    key={habit.id}
                    {...habit}
                    onClick={() => onHabitClick?.(habit)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onComplete={onCompleteHabit}
                  />
                ))}
            </div>

            {habits.filter((h) => h.isActive !== false).length === 0 && (
              <div className="rounded-xl border border-[#B3B3B3]/10 bg-[#3D4348] p-12 text-center">
                <p className="mb-4 text-[#B3B3B3]">У вас пока нет привычек</p>
                <Button
                  onClick={() => {
                    setEditingHabit(null)
                    setIsModalOpen(true)
                  }}
                  className="bg-[#1CBECB] transition-all duration-200 hover:scale-105 hover:bg-[#1CBECB]/90 hover:shadow-md hover:shadow-[#1CBECB]/20"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Создать первую привычку
                </Button>
              </div>
            )}
          </div>

          {/* Stats Panel */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Статистика
            </h3>
            <StatsPanel
              totalHabits={habits.filter((h) => h.isActive !== false).length}
              completedToday={completedToday}
              currentStreak={7}
              dailyCoins={340}
            />

            <div className="mt-6 rounded-xl border border-[#B3B3B3]/10 bg-[#3D4348] p-6 text-center">
              <p className="mb-4 text-sm text-[#B3B3B3]">
                Продолжайте в том же духе!
              </p>
              <div className="mb-2 text-4xl">🎯</div>
              <p className="font-semibold text-white">
                {completedToday} из{' '}
                {habits.filter((h) => h.isActive !== false).length} привычек
                выполнено
              </p>
            </div>
          </div>
        </div>
      </div>

      <HabitModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingHabit(null)
        }}
        onSave={handleSave}
        habit={editingHabit}
      />
    </div>
  )
}
