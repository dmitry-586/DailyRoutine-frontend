'use client'

import { cn } from '@/lib/utils/cn'
import Image from 'next/image'

import { logoStyles } from './config'

export interface LogoProps {
	title: string
	className?: string
	imageClassName?: string
	titleClassName?: string
}

export default function Logo({
	title,
	className,
	imageClassName,
	titleClassName,
}: LogoProps) {
	return (
		<div className={cn(logoStyles.container, className)}>
			<Image
				src='/logo.svg'
				alt='DailyRoutine'
				width={50}
				height={50}
				className={imageClassName}
			/>
			<h1 className={cn(logoStyles.title, titleClassName)}>{title}</h1>
		</div>
	)
}
