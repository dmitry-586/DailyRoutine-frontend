'use client'

import { useMe, useMounted } from '@/shared/model/hooks'
import { ProfileContent, ProfileHeader, ProfileSkeleton } from './components'
import { useProfileEdit } from './lib'

export function UserProfile() {
  const { isLoading } = useMe()
  const isMounted = useMounted()
  const profileState = useProfileEdit()

  if (!isMounted || isLoading) {
    return <ProfileSkeleton />
  }

  if (!profileState) {
    return null
  }

  return (
    <div className='border-light-gray/10 bg-gray rounded-xl border p-6'>
      <ProfileHeader state={profileState} />
      <ProfileContent state={profileState} />
    </div>
  )
}
