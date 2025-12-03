'use client'

import CTA from '@/features/landing/CTA'
import Header from '@/features/landing/Header'
import HowWork from '@/features/landing/HowWork'
import LandingLayout from '@/features/landing/LandingLayout'
import MainBlock from '@/features/landing/MainBlock/MainBlock'
import dynamic from 'next/dynamic'
import { useState } from 'react'

// Динамические импорты для компонентов, которые не критичны для первого рендера
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
