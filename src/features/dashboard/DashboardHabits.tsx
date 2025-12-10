import { useHabitMutations, useHabits } from '@/shared/model/hooks'
import type { CreateHabitRequest, Habit } from '@/shared/types'
import { Button, EditHabitModal, HabitCard, HabitModal } from '@/shared/ui'
import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'

export function DashboardHabits() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null)

  const { data: habits = [], isLoading } = useHabits()
  const { handleCreate, handleUpdate, handleDelete } = useHabitMutations()

  const activeHabits = useMemo(
    () => habits.filter((h) => h.is_active !== false),
    [habits],
  )

  const openCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const closeCreateModal = () => {
    setIsCreateModalOpen(false)
  }

  const openEditModal = (habit: Habit) => {
    setHabitToEdit(habit)
    setIsEditModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setHabitToEdit(null)
  }

  return (
    <>
      <section className='w-full space-y-4'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-semibold max-sm:text-lg'>
            Привычки на сегодня
          </h2>
          <Button onClick={openCreateModal} className='h-9 max-sm:h-8'>
            <Plus className='size-4 shrink-0' />
            <span>Добавить</span>
          </Button>
        </div>

        {isLoading ? (
          <div className='border-light-gray/10 bg-gray rounded-xl border p-12 text-center'>
            <p className='text-light-gray'>Загрузка привычек...</p>
          </div>
        ) : activeHabits.length > 0 ? (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {activeHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                data={habit}
                handlers={{
                  onEdit: openEditModal,
                  onDelete: handleDelete,
                  onComplete: (updated) =>
                    void handleUpdate(habit.id, { is_done: updated.is_done }),
                  onToggleActive: (updated) =>
                    void handleUpdate(habit.id, {
                      is_active: updated.is_active,
                    }),
                }}
              />
            ))}
          </div>
        ) : (
          <div className='border-light-gray/10 bg-gray rounded-xl border p-12 text-center'>
            <p className='text-light-gray mb-4'>У вас пока нет привычек</p>
            <Button
              onClick={openCreateModal}
              className='bg-primary hover:bg-primary/90 hover:shadow-primary/20 transition-all duration-200 hover:scale-105 hover:shadow-md'
            >
              <Plus className='mr-2 h-4 w-4' />
              Создать первую привычку
            </Button>
          </div>
        )}
      </section>

      <HabitModal
        open={isCreateModalOpen}
        onClose={closeCreateModal}
        onSave={async (data) => {
          await handleCreate(data as CreateHabitRequest)
          closeCreateModal()
        }}
      />

      {habitToEdit && (
        <EditHabitModal
          open={isEditModalOpen}
          onClose={closeEditModal}
          onSave={async (data) => {
            await handleUpdate(habitToEdit.id, data)
            closeEditModal()
          }}
          habit={habitToEdit}
        />
      )}
    </>
  )
}
