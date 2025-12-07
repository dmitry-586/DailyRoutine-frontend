'use client'

import { User as UserIcon } from 'lucide-react'
import Image from 'next/image'

interface UserAvatarProps {
  src?: string | null
  alt: string
  size?: number
}

export function UserAvatar({ src, alt, size = 80 }: UserAvatarProps) {
  return (
    <div
      className='bg-light-gray/10 relative flex items-center justify-center overflow-hidden rounded-full'
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className='object-cover'
          sizes={`${size}px`}
        />
      ) : (
        <UserIcon
          className='text-light-gray'
          style={{ width: size * 0.5, height: size * 0.5 }}
        />
      )}
    </div>
  )
}
