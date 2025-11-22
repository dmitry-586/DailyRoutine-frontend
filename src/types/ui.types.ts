export interface ISidebarProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	position?: 'left' | 'right'
	className?: string
	headerClassName?: string
}
