import { LogoProps } from '@/types/header/logo.interface'
import Image from 'next/image'

export default function Logo({
	title,
	className,
	imageClassName,
	titleClassName,
}: LogoProps) {
	return (
		<div className={`flex items-center gap-2 ${className}`}>
			<Image
				src='/logo.svg'
				alt='Daily Routine'
				width={50}
				height={50}
				className={imageClassName}
			/>
			<h1 className={`text-[22px] ${titleClassName}`}>{title}</h1>
		</div>
	)
}
