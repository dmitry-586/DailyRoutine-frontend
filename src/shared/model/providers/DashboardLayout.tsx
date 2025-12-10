'use client'

import { BottomNavigation, DesktopSidebar } from '@/features/dashboard/Sidebar'
import { usePathname } from 'next/navigation'
import { ReactNode, useState } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname?.startsWith(href)
  }

  return (
    <section className='safe-area-top bg-background flex min-h-screen'>
      <DesktopSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        isActive={isActive}
      />

      <BottomNavigation isActive={isActive} />

      <main
        className={`bg-background min-h-screen flex-1 overflow-x-hidden p-6 transition-all duration-300 ease-in-out max-lg:pb-28 max-sm:px-4 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}
      >
        {children}
      </main>
    </section>
  )
}
