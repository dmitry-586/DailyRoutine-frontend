'use client'

import CTA from '@/features/landing/CTA'
import Header from '@/features/landing/Header'
import HowWork from '@/features/landing/HowWork'
import LandingLayout from '@/features/landing/LandingLayout'
import MainBlock from '@/features/landing/MainBlock/MainBlock'
import { useMe } from '@/shared/model/hooks/useAuth'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
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
  const { data: user } = useMe()
  const router = useRouter()

  const handleOpenAuth = () => {
    // Если пользователь уже авторизован, редиректим на dashboard
    if (user) {
      router.push('/dashboard')
    } else {
      // Иначе открываем модалку авторизации
      setIsTelegramModalOpen(true)
    }
  }

  return (
    <>
      <Header setIsTelegramModalOpen={handleOpenAuth} />
      <LandingLayout className='pb-20 max-sm:pb-12'>
        <MainBlock setIsTelegramModalOpen={handleOpenAuth} />
      </LandingLayout>
      <HowWork />
      <CTA setIsTelegramModalOpen={handleOpenAuth} />
      <TelegramAuthModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
      />
      <PWAInstallButton />
    </>
  )
}
