'use client'

import * as ProgressPrimitive from '@radix-ui/react-progress'
import * as React from 'react'

import { cn } from '@/lib/utils/cn'
import { progressStyles } from './config'

const Progress = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
		indicatorClassName?: string
	}
>(({ className, value, indicatorClassName, ...props }, ref) => (
	<ProgressPrimitive.Root
		ref={ref}
		className={cn(progressStyles.root, className)}
		{...props}
	>
		<ProgressPrimitive.Indicator
			className={cn(progressStyles.indicator, indicatorClassName)}
			style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
		/>
	</ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
