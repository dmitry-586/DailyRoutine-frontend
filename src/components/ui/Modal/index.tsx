'use client'

import { cn } from '@/lib/utils/cn'
import { X } from 'lucide-react'
import { modalStyles } from './config'

export interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	children: React.ReactNode
	className?: string
}

export default function Modal({
	isOpen,
	onClose,
	title,
	children,
	className,
}: ModalProps) {
	if (!isOpen) return null

	return (
		<div className={modalStyles.backdrop.base}>
			<div
				className={modalStyles.backdrop.overlay}
				onClick={onClose}
				aria-hidden='true'
			/>
			<div className={cn(modalStyles.content.base, className)}>
				<div className={modalStyles.header.base}>
					<h2 className={modalStyles.header.title}>{title}</h2>
					<button
						onClick={onClose}
						className={modalStyles.closeButton}
						aria-label='Закрыть модальное окно'
					>
						<X size={24} />
					</button>
				</div>
				<div className={modalStyles.body}>{children}</div>
			</div>
		</div>
	)
}
