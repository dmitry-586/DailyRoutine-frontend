'use client'

import { AllHabits, initialHabits } from '@/features/habits'
import { PageHeader } from '@/shared/ui/PageHeader'
import { ListChecks } from 'lucide-react'

export default function HabitsPage() {
  return (
    <>
      <PageHeader
        title='Привычки'
        description='Управляйте своими привычками'
        icon={ListChecks}
      />
      <AllHabits
        habits={initialHabits}
        onAddHabit={() => {}}
        onUpdateHabit={() => {}}
        onDeleteHabit={() => {}}
        onCompleteHabit={() => {}}
      />
    </>
  )
}
