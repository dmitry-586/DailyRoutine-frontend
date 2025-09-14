export type ButtonVariant = 'primary' | 'red' | 'green'

export interface ButtonProps {
	children: React.ReactNode
	variant?: ButtonVariant
	type?: 'button' | 'submit' | 'reset'
	disabled?: boolean
	className?: string
	onClick?: () => void
}
