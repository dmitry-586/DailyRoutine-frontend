'use client'

import { cn } from '@/shared/lib'
import Link from 'next/link'
import { NAV_ITEMS } from './config'

interface BottomNavigationProps {
  isActive: (href: string) => boolean
}

export function BottomNavigation({ isActive }: BottomNavigationProps) {
  return (
    <nav className='bg-gray/30 fixed bottom-5 left-1/2 z-50 w-fit -translate-x-1/2 rounded-full border border-white/20 pb-0 backdrop-blur-sm lg:hidden'>
      <div className='flex items-center gap-8 px-8 py-2.5'>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                active ? 'text-primary' : 'text-light-gray active:scale-95',
              )}
            >
              <Icon
                className={cn('size-6 max-sm:size-5.5', active && 'scale-110')}
              />
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
