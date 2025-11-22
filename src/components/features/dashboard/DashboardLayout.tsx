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
		<div className='flex min-h-screen bg-[#2D3134]'>
			{/* Sidebar - Desktop */}
			<aside
				className={`hidden md:flex md:flex-col bg-[#3D4348] border-r border-[#B3B3B3]/10 transition-all duration-300 ease-in-out ${
					sidebarCollapsed ? 'w-16' : 'w-64'
				} fixed left-0 top-0 bottom-0 z-30`}
			>
				{/* Toggle Button - вверху */}
				<div className='p-2 border-b border-[#B3B3B3]/10 flex justify-end'>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
						className='h-8 w-8 text-[#B3B3B3] hover:text-white hover:bg-[#2D3134]'
					>
						{sidebarCollapsed ? (
							<ChevronRight className='w-4 h-4' />
						) : (
							<ChevronLeft className='w-4 h-4' />
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
								? 'opacity-0 max-h-0 overflow-hidden'
								: 'opacity-100 max-h-20'
						}`}
					>
						<h2 className='text-white text-xl whitespace-nowrap'>
							Daily Routine
						</h2>
						<p className='text-[#1CBECB] text-sm whitespace-nowrap'>
							Трекер привычек
						</p>
					</div>
				</div>

				<nav className='flex-1 p-4 overflow-y-auto overflow-x-hidden'>
					<div className='space-y-2'>
						{navItems.map(item => {
							const Icon = item.icon
							const active = isActive(item.href)
							return (
								<Link
									key={item.id}
									href={item.href}
									className={`w-full flex items-center ${
										sidebarCollapsed ? 'justify-center px-2' : 'gap-3 px-4'
									} py-3 rounded-lg transition-all duration-200 ease-in-out cursor-pointer ${
										active
											? 'bg-[#1CBECB] text-white hover:bg-[#1CBECB]/90'
											: 'text-[#B3B3B3] hover:bg-[#2D3134] hover:text-white'
									}`}
									title={sidebarCollapsed ? item.label : undefined}
								>
									<Icon className='w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110' />
									<span
										className={`whitespace-nowrap transition-all duration-300 ease-in-out ${
											sidebarCollapsed
												? 'opacity-0 max-w-0 overflow-hidden'
												: 'opacity-100 max-w-full'
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
					className={`border-t border-[#B3B3B3]/10 transition-all duration-300 ease-in-out overflow-hidden ${
						sidebarCollapsed
							? 'opacity-0 max-h-0 p-0'
							: 'opacity-100 max-h-40 p-4'
					}`}
				>
					<div className='bg-[#2D3134] rounded-lg p-4 overflow-hidden'>
						<p className='text-[#B3B3B3] text-sm mb-2 whitespace-nowrap'>
							Ваш прогресс
						</p>
						<div className='flex items-baseline gap-2 whitespace-nowrap'>
							<span className='text-white text-2xl'>85%</span>
							<span className='text-[#4CAF50] text-sm'>+5%</span>
						</div>
					</div>
				</div>
			</aside>

			{/* Mobile Header */}
			<div className='md:hidden fixed top-0 left-0 right-0 bg-[#3D4348] border-b border-[#B3B3B3]/10 p-4 z-50'>
				<div className='flex items-center justify-between'>
					<div>
						<h2 className='text-white'>Daily Routine</h2>
						<p className='text-[#1CBECB] text-sm'>Трекер привычек</p>
					</div>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						className='text-white'
					>
						{mobileMenuOpen ? (
							<X className='w-6 h-6' />
						) : (
							<Menu className='w-6 h-6' />
						)}
					</Button>
				</div>
			</div>

			{/* Mobile Menu */}
			{mobileMenuOpen && (
				<div className='md:hidden fixed inset-0 bg-[#3D4348] z-40 pt-20'>
					<nav className='p-4'>
						<div className='space-y-2'>
							{navItems.map(item => {
								const Icon = item.icon
								const active = isActive(item.href)
								return (
									<Link
										key={item.id}
										href={item.href}
										onClick={() => setMobileMenuOpen(false)}
										className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
											active
												? 'bg-[#1CBECB] text-white'
												: 'text-[#B3B3B3] hover:bg-[#2D3134]'
										}`}
									>
										<Icon className='w-5 h-5' />
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
				className={`flex-1 md:pt-0 pt-16 transition-all duration-300 ease-in-out ${
					sidebarCollapsed ? 'md:ml-16' : 'md:ml-64'
				}`}
			>
				{children}
			</main>
		</div>
	)
}
