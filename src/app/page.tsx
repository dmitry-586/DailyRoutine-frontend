'use client'

import TelegramAuthModal from '@/components/auth/TelegramAuthModal'
import Benefits from '@/components/lending/benefits'
import CTA from '@/components/lending/cta.lending'
import Footer from '@/components/lending/footer.lending'
import Header from '@/components/lending/Header.lending'
import Steps from '@/components/lending/steps'
import PWAInstallButton from '@/components/ui/PWAInstallButton'
import LendingLayout from '@/layouts/Lending.layout'
import { useState } from 'react'

export default function Home() {
	const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false)

	return (
		<>
			<LendingLayout>
				<Header setIsTelegramModalOpen={setIsTelegramModalOpen} />
				<Steps />
				<Benefits />
			</LendingLayout>
			<CTA setIsTelegramModalOpen={setIsTelegramModalOpen} />
			<TelegramAuthModal
				isOpen={isTelegramModalOpen}
				onClose={() => setIsTelegramModalOpen(false)}
			/>
			<LendingLayout>
				<Footer />
			</LendingLayout>
			<PWAInstallButton />
		</>
	)
}
