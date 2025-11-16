'use client'

import Sidebar from '@/components/ui/Sidebar'
import { cn } from '@/lib/utils/cn'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function DashboardPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	return (
		<>
			<div className='p-5 flex items-center gap-5'>
				<button
					className={cn(
						'cursor-pointer transition-opacity duration-200',
						isSidebarOpen && 'opacity-0'
					)}
					onClick={() => setIsSidebarOpen(true)}
				>
					<Image src='/assets/menu.svg' alt='menu' width={24} height={24} />
				</button>
				<Link href='/profile' className='flex items-center gap-2'>
					<Image src='/assets/avatar.svg' alt='avatar' width={30} height={30} />
					<p className='text-lg font-medium'>Dmitry Kutsevalov</p>
				</Link>
			</div>
			<Sidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				position='left'
				children={<div className='text-lg font-medium mt-5'>Dashboard</div>}
			/>
		</>
	)
}
