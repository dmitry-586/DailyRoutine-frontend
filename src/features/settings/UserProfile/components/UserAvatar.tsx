'use client'

import { Camera, User as UserIcon } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

interface UserAvatarProps {
  src?: string | null
  alt: string
  size?: number
  isEditing?: boolean
  onPhotoChange?: (file: File | null) => void
}

export function UserAvatar({
  src,
  alt,
  size = 80,
  isEditing = false,
  onPhotoChange,
}: UserAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (onPhotoChange) {
      onPhotoChange(file)
    }
    // Сброс input для возможности повторного выбора того же файла
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />
      <div
        className={`bg-light-gray/10 relative flex items-center justify-center overflow-hidden rounded-full ${
          isEditing ? 'cursor-pointer transition-opacity hover:opacity-80' : ''
        }`}
        style={{ width: size, height: size }}
        onClick={handleClick}
      >
        {src ? (
          src.startsWith('data:') ? (
            <img src={src} alt={alt} className='h-full w-full object-cover' />
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              className='object-cover'
              sizes={`${size}px`}
            />
          )
        ) : (
          <UserIcon
            className='text-light-gray'
            style={{ width: size * 0.5, height: size * 0.5 }}
          />
        )}
        {isEditing && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
            <Camera className='h-5 w-5 text-white' />
          </div>
        )}
      </div>
    </>
  )
}
