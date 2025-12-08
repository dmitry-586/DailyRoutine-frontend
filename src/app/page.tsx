'use client'

import CTA from '@/features/landing/CTA'
import Features from '@/features/landing/Features'
import Footer from '@/features/landing/Footer'
import Header from '@/features/landing/Header'
import HowWork from '@/features/landing/HowWork'
import LandingStructuredData from '@/features/landing/LandingStructuredData'
import MainBlock from '@/features/landing/MainBlock/MainBlock'
import LandingLayout from '@/shared/model/providers/LandingLayout'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const TelegramAuthModal = dynamic(
  () => import('@/features/auth/TelegramAuthModal'),
  {
    ssr: false,
  },
)

const PWAInstallButton = dynamic(() => import('@/shared/ui/PWAInstallButton'), {
  ssr: false,
})

export default function Home() {
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false)

  return (
    <>
      <LandingStructuredData />
      <Header setIsTelegramModalOpen={setIsTelegramModalOpen} />
      <LandingLayout className='pb-20 max-sm:pb-12'>
        <MainBlock setIsTelegramModalOpen={setIsTelegramModalOpen} />
      </LandingLayout>
      <HowWork />
      <Features />
      <CTA setIsTelegramModalOpen={setIsTelegramModalOpen} />
      <Footer />
      <TelegramAuthModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
      />
      <PWAInstallButton />
    </>
  )
}
