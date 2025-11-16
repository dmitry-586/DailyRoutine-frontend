import { cn } from '@/lib/utils/cn'
import { IButtonProps } from '@/types/ui.types'
import { buttonVariants } from './config'

export default function Button({
	children,
	variant = 'primary',
	type = 'button',
	disabled = false,
	className,
	onClick,
}: IButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			className={cn(
				'inline-flex items-center justify-center rounded-[20px] cursor-pointer transition-colors duration-200 focus:outline-none',
				'px-7.5 py-2.5 text-lg min-w-[200px] leading-none shadow-blue',
				buttonVariants[variant],
				disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent',
				className
			)}
		>
			{children}
		</button>
	)
}
