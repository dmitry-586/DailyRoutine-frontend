import { StepProps } from '@/shared/types'
import Image from 'next/image'

export default function BlockCard({ title, description, image }: StepProps) {
  return (
    <div className='bg-gray flex w-full max-w-2xs flex-col items-center gap-3 rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] max-lg:px-5 max-lg:py-5 max-sm:max-w-[500px] max-sm:flex-row max-sm:gap-4 max-sm:p-4 max-sm:text-left'>
      <div className='shrink-0'>
        <Image src={image} alt={title} width={32} height={32} />
      </div>
      <div className='flex flex-col gap-1 max-sm:gap-0.5'>
        <h3 className='font-medium max-lg:text-sm'>{title}</h3>
        <p className='text-light-gray/80 text-center text-sm max-lg:text-xs max-sm:text-left'>
          {description}
        </p>
      </div>
    </div>
  )
}
