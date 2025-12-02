import { useHabits } from '@/shared/model/hooks/useHabits'
import { useMediaQuery } from '@/shared/model/hooks/useMediaQuery'
import { Button } from '@/shared/ui/Button'
import { HabitCard } from '@/shared/ui/HabitCard'
import { HabitModal } from '@/shared/ui/HabitModal'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export function DashboardHabits() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 640px)')
  const { habits, updateHabit, deleteHabit, completeHabit } = useHabits()

  const activeHabits = habits.filter((h) => h.isActive !== false)

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
              setIsModalOpen(true)
            }}
          >
            <Plus className='size-4' />
            <p>Добавить</p>
          </Button>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {activeHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              data={habit}
              handlers={{
                onEdit: updateHabit,
                onDelete: deleteHabit,
                onComplete: completeHabit,
              }}
            />
          ))}
        </div>

        {activeHabits.length === 0 && (
          <div className='border-light-gray/10 bg-gray rounded-xl border p-12 text-center'>
            <p className='text-light-gray mb-4'>У вас пока нет привычек</p>
            <Button
              onClick={() => {
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
        }}
        onSave={() => {}}
        habit={null}
      />
    </>
  )
}
