export type ButtonVariant = 'primary' | 'red' | 'green' | 'outline'

export interface ISidebarProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	position?: 'left' | 'right'
	className?: string
	headerClassName?: string
}

export interface IButtonProps {
	children: React.ReactNode
	variant?: ButtonVariant
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	className?: string
	onClick?: () => void
}

export interface IModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	children: React.ReactNode
	className?: string
}

export interface ILogoProps {
	title: string
	className?: string
	imageClassName?: string
	titleClassName?: string
}
