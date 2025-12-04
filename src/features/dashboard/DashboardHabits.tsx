import {
  useCreateHabit,
  useDeleteHabit,
  useHabits,
  useUpdateHabit,
} from '@/shared/model/hooks/useHabits'
import { useMediaQuery } from '@/shared/model/hooks/useMediaQuery'
import type {
  CreateHabitRequest,
  Habit,
  UpdateHabitRequest,
} from '@/shared/types/habit.types'
import { Button } from '@/shared/ui/Button'
import { HabitCard } from '@/shared/ui/HabitCard'
import { HabitModal } from '@/shared/ui/HabitModal'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export function DashboardHabits() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null)
  const isMobile = useMediaQuery('(max-width: 640px)')

  const { data: habits = [] } = useHabits()
  const { mutate: createHabit } = useCreateHabit()
  const { mutate: updateHabit } = useUpdateHabit()
  const { mutate: deleteHabit } = useDeleteHabit()

  const activeHabits = habits.filter((h) => h.is_active !== false)

  return (
    <>
      <section className='w-full space-y-4'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-semibold max-sm:text-lg'>
            Привычки на сегодня
          </h2>
          <Button
            size={isMobile ? 'sm' : 'default'}
            onClick={() => {
              setHabitToEdit(null)
              setIsModalOpen(true)
            }}
          >
            <Plus className='size-4' />
            <p>Добавить</p>
          </Button>
        </div>

        {activeHabits.length > 0 && (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {activeHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                data={habit}
                handlers={{
                  onEdit: (habit) => {
                    setHabitToEdit(habit)
                    setIsModalOpen(true)
                  },
                  onDelete: deleteHabit,
                  onComplete: (habit) =>
                    updateHabit({
                      id: habit.id,
                      data: { is_done: !habit.is_done },
                    }),
                }}
              />
            ))}
          </div>
        )}

        {activeHabits.length === 0 && (
          <div className='border-light-gray/10 bg-gray rounded-xl border p-12 text-center'>
            <p className='text-light-gray mb-4'>У вас пока нет привычек</p>
            <Button
              onClick={() => {
                setHabitToEdit(null)
                setIsModalOpen(true)
              }}
              className='bg-primary hover:bg-primary/90 hover:shadow-primary/20 transition-all duration-200 hover:scale-105 hover:shadow-md'
            >
              <Plus className='mr-2 h-4 w-4' />
              Создать первую привычку
            </Button>
          </div>
        )}
      </section>

      <HabitModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setHabitToEdit(null)
        }}
        onSave={(data) => {
          if (habitToEdit) {
            updateHabit({
              id: habitToEdit.id,
              data: data as UpdateHabitRequest,
            })
          } else {
            createHabit(data as CreateHabitRequest)
          }
          setIsModalOpen(false)
          setHabitToEdit(null)
        }}
        habit={habitToEdit}
      />
    </>
  )
}
