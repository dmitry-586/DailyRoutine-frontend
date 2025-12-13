'use client'

import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { NAV_ITEMS } from './config'

interface BottomNavigationProps {
  isActive: (href: string) => boolean
}

export function BottomNavigation({ isActive }: BottomNavigationProps) {
  return (
    <nav
      className='no-safe-area-padding bg-gray/30 fixed left-1/2 z-50 w-fit -translate-x-1/2 rounded-full border border-white/20 backdrop-blur-sm lg:hidden'
      style={{
        bottom: '1.25rem',
        paddingBottom: 0,
        WebkitBackdropFilter: 'blur(10px)',
        backdropFilter: 'blur(10px)',
      }}
    >
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
