'use client'

import { PageHeader } from '@/shared/ui'
import { Target } from 'lucide-react'
import { useState } from 'react'

import {
  ActiveSprintsTab,
  AvailableSprintsTab,
  EmptyState,
  SprintStats,
  SprintTabs,
} from './components'
import { SPRINT_PAGE_CONFIG } from './config/constants'
import { useSprintSelection, useSprintsWithProgress } from './hooks'
import type { SprintTab } from './types'

export function Sprints() {
  const { sprintsWithProgress, isLoading } = useSprintsWithProgress()
  const { currentSprints, availableSprints, isMaxSelected, toggleSprint } =
    useSprintSelection(sprintsWithProgress, isLoading)

  const [activeTab, setActiveTab] = useState<SprintTab>('active')

  return (
    <div className='mx-auto max-w-7xl'>
      <PageHeader
        title={SPRINT_PAGE_CONFIG.title}
        icon={Target}
        description={SPRINT_PAGE_CONFIG.description}
      />

      {isLoading ? (
        <EmptyState title='Загружаем спринты...' description='' />
      ) : sprintsWithProgress.length === 0 ? (
        <EmptyState
          title='Нет активных спринтов'
          description='Активные спринты появятся здесь'
        />
      ) : (
        <>
          <SprintStats currentSprints={currentSprints} />

          <div className='mb-8'>
            <SprintTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              activeCount={currentSprints.length}
              availableCount={availableSprints.length}
            />

            {activeTab === 'active' && (
              <ActiveSprintsTab currentSprints={currentSprints} />
            )}

            {activeTab === 'available' && (
              <AvailableSprintsTab
                availableSprints={availableSprints}
                isMaxSelected={isMaxSelected}
                onToggleSprint={toggleSprint}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}
