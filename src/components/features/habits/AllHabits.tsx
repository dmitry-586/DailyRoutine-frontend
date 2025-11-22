'use client'

import { Button } from '@/components/ui/Button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { HabitCard } from './HabitCard'
import { HabitModal, type Habit } from './HabitModal'

interface AllHabitsProps {
  habits: Habit[]
  onAddHabit: (habit: Habit) => void
  onUpdateHabit: (habit: Habit) => void
  onDeleteHabit: (id: string) => void
  onCompleteHabit?: (habit: Habit) => void
  onHabitClick?: (habit: Habit) => void
}

export function AllHabits({
  habits,
  onAddHabit,
  onUpdateHabit,
  onDeleteHabit,
  onCompleteHabit,
  onHabitClick,
}: AllHabitsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
  const [filter, setFilter] = useState<'all' | 'good' | 'bad' | 'inactive'>(
    'all',
  )

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

  const handleToggleActive = (habit: Habit) => {
    onUpdateHabit({
      ...habit,
      isActive: !habit.isActive,
    })
  }

  const filteredHabits = habits.filter((habit) => {
    if (filter === 'all') return habit.isActive !== false
    if (filter === 'inactive') return habit.isActive === false
    return habit.type === filter && habit.isActive !== false
  })

  return (
    <div className='bg-background min-h-screen p-4 sm:p-6'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center'>
          <div>
            <h1 className='mb-2 text-white'>Все привычки</h1>
            <p className='text-light-gray'>Управляйте своими привычками</p>
          </div>
          <Button
            onClick={() => {
              setEditingHabit(null)
              setIsModalOpen(true)
            }}
            className='bg-primary hover:bg-primary/90 hover:shadow-primary/20 transition-all duration-200 hover:scale-105 hover:shadow-md'
          >
            <Plus className='mr-2 h-4 w-4' />
            Новая привычка
          </Button>
        </div>

        {/* Filters */}
        <div className='mb-6'>
          <Tabs value={filter} onValueChange={(value: any) => setFilter(value)}>
            <TabsList className='bg-gray'>
              <TabsTrigger
                value='all'
                className='hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:hover:bg-primary transition-all duration-200'
              >
                Все ({habits.filter((h) => h.isActive !== false).length})
              </TabsTrigger>
              <TabsTrigger
                value='good'
                className='hover:bg-green/20 data-[state=active]:bg-green data-[state=active]:hover:bg-green transition-all duration-200'
              >
                Полезные (
                {
                  habits.filter(
                    (h) => h.type === 'good' && h.isActive !== false,
                  ).length
                }
                )
              </TabsTrigger>
              <TabsTrigger
                value='bad'
                className='hover:bg-red/20 data-[state=active]:bg-red data-[state=active]:hover:bg-red transition-all duration-200'
              >
                Вредные (
                {
                  habits.filter((h) => h.type === 'bad' && h.isActive !== false)
                    .length
                }
                )
              </TabsTrigger>
              <TabsTrigger
                value='inactive'
                className='hover:bg-light-gray/20 data-[state=active]:bg-light-gray data-[state=active]:hover:bg-light-gray transition-all duration-200'
              >
                Неактивные ({habits.filter((h) => h.isActive === false).length})
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Habits Grid */}
        {filteredHabits.length > 0 ? (
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {filteredHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                {...habit}
                onClick={() => onHabitClick?.(habit)}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onComplete={onCompleteHabit}
                onToggleActive={handleToggleActive}
              />
            ))}
          </div>
        ) : (
          <div className='border-light-gray/10 bg-gray rounded-xl border p-12 text-center'>
            <p className='text-light-gray mb-4'>
              {filter === 'all'
                ? 'У вас пока нет привычек'
                : filter === 'inactive'
                  ? 'Нет неактивных привычек'
                  : `У вас нет ${filter === 'good' ? 'полезных' : 'вредных'} привычек`}
            </p>
            <Button
              onClick={() => {
                setEditingHabit(null)
                setIsModalOpen(true)
              }}
              className='bg-primary hover:bg-primary/90 hover:shadow-primary/20 transition-all duration-200 hover:scale-105 hover:shadow-md'
            >
              <Plus className='mr-2 h-4 w-4' />
              Создать привычку
            </Button>
          </div>
        )}
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
