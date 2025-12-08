'use client'

import { cn } from '@/shared/lib'
import { useHabits } from '@/shared/model/hooks/useHabits'
import Logo from '@/shared/ui/Logo'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'
import { NAV_ITEMS } from './config'

interface DesktopSidebarProps {
  sidebarCollapsed: boolean
  isActive: (href: string) => boolean
  setSidebarCollapsed: (collapsed: boolean) => void
}

export function DesktopSidebar({
  sidebarCollapsed,
  isActive,
  setSidebarCollapsed,
}: DesktopSidebarProps) {
  const { data: habits = [] } = useHabits()

  const progress = useMemo(() => {
    const activeHabits = habits.filter((h) => h.is_active !== false)
    const completedToday = activeHabits.filter((h) => h.is_done).length

    if (activeHabits.length === 0) return 0

    return Math.round((completedToday / activeHabits.length) * 100)
  }, [habits])

  return (
    <section
      className={`border-light-gray/20 bg-gray hidden border-r transition-all duration-300 ease-in-out lg:flex lg:flex-col ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      } fixed top-0 bottom-0 left-0 z-30`}
    >
      <div className='border-light-gray/20 flex border-b p-2'>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={cn(
            'hover:bg-background text-light-gray flex size-8 items-center justify-center rounded-lg transition-all duration-300 hover:text-white',
            sidebarCollapsed ? 'ml-[8px]' : 'ml-[208px]',
          )}
        >
          {sidebarCollapsed ? (
            <ChevronRight className='size-5' />
          ) : (
            <ChevronLeft className='size-5' />
          )}
        </button>
      </div>

      <div
        className={`border-light-gray/20 border-b transition-discrete duration-300 ease-in-out ${
          sidebarCollapsed ? 'p-0' : 'px-6 py-4'
        }`}
      >
        <Logo
          title='Daily Routine'
          className={cn(
            'overflow-hidden transition-all duration-300',
            sidebarCollapsed ? 'opacity-0' : 'opacity-100',
          )}
          titleClassName={cn(
            'whitespace-nowrap transition-all duration-300',
            sidebarCollapsed ? 'text-sm' : 'text-lg',
          )}
          imageClassName={cn(
            'size-[34px] shrink-0 transition-all duration-300',
            sidebarCollapsed ? 'size-[18px]' : 'size-[34px]',
          )}
        />
      </div>

      <nav
        className={cn(
          'flex-1 overflow-x-hidden overflow-y-auto p-4 transition-all duration-300 ease-in-out',
          sidebarCollapsed ? 'px-2 py-4' : 'p-4',
        )}
      >
        <div className='space-y-2'>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'flex w-full cursor-pointer items-center rounded-lg py-3',
                  'transition-all duration-300 ease-in-out',
                  sidebarCollapsed ? 'gap-0 px-[14px]' : 'gap-3 px-4',
                  active
                    ? 'bg-primary hover:bg-primary/80 text-white'
                    : 'hover:bg-background text-light-gray hover:text-white',
                )}
              >
                <div className='flex h-5 w-5 flex-shrink-0 items-center justify-center'>
                  <Icon className='h-5 w-5 transition-transform duration-200 group-hover:scale-110' />
                </div>
                <span
                  className={cn(
                    'overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out',
                    sidebarCollapsed ? 'text-xs opacity-0' : 'opacity-100',
                  )}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>

      <div
        className={`border-light-gray/20 overflow-hidden border-t transition-all duration-300 ease-in-out ${
          sidebarCollapsed
            ? 'max-h-0 p-0 opacity-0'
            : 'max-h-40 p-4 opacity-100'
        }`}
      >
        <div className='bg-background overflow-hidden rounded-lg p-4'>
          <p className='text-light-gray mb-2 text-sm whitespace-nowrap'>
            Ваш прогресс
          </p>
          <div className='flex items-baseline gap-2 whitespace-nowrap'>
            <span className='text-2xl text-white'>{progress}%</span>
          </div>
        </div>
      </div>
    </section>
  )
}
