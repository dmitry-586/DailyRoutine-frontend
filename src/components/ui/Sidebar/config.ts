export const sidebarStyles = {
	backdrop: {
		base: 'fixed inset-0 bg-black/40 transition-opacity duration-300',
		open: 'pointer-events-auto z-40 opacity-100',
		closed: 'pointer-events-none z-0 opacity-0',
	},
	panel: {
		base: 'fixed inset-y-5 z-50 flex h-fit w-[90vw] rounded-[10px] max-w-[400px] flex-col bg-white p-5 transition-transform duration-300 will-change-transform bg-background overflow-y-auto',
		left: 'left-5',
		right: 'right-5',
		openLeft: 'translate-x-0',
		openRight: 'translate-x-0',
		closedLeft: '-translate-x-full',
		closedRight: 'translate-x-full',
	},
	header: {
		base: 'flex items-center justify-between',
	},
	closeButton:
		'ml-auto h-fit cursor-pointer hover:text-primary transition-colors duration-200',
} as const
