import { ReactNode } from 'react'

import { cn } from '@/shared/lib'
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

  return (
    <article className='grid items-center gap-10 max-sm:gap-5 lg:grid-cols-2'>
      <div className={cn(content, 'flex flex-col gap-3')}>
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
      </div>
      <div className={`${visualClassName} max-sm:w-full`}>{visual}</div>
    </article>
  )
}
