'use client'

import { useHabitMutations, useHabits } from '@/shared/model/hooks'
import type { HabitCreate } from '@/shared/types'
import { EditHabitModal, HabitModal } from '@/shared/ui'
import { useAllHabits, useHabitModals } from '../hooks'
import { HabitsEmpty } from './HabitsEmpty'
import { HabitsList } from './HabitsList'
import { HabitsLoading } from './HabitsLoading'
import { HabitsTabs } from './HabitsTabs'

export function AllHabits() {
  const { data: habits = [], isLoading } = useHabits()
  const { handleCreate, handleUpdate, handleDelete } = useHabitMutations()

  const {
    isCreateModalOpen,
    openCreateModal,
    closeCreateModal,
    isEditModalOpen,
    habitToEdit,
    openEditModal,
    closeEditModal,
  } = useHabitModals()

  const { filter, setFilter, activeTab, filteredHabits, tabCounts } =
    useAllHabits(habits)

  return (
    <>
      <HabitsTabs
        filter={filter}
        onFilterChange={setFilter}
        tabCounts={tabCounts}
      />

      <div className='max-w-7xl'>
        {isLoading ? (
          <HabitsLoading />
        ) : filteredHabits.length > 0 ? (
          <HabitsList
            habits={filteredHabits}
            onEdit={openEditModal}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ) : (
          <HabitsEmpty
            message={activeTab.emptyMessage}
            onCreateClick={openCreateModal}
          />
        )}
      </div>

      <HabitModal
        open={isCreateModalOpen}
        onClose={closeCreateModal}
        onSave={async (data) => {
          await handleCreate(data as HabitCreate)
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
