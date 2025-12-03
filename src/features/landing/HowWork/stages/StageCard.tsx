import { ReactNode } from 'react'

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
      <div className={content}>
        <div className='mb-5 max-sm:mb-3 max-sm:flex max-sm:items-center max-sm:gap-3'>
          <div className='bg-primary inline-flex h-12 w-12 items-center justify-center rounded-lg text-xl font-semibold max-sm:h-10 max-sm:w-10 max-sm:shrink-0 max-sm:text-lg'>
            {number}
          </div>
          <h3 className='mb-3 text-3xl leading-tight font-semibold max-sm:mb-0 max-sm:text-xl max-sm:leading-tight'>
            {title}
          </h3>
        </div>
        <p className='text-light-gray/90 mb-5 text-base leading-relaxed max-sm:mb-3 max-sm:text-sm max-sm:leading-relaxed'>
          {description}
        </p>
        <StageFeatures features={features} />
      </div>
      <div className={`${visualClassName} max-sm:w-full`}>{visual}</div>
    </article>
  )
}
