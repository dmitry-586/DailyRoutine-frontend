import { ReactNode } from 'react'

import { cn } from '@/shared/lib'
import { m } from 'framer-motion'
import { HowWorkStage } from '../types'
import StageFeatures from './StageFeatures'

interface StageCardProps extends Omit<HowWorkStage, 'visualId'> {
  visual: ReactNode
}

const ALIGN_CLASSNAME: Record<
  NonNullable<HowWorkStage['align']>,
  { content: string; visual: string }
> = {
  default: { content: '', visual: '' },
  reversed: { content: 'lg:order-2', visual: 'lg:order-1' },
}

export default function StageCard({
  number,
  title,
  description,
  features,
  visual,
  align = 'default',
}: StageCardProps) {
  const { content, visual: visualClassName } = ALIGN_CLASSNAME[align]
  const isReversed = align === 'reversed'

  return (
    <article className='grid items-center gap-10 overflow-hidden max-sm:gap-5 lg:grid-cols-2'>
      <m.div
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.4, ease: 'easeOut' as const }}
        className={cn(content, 'flex flex-col gap-3')}
      >
        <div className='flex flex-col gap-3 max-lg:flex-row max-lg:items-center'>
          <div className='bg-primary inline-flex size-12 items-center justify-center rounded-lg text-xl font-semibold max-lg:size-10 max-lg:shrink-0 max-lg:text-lg'>
            {number}
          </div>
          <h3 className='text-3xl font-semibold max-lg:text-2xl'>{title}</h3>
        </div>
        <p className='text-light-gray/90 text-base max-sm:text-sm'>
          {description}
        </p>
        <StageFeatures features={features} />
      </m.div>
      <m.div
        initial={{ opacity: 0, x: isReversed ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: 'easeOut' as const, delay: 0.2 }}
        className={`${visualClassName} max-sm:w-full`}
      >
        {visual}
      </m.div>
    </article>
  )
}
