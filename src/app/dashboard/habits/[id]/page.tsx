'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function HabitDetailsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/dashboard/habits')
  }, [router])

  return null
}
