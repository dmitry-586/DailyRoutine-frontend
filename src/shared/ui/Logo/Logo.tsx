'use client'

import { cn } from '@/shared/lib/utils/cn'
import Image from 'next/image'

export interface LogoProps {
  title: string
  className?: string
  imageClassName?: string
  titleClassName?: string
}

export const Logo = ({
  title,
  className,
  imageClassName,
  titleClassName,
}: LogoProps) => (
  <div className={cn('flex items-center gap-2', className)}>
    <Image
      src='/logo.svg'
      alt='DailyRoutine'
      width={50}
      height={50}
      className={imageClassName}
    />
    <h1 className={cn('text-[22px]', titleClassName)}>{title}</h1>
  </div>
)

export default Logo
