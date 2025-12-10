'use client'

import { useHabitMutations, useHabits } from '@/shared/model/hooks'
import type { CreateHabitRequest, Habit } from '@/shared/types'
import {
  Button,
  EditHabitModal,
  HabitCard,
  HabitModal,
  TabsList,
  TabsTrigger,
} from '@/shared/ui'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { HABIT_TABS } from './config'
import { useAllHabits } from './useAllHabits'

export function AllHabits() {
  const { data: habits = [], isLoading } = useHabits()
  const { handleCreate, handleUpdate, handleDelete } = useHabitMutations()

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null)

  const { filter, setFilter, activeTab, filteredHabits, tabCounts } =
    useAllHabits(habits)

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
      <div className='custom-scrollbar -mx-4 mb-6 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6'>
        <TabsList className='bg-gray inline-flex w-auto gap-1.5 sm:gap-2'>
          {HABIT_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              active={filter === tab.value}
              variant='default'
              onClick={() => setFilter(tab.value)}
              className='flex-shrink-0 px-2.5 text-xs whitespace-nowrap sm:px-3 sm:text-sm'
            >
              {tab.label} ({tabCounts[tab.value]})
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className='max-w-7xl'>
        {isLoading ? (
          <div className='border-light-gray/10 bg-gray rounded-xl border p-12 text-center'>
            <p className='text-light-gray'>Загрузка привычек...</p>
          </div>
        ) : filteredHabits.length > 0 ? (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {filteredHabits.map((habit) => (
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
            <p className='text-light-gray mb-4'>{activeTab.emptyMessage}</p>
            <Button onClick={openCreateModal}>
              <Plus className='mr-2 h-4 w-4' />
              Создать привычку
            </Button>
          </div>
        )}
      </div>

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
