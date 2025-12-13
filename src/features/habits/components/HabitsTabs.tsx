import { TabsList, TabsTrigger } from '@/shared/ui'
import { HABIT_TABS } from '../config/habits'
import type { FilterType } from '../types'

interface HabitsTabsProps {
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
  tabCounts: Record<FilterType, number>
}

export function HabitsTabs({
  filter,
  onFilterChange,
  tabCounts,
}: HabitsTabsProps) {
  return (
    <div className='custom-scrollbar -mx-4 mb-6 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6'>
      <TabsList className='bg-gray inline-flex w-auto gap-1.5 sm:gap-2'>
        {HABIT_TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            active={filter === tab.value}
            variant='default'
            onClick={() => onFilterChange(tab.value)}
            className='flex-shrink-0 px-2.5 text-xs whitespace-nowrap sm:px-3 sm:text-sm'
          >
            {tab.label} ({tabCounts[tab.value]})
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  )
}
