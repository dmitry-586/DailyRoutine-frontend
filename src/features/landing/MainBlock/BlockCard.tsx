import { StepProps } from '@/shared/types'
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function BlockCard({ title, description, image }: StepProps) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseXPos = event.clientX - rect.left
    const mouseYPos = event.clientY - rect.top
    const xPct = mouseXPos / width - 0.5
    const yPct = mouseYPos / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className='bg-gray group relative flex w-full max-w-2xs flex-col items-center gap-3 rounded-xl p-6 max-lg:px-5 max-lg:py-5 max-sm:max-w-[500px] max-sm:flex-row max-sm:gap-4 max-sm:p-4 max-sm:text-left shadow-xl hover:shadow-primary/10'
    >
      <div className='shrink-0 transition-transform group-hover:translate-z-10' style={{ transform: 'translateZ(10px)' }}>
        <Image src={image} alt={title} width={32} height={32} />
      </div>
      <div className='flex flex-col gap-1 max-sm:gap-0.5' style={{ transform: 'translateZ(10px)' }}>
        <h3 className='font-medium transition-colors group-hover:text-primary max-lg:text-sm'>{title}</h3>
        <p className='text-light-gray/80 text-center text-sm max-lg:text-xs max-sm:text-left'>
          {description}
        </p>
      </div>
    </m.div>
  )
}
