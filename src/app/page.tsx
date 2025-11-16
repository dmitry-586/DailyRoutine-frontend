'use client'

import TelegramAuthModal from '@/components/features/auth/TelegramAuthModal'
import Benefits from '@/components/features/landing/Benefits'
import CTA from '@/components/features/landing/CTA'
import Header from '@/components/features/landing/Header'
import LandingLayout from '@/components/features/landing/LandingLayout'
import Steps from '@/components/features/landing/Steps'
import PWAInstallButton from '@/components/ui/PWAInstallButton'
import { useState } from 'react'

export default function Home() {
	const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false)

	return (
		<>
			<LandingLayout>
				<Header setIsTelegramModalOpen={setIsTelegramModalOpen} />
				<Steps />
				<Benefits />
			</LandingLayout>
			<CTA setIsTelegramModalOpen={setIsTelegramModalOpen} />
			<TelegramAuthModal
				isOpen={isTelegramModalOpen}
				onClose={() => setIsTelegramModalOpen(false)}
			/>
			<PWAInstallButton />
		</>
	)
}
