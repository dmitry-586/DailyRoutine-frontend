import type { Habit } from '@/shared/types'
import { HabitCard } from './HabitCard'

interface HabitsListProps {
  habits: Habit[]
  onEdit: (habit: Habit) => void
  onDelete: (id: number) => void
  onUpdate: (id: number, data: Partial<Habit>) => void
}

export function HabitsList({
  habits,
  onEdit,
  onDelete,
  onUpdate,
}: HabitsListProps) {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          data={habit}
          handlers={{
            onEdit,
            onDelete,
            onComplete: (updated) =>
              void onUpdate(habit.id, {
                is_done: updated.is_done,
                current_value: updated.current_value,
              }),
            onToggleActive: (updated) =>
              void onUpdate(habit.id, {
                is_active: updated.is_active,
              }),
          }}
        />
      ))}
    </div>
  )
}
