'use client'

import { m, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <m.div
      className='bg-primary fixed top-0 right-0 left-0 z-50 h-1 origin-left'
      style={{ scaleX }}
    />
  )
}
