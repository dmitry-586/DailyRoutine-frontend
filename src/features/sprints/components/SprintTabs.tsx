import { TabsList, TabsTrigger } from '@/shared/ui'

import type { SprintTab } from '../types'

interface SprintTabsProps {
  activeTab: SprintTab
  onTabChange: (tab: SprintTab) => void
  activeCount: number
  availableCount: number
}

export function SprintTabs({
  activeTab,
  onTabChange,
  activeCount,
  availableCount,
}: SprintTabsProps) {
  return (
    <TabsList className='bg-gray mb-6 gap-2'>
      <TabsTrigger
        active={activeTab === 'active'}
        onClick={() => onTabChange('active')}
        className='hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:hover:bg-primary transition-all duration-200'
      >
        Текущие ({activeCount})
      </TabsTrigger>
      <TabsTrigger
        active={activeTab === 'available'}
        onClick={() => onTabChange('available')}
        className='hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:hover:bg-primary transition-all duration-200'
      >
        Доступные ({availableCount})
      </TabsTrigger>
    </TabsList>
  )
}
