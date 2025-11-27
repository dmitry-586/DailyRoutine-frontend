import { useMediaQuery } from '@/shared/lib/hooks/useMediaQuery'
import { Habit } from '@/shared/types/habit.types'
import { Button } from '@/shared/ui/Button'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { HabitCard } from '../habits/HabitCard'
import { HabitModal } from '../habits/HabitModal'
import { DashboardProps } from './types'

export function DashboardHabits({
  habits,
  onAddHabit,
  onUpdateHabit,
  onDeleteHabit,
  onCompleteHabit,
  onHabitClick,
}: DashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
  const isMobile = useMediaQuery('(max-width: 640px)')

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
    <section className='w-full space-y-4 lg:col-span-2'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-xl font-semibold max-sm:text-lg'>
          Привычки на сегодня
        </h2>
        <Button
          size={isMobile ? 'sm' : 'default'}
          onClick={() => {
            setEditingHabit(null)
            setIsModalOpen(true)
          }}
        >
          <Plus className='size-4' />
          <p>Добавить</p>
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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
        <div className='border-light-gray/10 bg-gray rounded-xl border p-12 text-center'>
          <p className='text-light-gray mb-4'>У вас пока нет привычек</p>
          <Button
            onClick={() => {
              setEditingHabit(null)
              setIsModalOpen(true)
            }}
            className='bg-primary hover:bg-primary/90 hover:shadow-primary/20 transition-all duration-200 hover:scale-105 hover:shadow-md'
          >
            <Plus className='mr-2 h-4 w-4' />
            Создать первую привычку
          </Button>
        </div>
      )}

      <HabitModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingHabit(null)
        }}
        onSave={handleSave}
        habit={editingHabit}
      />
    </section>
  )
}
