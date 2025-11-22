'use client'

import { cn } from '@/lib/utils/cn'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import * as React from 'react'

import { switchStyles } from './config'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchStyles.root, className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className={cn(switchStyles.thumb)} />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
