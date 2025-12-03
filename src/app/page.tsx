'use client'

import TelegramAuthModal from '@/features/auth/TelegramAuthModal'
import CTA from '@/features/landing/CTA'
import Header from '@/features/landing/Header'
import HowWork from '@/features/landing/HowWork'
import LandingLayout from '@/features/landing/LandingLayout'
import MainBlock from '@/features/landing/MainBlock/MainBlock'
import PWAInstallButton from '@/shared/ui/PWAInstallButton'
import { useState } from 'react'

export default function Home() {
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false)

  return (
    <>
      <Header setIsTelegramModalOpen={setIsTelegramModalOpen} />
      <LandingLayout className='pb-20 max-sm:pb-12'>
        <MainBlock setIsTelegramModalOpen={setIsTelegramModalOpen} />
      </LandingLayout>
      <LandingLayout className='max-lg:max-w-3xl' backgroundColor='dark-gray'>
        <HowWork />
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
