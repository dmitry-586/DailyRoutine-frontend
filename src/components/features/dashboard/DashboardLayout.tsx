'use client'

import { usePathname } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { BottomNavigation } from './Sidebar/BottomNavigation'
import { DesktopSidebar } from './Sidebar/Desktop'

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
    <section className='bg-background flex min-h-screen'>
      <DesktopSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        isActive={isActive}
      />

      <BottomNavigation isActive={isActive} />

      <main
        className={`flex-1 pb-20 transition-all duration-300 ease-in-out lg:pb-0 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        }`}
      >
        {children}
      </main>
    </section>
  )
}
