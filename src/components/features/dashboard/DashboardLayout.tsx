'use client'

import { Button } from '@/components/ui/Button'
import {
  ChevronLeft,
  ChevronRight,
  Home,
  List,
  Menu,
  Settings as SettingsIcon,
  ShoppingBag,
  Target,
  X,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface DashboardLayoutProps {
  children: React.ReactNode
}

const navItems = [
  { id: 'dashboard', label: 'Главная', icon: Home, href: '/dashboard' },
  { id: 'habits', label: 'Привычки', icon: List, href: '/dashboard/habits' },
  { id: 'sprints', label: 'Спринты', icon: Target, href: '/dashboard/sprints' },
  { id: 'shop', label: 'Магазин', icon: ShoppingBag, href: '/dashboard/shop' },
  {
    id: 'settings',
    label: 'Настройки',
    icon: SettingsIcon,
    href: '/dashboard/settings',
  },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname?.startsWith(href)
  }

  return (
    <div className="flex min-h-screen bg-[#2D3134]">
      {/* Sidebar - Desktop */}
      <aside
        className={`hidden border-r border-[#B3B3B3]/10 bg-[#3D4348] transition-all duration-300 ease-in-out md:flex md:flex-col ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } fixed top-0 bottom-0 left-0 z-30`}
      >
        {/* Toggle Button - вверху */}
        <div className="flex justify-end border-b border-[#B3B3B3]/10 p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="h-8 w-8 text-[#B3B3B3] hover:bg-[#2D3134] hover:text-white"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div
          className={`border-b border-[#B3B3B3]/10 transition-all duration-300 ease-in-out ${
            sidebarCollapsed ? 'p-2' : 'p-4 px-6'
          }`}
        >
          <div
            className={`transition-all duration-300 ease-in-out ${
              sidebarCollapsed
                ? 'max-h-0 overflow-hidden opacity-0'
                : 'max-h-20 opacity-100'
            }`}
          >
            <h2 className="text-xl whitespace-nowrap text-white">
              Daily Routine
            </h2>
            <p className="text-sm whitespace-nowrap text-[#1CBECB]">
              Трекер привычек
            </p>
          </div>
        </div>

        <nav className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex w-full items-center ${
                    sidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-4'
                  } cursor-pointer rounded-lg py-3 transition-all duration-200 ease-in-out ${
                    active
                      ? 'bg-[#1CBECB] text-white hover:bg-[#1CBECB]/90'
                      : 'text-[#B3B3B3] hover:bg-[#2D3134] hover:text-white'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <span
                    className={`whitespace-nowrap transition-all duration-300 ease-in-out ${
                      sidebarCollapsed
                        ? 'max-w-0 overflow-hidden opacity-0'
                        : 'max-w-full opacity-100'
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>

        <div
          className={`overflow-hidden border-t border-[#B3B3B3]/10 transition-all duration-300 ease-in-out ${
            sidebarCollapsed
              ? 'max-h-0 p-0 opacity-0'
              : 'max-h-40 p-4 opacity-100'
          }`}
        >
          <div className="overflow-hidden rounded-lg bg-[#2D3134] p-4">
            <p className="mb-2 text-sm whitespace-nowrap text-[#B3B3B3]">
              Ваш прогресс
            </p>
            <div className="flex items-baseline gap-2 whitespace-nowrap">
              <span className="text-2xl text-white">85%</span>
              <span className="text-sm text-[#4CAF50]">+5%</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="fixed top-0 right-0 left-0 z-50 border-b border-[#B3B3B3]/10 bg-[#3D4348] p-4 md:hidden">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white">Daily Routine</h2>
            <p className="text-sm text-[#1CBECB]">Трекер привычек</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#3D4348] pt-20 md:hidden">
          <nav className="p-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                      active
                        ? 'bg-[#1CBECB] text-white'
                        : 'text-[#B3B3B3] hover:bg-[#2D3134]'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 pt-16 transition-all duration-300 ease-in-out md:pt-0 ${
          sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
        }`}
      >
        {children}
      </main>
    </div>
  )
}
