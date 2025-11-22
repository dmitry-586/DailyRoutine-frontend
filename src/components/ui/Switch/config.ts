export const switchStyles = {
	root: 'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1CBECB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D3134] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#4CAF50] data-[state=unchecked]:bg-[#B3B3B3]/30',
	thumb:
		'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
} as const
