import { ButtonProps } from '@/types/ui/button.interface'
import { cn } from '@/utils/cn'

const buttonVariants = {
	primary:
		'bg-transparent text-white hover:bg-primary/20 border-2 border-primary',
	red: 'bg-red-500 text-white hover:bg-red-600 border-2 border-red-500',
	green: 'bg-green-500 text-white hover:bg-green-600 border-2 border-green-500',
}

export default function Button({
	children,
	variant = 'primary',
	type = 'button',
	disabled = false,
	className,
	onClick,
}: ButtonProps) {
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
