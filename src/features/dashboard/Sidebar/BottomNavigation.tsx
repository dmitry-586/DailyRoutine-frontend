'use client'

import { cn } from '@/shared/lib'
import Link from 'next/link'
import { NAV_ITEMS } from './config'

interface BottomNavigationProps {
  isActive: (href: string) => boolean
}

export function BottomNavigation({ isActive }: BottomNavigationProps) {
  return (
    <nav className='border-light-gray/20 bg-gray fixed right-0 bottom-0 left-0 z-50 border-t lg:hidden'>
      <div className='mx-auto flex w-fit items-center gap-8 px-2 py-2 max-sm:gap-6'>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 py-1',
                active ? 'text-primary' : 'text-light-gray active:scale-95',
              )}
            >
              <Icon
                className={cn('size-6 max-sm:size-5', active && 'scale-110')}
              />
              <span
                className={cn(
                  'text-xs leading-tight font-medium max-sm:text-[10px] max-sm:font-normal',
                  active ? 'text-primary' : 'text-light-gray',
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
