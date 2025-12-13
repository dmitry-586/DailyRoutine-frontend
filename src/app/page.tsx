'use client'

import {
  CTA,
  Features,
  Footer,
  Header,
  HowWorkSection,
  LandingStructuredData,
  MainBlock,
} from '@/features/landing'
import { LandingLayout } from '@/shared/model/providers'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const TelegramAuthModal = dynamic(
  () =>
    import('@/features/auth').then((mod) => ({
      default: mod.TelegramAuthModal,
    })),
  {
    ssr: false,
  },
)

const PWAInstallButton = dynamic(
  () => import('@/shared/ui/PWAInstallButton/PWAInstallButton'),
  {
    ssr: false,
  },
)

export default function Home() {
  const [isTelegramModalOpen, setIsTelegramModalOpen] = useState(false)

  return (
    <>
      <LandingStructuredData />
      <Header setIsTelegramModalOpen={setIsTelegramModalOpen} />
      <LandingLayout className='pb-20 max-sm:pb-12'>
        <MainBlock setIsTelegramModalOpen={setIsTelegramModalOpen} />
      </LandingLayout>
      <HowWorkSection />
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
