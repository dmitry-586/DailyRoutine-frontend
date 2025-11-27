'use client'

import PWAInstallButton from '@/shared/ui/PWAInstallButton'
import TelegramAuthModal from '@/features/auth/TelegramAuthModal'
import Benefits from '@/features/landing/Benefits'
import CTA from '@/features/landing/CTA'
import Header from '@/features/landing/Header'
import LandingLayout from '@/features/landing/LandingLayout'
import Steps from '@/features/landing/Steps'
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
