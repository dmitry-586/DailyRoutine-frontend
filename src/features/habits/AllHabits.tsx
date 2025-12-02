'use client'

import { Button } from '@/shared/ui/Button'
import { HabitCard } from '@/shared/ui/HabitCard'
import { HabitModal } from '@/shared/ui/HabitModal'
import { TabsList, TabsTrigger } from '@/shared/ui/Tabs'
import { Plus } from 'lucide-react'
import { HABIT_TABS } from './config'
import type { AllHabitsProps } from './types'
import { useAllHabits } from './useAllHabits'

export function AllHabits({
  habits,
  onAddHabit,
  onUpdateHabit,
  onDeleteHabit,
  onCompleteHabit,
}: AllHabitsProps) {
  const {
    filter,
    setFilter,
    isModalOpen,
    editingHabit,
    activeTab,
    filteredHabits,
    tabCounts,
    handleModal,
    handleClose,
    handleSave,
    handleToggleActive,
  } = useAllHabits({
    habits,
    onAddHabit,
    onUpdateHabit,
  })

  return (
    <>
      <div className='custom-scrollbar -mx-4 mb-6 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6'>
        <TabsList className='bg-gray inline-flex w-auto gap-1.5 sm:gap-2'>
          {HABIT_TABS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              active={filter === tab.value}
              variant={tab.variant}
              onClick={() => setFilter(tab.value)}
              className='flex-shrink-0 px-2.5 text-xs whitespace-nowrap sm:px-3 sm:text-sm'
            >
              {tab.label} ({tabCounts[tab.value]})
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <div className='max-w-7xl'>
        {filteredHabits.length > 0 ? (
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {filteredHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                data={habit}
                handlers={{
                  onEdit: handleModal,
                  onDelete: onDeleteHabit,
                  onComplete: onCompleteHabit,
                  onToggleActive: handleToggleActive,
                }}
              />
            ))}
          </div>
        ) : (
          <div className='border-light-gray/10 bg-gray rounded-xl border p-12 text-center'>
            <p className='text-light-gray mb-4'>{activeTab.emptyMessage}</p>
            <Button onClick={() => handleModal()}>
              <Plus className='mr-2 h-4 w-4' />
              Создать привычку
            </Button>
          </div>
        )}
      </div>

      <HabitModal
        open={isModalOpen}
        onClose={handleClose}
        onSave={handleSave}
        habit={editingHabit}
      />
    </>
  )
}
