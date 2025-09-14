import { ModalProps } from '@/types/ui/modal.interface'
import { cn } from '@/utils/cn'
import { X } from 'lucide-react'

export default function Modal({
	isOpen,
	onClose,
	title,
	children,
	className,
}: ModalProps) {
	if (!isOpen) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center'>
			<div
				className='absolute inset-0 bg-black/50 backdrop-blur-sm'
				onClick={onClose}
			/>

			<div
				className={cn(
					'relative bg-background border-2 border-primary rounded-[20px]',
					'shadow-blue max-w-md w-full mx-4',
					'animate-in fade-in-0 zoom-in-95 duration-200',
					className
				)}
			>
				<div className='flex items-center justify-between p-6 border-b-2 border-primary/60'>
					<h2 className='text-2xl font-reggae-one text-foreground'>{title}</h2>
					<button
						onClick={onClose}
						className='text-foreground/60 hover:text-foreground transition-colors duration-200 cursor-pointer'
						aria-label='Закрыть'
					>
						<X size={24} />
					</button>
				</div>

				<div className='p-6'>{children}</div>
			</div>
		</div>
	)
}
