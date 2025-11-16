import { cn } from '@/lib/utils/cn'
import { ILogoProps } from '@/types/ui.types'
import Image from 'next/image'

export default function Logo({
	title,
	className,
	imageClassName,
	titleClassName,
}: ILogoProps) {
	return (
		<div className={cn('flex items-center gap-2', className)}>
			<Image
				src='/logo.svg'
				alt='DailyRoutine'
				width={50}
				height={50}
				className={imageClassName}
			/>
			<h1 className={cn('text-[22px]', titleClassName)}>{title}</h1>
		</div>
	)
}
