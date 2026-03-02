'use client'

import {
  Benefits,
  CTA,
  FAQ,
  Features,
  Footer,
  Header,
  HowWorkSection,
  LandingStructuredData,
  MainBlock,
  ScrollProgress,
} from '@/features/landing'
import { LandingLayout } from '@/shared/model/providers'
import { m } from 'framer-motion'
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
      <ScrollProgress />
      <LandingStructuredData />
      <div className='relative overflow-hidden'>
        <m.div 
          initial={{ opacity: 0 }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className='bg-primary pointer-events-none absolute -top-[10%] -left-[10%] size-[50vw] rounded-full blur-[120px]'
        />
        

        <Header setIsTelegramModalOpen={setIsTelegramModalOpen} />
        <LandingLayout className='pb-20 max-sm:pb-12'>
          <MainBlock setIsTelegramModalOpen={setIsTelegramModalOpen} />
        </LandingLayout>
        <HowWorkSection />
        <Benefits />
        <Features />
        <FAQ />
        <CTA setIsTelegramModalOpen={setIsTelegramModalOpen} />
        <Footer />
      </div>
      <TelegramAuthModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
      />
      <PWAInstallButton />
    </>
  )
}
