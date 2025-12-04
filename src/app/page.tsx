'use client'

import CTA from '@/features/landing/CTA'
import Header from '@/features/landing/Header'
import HowWork from '@/features/landing/HowWork'
import LandingLayout from '@/features/landing/LandingLayout'
import MainBlock from '@/features/landing/MainBlock/MainBlock'
import { useMe } from '@/shared/model/hooks/useAuth'
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
  const { data: user, isLoading } = useMe()

  // Показываем лоадер, пока проверяем авторизацию
  if (isLoading) {
    return (
      <div className='bg-background flex min-h-screen items-center justify-center'>
        <div className='border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent' />
      </div>
    )
  }

  // Если пользователь авторизован, не показываем контент (редирект уже произошел)
  if (user) {
    return null
  }

  return (
    <>
      <Header setIsTelegramModalOpen={setIsTelegramModalOpen} />
      <LandingLayout className='pb-20 max-sm:pb-12'>
        <MainBlock setIsTelegramModalOpen={setIsTelegramModalOpen} />
      </LandingLayout>
      <HowWork />
      <CTA setIsTelegramModalOpen={setIsTelegramModalOpen} />
      <TelegramAuthModal
        isOpen={isTelegramModalOpen}
        onClose={() => setIsTelegramModalOpen(false)}
      />
      <PWAInstallButton />
    </>
  )
}
