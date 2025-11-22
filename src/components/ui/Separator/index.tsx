'use client'

import { cn } from '@/lib/utils/cn'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import * as React from 'react'

import { separatorStyles } from './config'

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        separatorStyles.base,
        orientation === 'horizontal'
          ? separatorStyles.horizontal
          : separatorStyles.vertical,
        className,
      )}
      {...props}
    />
  ),
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
