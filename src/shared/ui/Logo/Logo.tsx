'use client'

import { cn } from '@/shared/lib/utils'
import { m } from 'framer-motion'
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
  <m.div 
    whileHover='hover'
    className={cn('flex items-center gap-2', className)}
  >
    <m.div
      variants={{
        hover: { rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }
      }}
    >
      <Image
        src='/logo.svg'
        alt='DailyRoutine'
        width={50}
        height={50}
        className={imageClassName}
      />
    </m.div>
    <m.h1 
      variants={{
        hover: { x: 2, transition: { duration: 0.2 } }
      }}
      className={cn('text-[22px]', titleClassName)}
    >
      {title}
    </m.h1>
  </m.div>
)

export default Logo
