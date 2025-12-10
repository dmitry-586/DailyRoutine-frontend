import { AllHabits } from '@/features/habits'
import { PageHeader } from '@/shared/ui'
import { ListChecks } from 'lucide-react'

export default function HabitsPage() {
  return (
    <>
      <PageHeader title='Привычки' icon={ListChecks} />
      <AllHabits />
    </>
  )
}
