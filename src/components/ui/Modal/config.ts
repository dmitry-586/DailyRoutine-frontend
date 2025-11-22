export const modalStyles = {
	backdrop: {
		base: 'fixed inset-0 z-50 flex items-center justify-center',
		overlay:
			'absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200',
	},
	content: {
		base: 'relative bg-background border-2 border-primary rounded-[20px] shadow-blue max-w-md w-full mx-4 animate-in fade-in-0 zoom-in-95 duration-200',
	},
	header: {
		base: 'flex items-center justify-between p-6 border-b-2 border-primary/60',
		title: 'text-2xl font-reggae-one text-foreground',
	},
	closeButton:
		'text-foreground/60 hover:text-foreground transition-colors duration-200 cursor-pointer',
	body: 'p-6',
} as const
