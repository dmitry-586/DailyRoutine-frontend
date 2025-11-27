'use client'

import { Habit } from '@/shared/types/habit.types'
import { Button } from '@/shared/ui/Button'
import { TabsList, TabsTrigger } from '@/shared/ui/Tabs'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { HabitCard } from './HabitCard'
import { HabitModal } from './HabitModal'

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
    <>
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
      <div className='custom-scrollbar -mx-4 mb-6 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6'>
        <TabsList className='bg-gray inline-flex w-auto gap-1.5 sm:gap-2'>
          <TabsTrigger
            active={filter === 'all'}
            onClick={() => setFilter('all')}
            className='hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:hover:bg-primary flex-shrink-0 px-2.5 text-xs whitespace-nowrap transition-all duration-200 sm:px-3 sm:text-sm'
          >
            Все ({habits.filter((h) => h.isActive !== false).length})
          </TabsTrigger>
          <TabsTrigger
            active={filter === 'good'}
            onClick={() => setFilter('good')}
            className='hover:bg-green/20 data-[state=active]:bg-green data-[state=active]:hover:bg-green flex-shrink-0 px-2.5 text-xs whitespace-nowrap transition-all duration-200 sm:px-3 sm:text-sm'
          >
            Полезные (
            {
              habits.filter((h) => h.type === 'good' && h.isActive !== false)
                .length
            }
            )
          </TabsTrigger>
          <TabsTrigger
            active={filter === 'bad'}
            onClick={() => setFilter('bad')}
            className='hover:bg-red/20 data-[state=active]:bg-red data-[state=active]:hover:bg-red flex-shrink-0 px-2.5 text-xs whitespace-nowrap transition-all duration-200 sm:px-3 sm:text-sm'
          >
            Вредные (
            {
              habits.filter((h) => h.type === 'bad' && h.isActive !== false)
                .length
            }
            )
          </TabsTrigger>
          <TabsTrigger
            active={filter === 'inactive'}
            onClick={() => setFilter('inactive')}
            className='hover:bg-light-gray/20 data-[state=active]:bg-light-gray data-[state=active]:hover:bg-light-gray flex-shrink-0 px-2.5 text-xs whitespace-nowrap transition-all duration-200 sm:px-3 sm:text-sm'
          >
            Неактивные ({habits.filter((h) => h.isActive === false).length})
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Habits Grid */}
      <div className='max-w-7xl'>
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
    </>
  )
}
